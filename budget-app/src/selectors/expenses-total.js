export const getExpensesTotal = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}