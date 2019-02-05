import authReducer from '../../reducers/auth';
import { LOGIN, LOGOUT } from '../../actions/actionTypes';

const defaultState = { };
const testState = { uid: '123abc' }

test('should setup default state', () => {
  const action = {
    type: '@@INIT'
  }

  const state = authReducer(undefined, action);
  expect(state).toEqual(defaultState);
});

test('should setup uid', () => {
  const action = {
    type: LOGIN,
    uid: '123abc'
  }

  const state = authReducer(undefined, action);
  expect(state).toEqual(testState);
});

test('should clear uid', () => {
  const action = {
    type: LOGOUT
  }

  const state = authReducer(testState, action);
  expect(state).toEqual(defaultState);
});