import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import 'react-dates/initialize';
import './styles/styles.scss';
import configStore from './store/index';
import { addExpense } from './actions/expenses';

const store = configStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

store.dispatch(addExpense({
  description: 'Rent',
  amount: 5000
}));

store.dispatch(addExpense({
  description: 'Water Bill',
  amount: 5500
}));

store.dispatch(addExpense({
  description: 'Gas Bill',
  amount: 1095,
  createdAt: 1000
}));

ReactDOM.render(jsx, document.getElementById('app'));


