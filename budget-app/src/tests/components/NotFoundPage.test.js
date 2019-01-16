import { shallow } from 'enzyme';
import React from 'react';

import NotFoundPage from '../../components/NotFoundPage';

test('should render NotFoundPage properly', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});