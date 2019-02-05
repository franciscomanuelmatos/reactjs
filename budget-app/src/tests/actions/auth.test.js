import { LOGIN, LOGOUT } from '../../actions/actionTypes';
import { login, logout } from '../../actions/auth';

test('should setup login object correctly', () => {
  const uid = '123abc';
  const expected = {
    type: LOGIN,
    uid
  }
  const result = login(uid);
  expect(result).toEqual(expected);
});

test('should setup logout object correctly', () => {
  const expected = {
    type: LOGOUT
  }
  const result = logout();
  expect(result).toEqual(expected);
});