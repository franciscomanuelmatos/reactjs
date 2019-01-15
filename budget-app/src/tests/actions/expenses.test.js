import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from '../../actions/actionTypes';

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
  })
})

test('Should setup add action object with provided values', () => {
  const action = addExpense(testObj);

  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense: {
      ...testObj,
      id: expect.any(String)
    }
  })
})

test('Should setup add action object with default values', () => {
  const action = addExpense();

  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense: {
      ...defaultExpense,
      id: expect.any(String)
    }
  })
})
