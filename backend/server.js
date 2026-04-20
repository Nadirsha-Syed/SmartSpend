require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://smart-spend-9b8y.vercel.app'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.send('SmartSpend Backend API'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
