// Vercel Serverless Function: /api/decode-vin?vin=...
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 DealTrace/2.0'
      },
      timeout: 8000
    };
    const req = https.request(options, (resp) => {
      let data = '';
      resp.on('data', chunk => data += chunk);
      resp.on('end', () => {
        try {
          resolve({ ok: resp.statusCode >= 200 && resp.statusCode < 300, data: JSON.parse(data) });
        } catch(e) {
          reject(e);
        }
      });
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    req.on('error', reject);
    req.end();
  });
}

function sanitizeVin(raw) {
  if (!raw) return '';
  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  let s = raw.toString().trim().toUpperCase();
  for (let i = 0; i < 10; i++) {
    s = s.split(arabicDigits[i]).join(String(i));
  }
  s = s.replace(/[\s\-_.]+/g, '');
  // Per ISO 3779 & US CFR Title 49 Part 565, modern VINs never contain letters I, O, or Q.
  // Auto-correct common human transcription typos: O -> 0, I -> 1, Q -> 0
  s = s.replace(/O/g, '0').replace(/I/g, '1').replace(/Q/g, '0');
  return s;
}

module.exports = async function handler(req, res) {
  // Global CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const rawVin = req.query && req.query.vin ? req.query.vin : '';
  const vin = sanitizeVin(rawVin);

  if (!vin || vin.length !== 17) {
    return res.status(400).json({
      success: false,
      error: 'VIN must be exactly 17 characters (Standard US Modern VIN 1981-2026+).'
    });
  }

  // Cache successful responses on Vercel Edge CDN for 7 days
  res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=86400');

  try {
    // 1. Try NHTSA DecodeVinValues (flat format, fastest)
    try {
      const res1 = await fetchJson('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/' + encodeURIComponent(vin) + '?format=json');
      if (res1.ok && res1.data && res1.data.Results && res1.data.Results[0]) {
        const r = res1.data.Results[0];
        if (r.Make || r.Model || r.ModelYear) {
          const engineParts = [
            r.EngineConfiguration,
            r.EngineCylinders ? r.EngineCylinders + '-cyl' : '',
            r.DisplacementL ? r.DisplacementL + 'L' : '',
            r.EngineHP ? r.EngineHP + ' HP' : ''
          ].filter(Boolean).join(' ');

          return res.status(200).json({
            success: true,
            vin: vin,
            year: r.ModelYear || '',
            make: r.Make || '',
            model: r.Model || r.Series || '',
            trim: r.Trim || '',
            engine: engineParts || r.EngineModel || '',
            transmission: r.TransmissionStyle || '',
            bodyType: r.BodyClass || '',
            driveType: r.DriveType || '',
            fuelType: r.FuelTypePrimary || '',
            doors: r.Doors || '',
            vehicleType: r.VehicleType || '',
            plantCountry: r.PlantCountry || '',
            errorCode: r.ErrorCode || '0',
            errorText: r.ErrorText || ''
          });
        }
      }
    } catch(e) {
      // Fall through to DecodeVin
    }

    // 2. Try NHTSA standard DecodeVin
    const res2 = await fetchJson('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + encodeURIComponent(vin) + '?format=json');
    if (res2.ok && res2.data && res2.data.Results) {
      const results = res2.data.Results;
      const getVal = (name) => {
        const item = results.find(x => x.Variable === name);
        return item && item.Value ? item.Value.trim() : '';
      };

      const engine = [
        getVal('Engine Configuration'),
        getVal('Engine Number of Cylinders') ? getVal('Engine Number of Cylinders') + '-cyl' : '',
        getVal('Displacement (L)') ? getVal('Displacement (L)') + 'L' : '',
        getVal('Engine Brake (hp) From') ? getVal('Engine Brake (hp) From') + ' HP' : ''
      ].filter(Boolean).join(' ');

      return res.status(200).json({
        success: true,
        vin: vin,
        year: getVal('Model Year'),
        make: getVal('Make'),
        model: getVal('Model') || getVal('Series'),
        trim: getVal('Trim'),
        engine: engine || getVal('Engine Model'),
        transmission: getVal('Transmission Style'),
        bodyType: getVal('Body Class'),
        driveType: getVal('Drive Type'),
        fuelType: getVal('Fuel Type - Primary'),
        doors: getVal('Doors'),
        vehicleType: getVal('Vehicle Type'),
        plantCountry: getVal('Plant Country'),
        errorCode: getVal('Error Code') || '0',
        errorText: getVal('Error Text') || ''
      });
    }

    throw new Error('Upstream NHTSA service returned empty result');
  } catch (err) {
    return res.status(502).json({
      success: false,
      error: 'NHTSA VIN service temporarily unavailable: ' + err.message
    });
  }
};
