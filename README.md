# 📦 Bundle Builder

A guided, step-by-step security system bundle configurator built with React and powered by a lightweight Express API. Users can customize their home security setup by selecting cameras, choosing a monitoring plan, adding sensors, and reviewing their full bundle — all within a clean, accordion-driven UI.

---

## 🧭 Overview

Bundle Builder walks users through a 4-step configuration flow to build a personalized home security system. Each step is presented as an interactive accordion panel. As users make selections, a live review panel on the right reflects their choices with itemized pricing, bundle discounts, and a final checkout summary.

The product catalog (cameras with color variants and pricing) is served from a dedicated Express backend, decoupling data from the frontend.

---

## ✨ Features

- **4-Step Guided Flow** — Step-by-step accordion navigation: Cameras → Plan → Sensors → Extra Protection
- **Camera Selection** — Browse cameras fetched from the API, each with multiple color/image variants and bundle discounts
- **Interactive Accordions** — Only one step is open at a time; a "Next" button advances the flow smoothly
- **Live Review Panel** — Real-time summary of selected cameras, sensors, accessories, and the monitoring plan with original vs. bundle prices
- **Bundle Savings Display** — Highlights total savings and shows a per-month payment option
- **Free Shipping** — Automatically included and reflected in the order summary
- **Satisfaction Badge** — 100% satisfaction guarantee shown at checkout
- **Redux State Management** — Centralized store for managing selected products and total price
- **REST API Backend** — Express server serving the product catalog at `/api/products`

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Redux Toolkit](https://redux-toolkit.js.org/) | State management |
| [React Redux](https://react-redux.js.org/) | React bindings for Redux |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Express 5](https://expressjs.com/) | REST API server |
| [CORS](https://www.npmjs.com/package/cors) | Cross-origin request support |

### Dev Tools
| Tool | Purpose |
|---|---|
| [concurrently](https://www.npmjs.com/package/concurrently) | Run client & server simultaneously |
| [ESLint](https://eslint.org/) | Code linting |
| [typescript-eslint](https://typescript-eslint.io/) | TypeScript-aware linting rules |

---

## 🚀 Installation & Running

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Bundle-Builder
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Run the development environment

This starts both the Vite dev server (port `5173`) and the Express API server (port `5000`) concurrently:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The API is available at [http://localhost:5000/api/products](http://localhost:5000/api/products)

### Individual Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start both client and server concurrently |
| `npm run client` | Start Vite dev server only |
| `npm run server` | Start Express API server only |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
