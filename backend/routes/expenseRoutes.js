const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

router.post('/create', expenseController.createExpense);
router.get('/', expenseController.getExpenses);
router.put('/update', expenseController.updateExpense);
router.delete('/delete', expenseController.deleteExpense);

module.exports = router;