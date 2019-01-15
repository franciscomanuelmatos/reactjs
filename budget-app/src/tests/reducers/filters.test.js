import moment from 'moment';

import filtersReducer from '../../reducers/filters';
import { SET_TEXT_FILTER, SORT_BY_DATE, SORT_BY_AMOUNT, SET_START_DATE, SET_END_DATE } from '../../actions/actionTypes';

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

test('should setup default filter values', () => {
  const action = {
    type: '@@INIT'
  }

  const result = filtersReducer(undefined, action);

  expect(result).toEqual(filtersReducerDefaultState);
})

test('should set text', () => {
  const action = {
    type: SET_TEXT_FILTER,
    text: 're'
  }

  const expected = {
    ...filtersReducerDefaultState,
    text:'re'
  }

  const result = filtersReducer(filtersReducerDefaultState, action);

  expect(result).toEqual(expected);
})

test('should set sortBy to amount', () => {
  const action = {
    type: SORT_BY_AMOUNT
  }

  const expected = {
    ...filtersReducerDefaultState,
    sortBy: 'amount'
  }

  const result = filtersReducer(filtersReducerDefaultState, action);

  expect(result).toEqual(expected);
})

test('should set sortBy to date', () => {
  const action = {
    type: SORT_BY_DATE
  }

  const state = {
    ...filtersReducerDefaultState,
    sortBy: 'amount'
  }

  const expected = {
    ...filtersReducerDefaultState,
    sortBy: 'date'
  }

  const result = filtersReducer(state, action);

  expect(result).toEqual(expected);
})

test('should set startDate', () => {
  const startDate = moment(0);
  
  const action = {
    type: SET_START_DATE,
    startDate
  }

  const expected = {
    ...filtersReducerDefaultState,
    startDate
  }

  const result = filtersReducer(filtersReducerDefaultState, action);

  expect(result).toEqual(expected);
})

test('should set endDate', () => {
  const endDate = moment(0);

  const action = {
    type: SET_END_DATE,
    endDate
  }

  const expected = {
    ...filtersReducerDefaultState,
    endDate
  }

  const result = filtersReducer(filtersReducerDefaultState, action);

  expect(result).toEqual(expected);
})