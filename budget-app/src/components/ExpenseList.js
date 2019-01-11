import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = (props) => (
  <div>
    Expense List
    {props.expenses.length}
  </div>
);

const mapStateToProps = (state) => ({
  expenses: state.expenses
});

export default connect(mapStateToProps)(ExpenseList);
