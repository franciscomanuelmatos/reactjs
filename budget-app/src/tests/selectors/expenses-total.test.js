import { getExpensesTotal } from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 when no expenses', () => {
  const result = getExpensesTotal([]);
  expect(result).toBe(0);
});

test('should correctly add one expense', () => {
  const result = getExpensesTotal([expenses[0]]);
  expect(result).toBe(expenses[0].amount);
});

test('should correctly add multiple expenses', () => {
  const result = getExpensesTotal(expenses);
  const expected = 114195;
  expect(result).toBe(expected);
});
