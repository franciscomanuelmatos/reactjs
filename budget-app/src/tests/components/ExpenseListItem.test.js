import { shallow } from 'enzyme';
import React from 'react';

import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render ExpenseListItem with given parameters', () => {
  const wrapper = shallow(<ExpenseListItem expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
})