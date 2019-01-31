import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from '../../actions/actionTypes';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

const id = '123abc';
const testObj = {
  description: 'Test expense',
  note: '',
  amount: 500,
  createdAt: 1000
}
const defaultExpense = {
  description: '',
  note: '',
  amount: 0,
  createdAt: 0
}

afterAll(() => {
  database.ref().remove();
});

test('Should setup remove action object', () => {
  const action = removeExpense({ id });

  expect(action).toEqual({
    type: REMOVE_EXPENSE,
    id
  });
});

test('Should setup edit action object', () => {
  const action = editExpense(id, testObj);

  expect(action).toEqual({
    type: EDIT_EXPENSE,
    id,
    updates: testObj
  });
});

test('Should setup add action object with provided values', () => {
  const action = addExpense(expenses[0]);

  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense: expenses[0]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  store
    .dispatch(startAddExpense(testObj))
    .then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toEqual({
        type: ADD_EXPENSE,
        expense: {
          id: expect.any(String),
          ...testObj
        }
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(testObj);
      done();
    });
});

test('should add expense with defaults to database and store', () => {
  const store = createMockStore({});
  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toEqual({
        type: ADD_EXPENSE,
        expense: {
          id: expect.any(String),
          ...defaultExpense
        }
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultExpense);
      done();
    });
});
