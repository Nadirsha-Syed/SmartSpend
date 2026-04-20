const express = require('express');
const router = express.Router();
const { 
    getDashboardData, 
    addExpense, 
    getAllExpenses,
    updateExpense,
    deleteExpense 
} = require('../controllers/expenseController');
const protect = require('../middleware/authMiddleware');

// All routes here require a valid JWT token
router.use(protect);
// Add this line temporarily
console.log({ getDashboardData, addExpense, getAllExpenses });

router.get('/summary', getDashboardData);
router.get('/', getAllExpenses);
router.post('/', addExpense);

router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
