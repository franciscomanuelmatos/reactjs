import moment from 'moment';

import { setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';
import { SET_END_DATE, SET_START_DATE, SET_TEXT_FILTER, SORT_BY_AMOUNT, SORT_BY_DATE } from '../../actions/actionTypes';

test('Should setup a set text filter action with given parameters', () => {
  const text = 'test';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: SET_TEXT_FILTER,
    text
  })
});

test('Should setup a set text filter action with no given parameters', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: SET_TEXT_FILTER,
    text: ''
  })
});

test('Should setup a sort by amount action', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: SORT_BY_AMOUNT
  })
});

test('Should setup a sort by date action', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: SORT_BY_DATE
  })
});

test('Should setup a set start date action', () => {
  const startDate = moment();
  const action = setStartDate(startDate);
  expect(action).toEqual({
    type: SET_START_DATE,
    startDate
  })
});

test('Should setup a set end date action', () => {
  const endDate = moment();
  const action = setEndDate(endDate);
  expect(action).toEqual({
    type: SET_END_DATE,
    endDate
  })
});