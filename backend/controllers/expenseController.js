const Expense = require('../models/Expense');

exports.getDashboardData = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    
    if (!expenses.length) {
      return res.json({ totalSpend: 0, categoryBreakdown: {}, insight: null });
    }

    const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categoryBreakdown = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    // Professional Insight Logic: Provide actionable, dynamic feedback
    let insight = null;
    const foodSpend = categoryBreakdown['Food'] || 0;
    const foodRatio = foodSpend / totalSpend;

    if (foodRatio > 0.3) {
      insight = `You're spending ${(foodRatio * 100).toFixed(0)}% of your budget on food. Consider meal prepping to save.`;
    } else if (totalSpend > 5000) {
      insight = "Your total spending is quite high this month. Check your 'Bills' category for optimization.";
    }

    res.json({ totalSpend, categoryBreakdown, insight });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching dashboard data', error: error.message });
  }
};

exports.addExpense = async (req, res) => {
  const { title, amount, category } = req.body;

  // Basic validation: ensures data integrity
  if (!title || !amount || !category) {
    return res.status(400).json({ message: 'Please provide title, amount, and category' });
  }

  try {
    const newExpense = await Expense.create({ 
      title, 
      amount, 
      category, 
      userId: req.user.id 
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add expense', error: error.message });
  }
};
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { ...updates, date: new Date() },
      { new: true, runValidators: true }
    );

    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
    
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};
