const Expense = require('../models/expense');

exports.createExpense = async (req, res) => {
    const { user, amount, description } = req.body;
    const expense = new Expense({ user, amount, description });
    await expense.save();
    res.status(201).json({ message: 'Expense added successfully' });
};

exports.getExpenses = async (req, res) => {
    const expenses = await Expense.find({ user: req.body.user });
    res.status(200).json(expenses);
};

exports.updateExpense = async (req, res) => {
    const { id, amount, description } = req.body;
    const expense = await Expense.findByIdAndUpdate(id, { amount, description }, { new: true });
    if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense updated successfully', expense });
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.body;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
};