# SmartSpend - Minimal Expense Tracker

Full-stack expense tracker built with:
- Backend: Node.js + Express + MongoDB + JWT
- Frontend: React + Vite + Recharts

## Features
- User signup/login (JWT + bcrypt)
- Add/edit/delete expenses
- Expense categories (Food/Travel/Bills/Misc)
- Dashboard with total spend + pie chart
- Smart insights (food >30% suggestion)

## Quick Start
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Test Credentials
```
Email: test@example.com
Password: password123
```

## Deployment
**Backend (Render)**: `npm run dev`
**Frontend (Vercel)**: `npm run build && vercel`

## Architecture
```
backend/
  controllers/  routes/  models/  middleware/
frontend/
  components/  pages/  services/
```

