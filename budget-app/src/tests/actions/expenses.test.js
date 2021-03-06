import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { 
  addExpense, 
  editExpense, 
  removeExpense, 
  startAddExpense, 
  setExpenses, 
  startSetExpenses, 
  startRemoveExpense, 
  startEditExpense 
} from '../../actions/expenses';
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, SET_EXPENSES } from '../../actions/actionTypes';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

const uid = 'thisisatestuid';
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

const defaultAuthState = { auth: { uid } }

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
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

test('Should setup set action object correctly', () => {
  const action = setExpenses(expenses);
  const expected = {
    type: SET_EXPENSES,
    expenses
  }
  expect(action).toEqual(expected);
});


test('Should setup add action object with provided values', () => {
  const action = addExpense(expenses[0]);

  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense: expenses[0]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
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
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(testObj);
      done();
    });
});

test('should fetch the expenses from Firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store. 
    dispatch(startSetExpenses())
    .then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toEqual({
        type: SET_EXPENSES,
        expenses
      });
      done();
    })
});

test('should edit expenses on firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const { id } = expenses[0];
  const updates = {
    description: 'Bubble gum',
    amount: 150
  }
  const expected = {
    description: updates.description,
    note: expenses[0].note,
    amount: updates.amount,
    createdAt: expenses[0].createdAt
  }
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toEqual({
        type: EDIT_EXPENSE,
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expected);
      done();
    })
});

test('should remove expense from database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  store
    .dispatch(startRemoveExpense(expenses[0]))
    .then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toEqual({
        type: REMOVE_EXPENSE,
        id: expenses[0].id
      });
      return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('should add expense with defaults to database and store', () => {
  const store = createMockStore(defaultAuthState);
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
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultExpense);
      done();
    });
});

