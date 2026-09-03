# DealTrace — Vehicle Deals & Valuation Comparison Platform

DealTrace is a production automotive deal tracking and historical valuation comparison system designed for car dealerships, wholesale buyers, and auto flippers.

## 🚀 Live Production Links
- **Application Portal:** [https://deal-trace-two.vercel.app/](https://deal-trace-two.vercel.app/)
- **Admin Sign-In:** [https://deal-trace-two.vercel.app/login.html](https://deal-trace-two.vercel.app/login.html)
- **GitHub Repository:** [https://github.com/TAWFIG610/DealTrace.git](https://github.com/TAWFIG610/DealTrace.git)

---

## 🛠️ Architecture & Stack
- **Frontend:** Vanilla HTML5, CSS3, ES6+ JavaScript, UI/UX Pro Max design system (Obsidian & Amber Gold theme, `Plus Jakarta Sans`, `Inter`, `JetBrains Mono`).
- **Icons & Assets:** Bespoke Lucide-style inline SVGs + vector Telemetry Apex brand logos (`assets/logo.svg`, `assets/logo-dark.svg`).
- **Backend & Database:** [Supabase](https://supabase.com) (PostgreSQL Database with Row Level Security, Supabase Auth, and Supabase Storage bucket for vehicle photos).
- **Hosting & CI/CD:** [Vercel](https://vercel.com) with automatic deployment from the GitHub `main` branch.
- **Data Integration:** NHTSA VPIC API for instant VIN decoding and spec verification.

---

## 📁 Repository Structure
```text
├── assets/
│   ├── logo.svg              # Light mode DealTrace vector logo
│   └── logo-dark.svg         # Dark mode DealTrace vector logo
├── index.html                # Intelligent root entry router with auth check
├── login.html                # Executive dark glass admin authentication portal
├── add-car.html              # Core deal workspace (Compare, Add, Find, Saved Deals)
├── i18n.js                   # Bilingual Arabic (RTL) & English (LTR) localization engine
├── supabase-client.js        # Supabase client SDK integration & CRUD operations
├── schema.sql                # Complete PostgreSQL migration schema, RLS, & storage bucket
├── vercel.json               # Vercel production routing configuration
└── README.md                 # Project documentation
```

---

## 🔒 Security & Roles
- Access is restricted to verified dealership administrators via **Supabase GoTrue Auth**.
- Unauthenticated or non-admin attempts are intercepted and routed to the secure sign-in portal.
- All deal operations are protected by PostgreSQL Row Level Security (RLS) policies.
