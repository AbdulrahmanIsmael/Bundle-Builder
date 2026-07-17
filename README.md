# 📦 Bundle Builder

## 1. Overview

Bundle Builder is a simple, step-by-step app that helps users build their own home security system. Users can easily choose cameras, pick a monitoring plan, add sensors, and see their full bundle in a clean and interactive design. The total price and discounts update live as choices are made.

## 2. Tech Stack

### Frontend

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- Redux Toolkit
- React Redux
- React Icons
- Sonner

### Backend

- Node.js
- Express 5
- CORS

## 3. Features

- **Step-by-step Guide:** Choose your setup easily through 4 clear steps (Cameras, Plan, Sensors, Extra Protection).
- **Camera Selection:** Pick from different cameras and colors with bundle discounts.
- **Live Review Panel:** See a real-time summary of all chosen items, prices, and savings.
- **Easy Navigation:** Smooth accordion-style panels that open one at a time.
- **State Management:** Keeps track of all your selections smoothly.
- **API Connection:** Fetches available products from a simple backend server.

## 4. How to Run and Install

**Prerequisites:**

- Node.js v18 or higher
- npm v9 or higher

**Step 1: Clone the project**

```bash
git clone <your-repo-url>
cd Bundle-Builder
```

**Step 2: Install frontend dependencies**

```bash
npm install
```

**Step 3: Install backend dependencies**

```bash
cd server
npm install
cd ..
```

**Step 4: Run the project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment Notes (Vercel)

- Backend uses Express as a Vercel Serverless Function.
- Entry point: `api/[...path].js`
- Backend uses ES Modules.
- JSON imports use:
  import data from "./file.json" with { type: "json" };
- Local imports require the `.js` extension.

## 5. Future Improvements

- **Database Integration:** Using a database and Sequelize to store and manage products and orders.
- **Checkout Page:** Adding a full checkout page with logic to complete orders.
- **Payment Options:** Adding payment methods so users can pay for their bundle easily.
- **WhatsApp Support:** Adding a WhatsApp feature to allow users to communicate and ask any questions directly.
- **Admin Dashboard:** Creating a dashboard to add more products and control data if needed.
