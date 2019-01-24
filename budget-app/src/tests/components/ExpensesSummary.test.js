import React from 'react';
import { shallow } from 'enzyme';

import { ExpensesSummary } from '../../components/ExpensesSummary';
import configNumeral from '../../config/numeral';
import expenses from '../fixtures/expenses';
import { getExpensesTotal } from '../../selectors/expenses-total';

beforeAll(() => {
  configNumeral();
});

test('Should not render ExpensesSummary when there are no expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={expenses.length} expensesTotal={getExpensesTotal(expenses)} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary correctly with a single expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={getExpensesTotal([expenses[0]])} />);
  expect(wrapper).toMatchSnapshot();
});