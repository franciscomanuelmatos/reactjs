import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

let wrapper, removeExpense, editExpense, history;

beforeEach(() => {
  removeExpense = jest.fn();
  editExpense = jest.fn();
  history = {
    push: jest.fn()
  }
  wrapper = shallow(<EditExpensePage expense={expenses[0]} removeExpense={removeExpense} editExpense={editExpense} history={history} />);
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});


test('should handle onSubmit', () => {
  wrapper.find(ExpenseForm).prop('onSubmit')(expenses[2]);
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle onClick', () => {
  wrapper.find('button').prop('onClick')();
  expect(removeExpense).toHaveBeenLastCalledWith(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});
