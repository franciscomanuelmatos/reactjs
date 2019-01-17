import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot(); // error not rendered
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('errorMessage')).toBeDefined();
  expect(wrapper).toMatchSnapshot(); // error rendered
});

test('should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should set note on textarea change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should set amount on input change with valid data', () => {
  const value = '500.45';
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should not set amount on input change with invalid data', () => {
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('errorMessage')).toBe(undefined);
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendarFocused on focus change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});