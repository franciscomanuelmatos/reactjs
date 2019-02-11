import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE, SET_EXPENSES } from './actionTypes';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };
    return database.ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }));
      })
  }
}

export const removeExpense = ({ id }) => ({
  type: REMOVE_EXPENSE,
  id
});

export const startRemoveExpense = (expense) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${expense.id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense(expense))
      });
  }
}

export const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  }
}

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value')
      .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  }
};
