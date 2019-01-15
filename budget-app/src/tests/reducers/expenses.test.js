
import expensesReducer from '../../reducers/expenses';
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from '../../actions/actionTypes';

const testExpenseOne = {
  id: '1',
  description: 'rent',
  note: '',
  amount: 2500,
  createdAt: 100
}

const testExpenseTwo = {
  id: '2',
  description: 'credit card',
  note: '',
  amount: 50000,
  createdAt: -100
}

const initialState = [testExpenseOne, testExpenseTwo];


test('should set default state', () => {
  const action = { type: '@@INIT' }

  const state = expensesReducer(undefined, action);

  expect(state).toEqual([]);
})

test('should add a new expense', () => {
  const expense = {
    id: '3',
    description: 'water bill',
    note: '',
    amount: 50000,
    createdAt: 1000
  }
  const action = {
    type: ADD_EXPENSE,
    expense
  }

  const state = expensesReducer(initialState, action);

  expect(state).toEqual(initialState.concat(expense));
})

test('should edit expense', () => {
  const updates = {
    description: 'water bill',
    amount: 50000,
  }
  const action = {
    type: EDIT_EXPENSE,
    id: '1',
    updates
  }

  const state = expensesReducer(initialState, action);

  expect(state).toEqual([
    {
      ...testExpenseOne, 
      ...updates
    },
    testExpenseTwo
  ]);
})

test('should not edit expense if id not found', () => {
  const updates = {
    description: 'water bill',
    amount: 50000,
  }
  const action = {
    type: EDIT_EXPENSE,
    id: '4',
    updates
  }

  const state = expensesReducer(initialState, action);

  expect(state).toEqual(initialState);
})

test('should remove expense', () => {
  const action = {
    type: REMOVE_EXPENSE,
    id: '2'
  }

  const state = expensesReducer(initialState, action);

  expect(state).toEqual([ testExpenseOne ])
})

test('should not remove expense if id not found', () => {
  const action = {
    type: REMOVE_EXPENSE,
    id: '4'
  }

  const state = expensesReducer(initialState, action);

  expect(state).toEqual(initialState)
})