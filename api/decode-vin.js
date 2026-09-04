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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DealTrace/2.0'
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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const vin = (req.query && req.query.vin ? req.query.vin : '').toString().trim().toUpperCase().replace(/[\s\-_]+/g, '');
  if (!vin || vin.length !== 17) {
    return res.status(400).json({ error: 'Valid 17-character VIN required' });
  }

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
            r.DisplacementL ? r.DisplacementL + 'L' : ''
          ].filter(Boolean).join(' ');

          return res.status(200).json({
            success: true,
            vin: vin,
            year: r.ModelYear || '',
            make: r.Make || '',
            model: r.Model || '',
            trim: r.Trim || '',
            engine: engineParts || r.EngineModel || '',
            transmission: r.TransmissionStyle || '',
            bodyType: r.BodyClass || '',
            driveType: r.DriveType || '',
            fuelType: r.FuelTypePrimary || '',
            errorCode: r.ErrorCode || '0',
            errorText: r.ErrorText || ''
          });
        }
      }
    } catch(e) {
      // Continue to fallback
    }

    // 2. Try NHTSA DecodeVin (standard format)
    const res2 = await fetchJson('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + encodeURIComponent(vin) + '?format=json');
    if (res2.ok && res2.data && res2.data.Results) {
      const results = res2.data.Results;
      const getVal = (name) => {
        const item = results.find(x => x.Variable === name);
        return item ? item.Value : '';
      };

      const engine = [
        getVal('Engine Number of Cylinders') ? getVal('Engine Number of Cylinders') + '-cyl' : '',
        getVal('Displacement (L)') ? getVal('Displacement (L)') + 'L' : '',
        getVal('Engine Configuration')
      ].filter(Boolean).join(' ');

      return res.status(200).json({
        success: true,
        vin: vin,
        year: getVal('Model Year') || '',
        make: getVal('Make') || '',
        model: getVal('Model') || '',
        trim: getVal('Trim') || '',
        engine: engine || getVal('Engine Model') || '',
        transmission: getVal('Transmission Style') || '',
        bodyType: getVal('Body Class') || '',
        driveType: getVal('Drive Type') || '',
        fuelType: getVal('Fuel Type - Primary') || '',
        errorCode: getVal('Error Code') || '0',
        errorText: getVal('Error Text') || ''
      });
    }

    throw new Error('NHTSA API failed to decode VIN');
  } catch (err) {
    return res.status(502).json({
      success: false,
      error: 'VIN service unavailable: ' + err.message
    });
  }
};
