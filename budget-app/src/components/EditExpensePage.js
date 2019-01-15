import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => (
  <div>
    <ExpenseForm
      expense = {props.expense}
      onSubmit = {(expense) => {
        const id = props.expense.id;
        props.dispatch(editExpense(id, expense));
        props.history.push('/');
      }}
    />
    <button onClick={() => {
      props.dispatch(removeExpense({ id: props.expense.id }));
      props.history.push('/');
    }}>Remove</button>
  </div>
);

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;

  return {
    expense: state.expenses.find((expense) => expense.id === id)
  }
}

export default connect(mapStateToProps)(EditExpensePage);
