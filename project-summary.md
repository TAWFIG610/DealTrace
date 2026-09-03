# Vehicle Deals App — What We Built

## The idea
A tool for the dealership so multiple buyers (you, your friends/employees) can track every car deal you make — and, most importantly, **compare a car you're about to buy against similar cars you've bought before**, so you can gauge fair pricing based on your own real history instead of guessing.

## The core workflow
1. **Paste a VIN** for a car you're considering. The app pulls the public spec sheet automatically (year, make, model, trim, engine, etc.) using NHTSA's free VIN decoder.
2. **Add what only you know**: asking price, mileage, estimated repairs, other costs.
3. The app **automatically finds every past deal** you've saved on that same year/make/model — no manual searching.
4. It shows a **side-by-side comparison table**: your current car vs. every matching past deal, with price, mileage, repairs, total invested, sale price, net profit, and deal rating — color-highlighted so it's obvious at a glance whether this car is priced better or worse than your history.
5. A **summary card** rates your history with that model (Good / Mixed / Poor / Not enough history yet), shows your averages, and states plainly how the current car compares — no fake "buy/don't buy" advice, just the facts from your own data so you make the call.
6. Any **lessons learned** notes from past deals (e.g. "check the transmission carefully") surface automatically for that model.

## What the app actually has
- **3 tabs**: Compare (the main screen), Add a Deal, Find a Car
- **VIN auto-fill** — real-time lookup, all fields stay editable
- **Photo upload** — drag-and-drop, multiple photos, cover photo selection
- **Full deal tracking** — buyer, purchase price, mileage, condition, seller, location, repair cost, other costs, sale price, deal rating, lessons learned, custom fields
- **Search by buyer or VIN** — pulls up every car tied to a person, with delete support
- **PDF export** — for a single car, multiple selected cars, or a full comparison report

## Current state
It's a **working prototype** — a single self-contained HTML file, no server. Data is stored in the browser (or in Claude's built-in storage if used inside Claude.ai), which works fine for testing but isn't shared across devices or people yet.

## What's next (discussed, not yet built)
- **Manheim API integration** for wholesale valuation data — requires a dealer developer account and a small backend to keep credentials secure (can't live in a browser-only file).
- **Moving to a real hosted backend** — recommended: **Supabase** (~$25/month) for a shared database, built-in per-person login, and photo storage, paired with **Vercel** for hosting. This turns it from "my browser's local data" into a real shared tool the whole team can log into.

## The one-sentence pitch
*Enter a VIN → the app identifies the car → it's compared against your team's past deals → you see price, mileage, repairs, profit, and lessons learned → you make a better buying decision.*
