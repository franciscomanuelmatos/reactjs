import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id,expense);
    this.props.history.push('/');
  }

  onClick = () => {
    this.props.startRemoveExpense(this.props.expense);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <ExpenseForm
          expense = {this.props.expense}
          onSubmit = {this.onSubmit}
        />
        <button onClick={this.onClick}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;

  return {
    expense: state.expenses.find((expense) => expense.id === id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editExpense: (id, expense) => {
      dispatch(editExpense(id, expense));
    },
    startRemoveExpense: (expense) => { dispatch(startRemoveExpense(expense)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
