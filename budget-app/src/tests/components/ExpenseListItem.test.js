import { shallow } from 'enzyme';
import React from 'react';

import ExpenseListItem from '../../components/ExpenseListItem';
import configNumeral from '../../config/numeral';
import expenses from '../fixtures/expenses';

beforeAll(() => {
  configNumeral();
});

test('should render ExpenseListItem with given parameters', () => {
  const wrapper = shallow(<ExpenseListItem expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
})