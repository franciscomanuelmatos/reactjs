import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilters from './ExpenseListFilters';
import { getVisibleExpenses } from '../selectors/expenses';

const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    <ExpenseListFilters />

    {props.expenses.map((expense) => (
      <ExpenseListItem expense={expense} key={expense.id} /> 
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  expenses: getVisibleExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);
