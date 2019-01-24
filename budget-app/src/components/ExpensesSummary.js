import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { getVisibleExpenses } from '../selectors/expenses';
import { getExpensesTotal } from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
  const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';
  const total = numeral(props.expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      {props.expenseCount > 0 && 
        <h2>Viewing {props.expenseCount} {expenseWord} totalling {total} </h2>
      }
    </div>
  )
}
  
const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  }
};

export default connect(mapStateToProps)(ExpensesSummary);