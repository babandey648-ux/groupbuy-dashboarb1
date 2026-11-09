# GroupBuy Analytics (React)

A dashboard and pitch deck for GroupBuy Dubai. All figures are synthetic, built from a mock survey and the deck's assumptions.

## Run on your computer
Install Node.js 20 or later from nodejs.org, then in this folder run:
```
npm install
npm run dev
```
Open the address it prints, normally http://localhost:5173.

## Put it online
1. Upload all these files to a new GitHub repository, on its main page.
2. Sign in to vercel.com with GitHub, click **Add New > Project**, and import the repository.
3. Keep the detected Vite settings and click **Deploy**.

## Files
- `App.jsx`: main page; reads the CSV and calculates every KPI and chart
- `StatCard.jsx`, `ChartSection.jsx`, `BundleTable.jsx`, `PitchDeck.jsx`: page components
- `groupbuy_synthetic_sales_data.csv`: the data used by the app
- `groupbuy_synthetic_sales_data.xlsx`: the same data for Excel
