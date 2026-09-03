# DealTrace — Executive Project Summary

## What DealTrace Accomplishes
DealTrace provides an automotive intelligence workspace for dealership teams and wholesale buyers to:
1. **Track Every Deal**: Comprehensive logging of purchase price, odometer, repair costs, transport fees, sale price, and net profit margins.
2. **Instant VIN Decoding**: One-click specification extraction (Year, Make, Model, Trim, Engine, Transmission, Drivetrain) via NHTSA's free registry API.
3. **Automated Historical Valuation**: Benchmarking prospective vehicle deals against historical transactions of the same Year, Make, and Model.
4. **Data-Driven Risk & Profit Scoring**: Side-by-side comparison matrix with color-coded delta metrics, risk verdicts, and institutional team watchouts/lessons learned.
5. **PDF Valuation Exporting**: Instant print and PDF generation for single vehicles or comparative dealer reports.
6. **Bilingual Localization (Arabic & English)**: Full dual-language system paired with Google Fonts `Cairo` and RTL layout mirroring.
7. **Saved Deals Admin Inspector**: Dedicated inventory KPI dashboard and modal inspector displaying all stored database fields.

---

## Production Infrastructure
- **Cloud Database**: Supabase PostgreSQL with B-Tree indexes on VIN, Year/Make/Model, and Buyer Name.
- **Authentication**: Admin-only access restriction with Supabase GoTrue Auth and Row Level Security.
- **Media Storage**: Supabase Storage bucket (`deal-photos`) supporting high-resolution image uploads with public CDN delivery.
- **Deployment**: Hosted on Vercel with automatic continuous deployment on `git push origin main`.
- **Live URL**: [https://deal-trace-two.vercel.app/](https://deal-trace-two.vercel.app/)
