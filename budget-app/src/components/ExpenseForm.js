import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      errorMessage: undefined
    }
  }

  onDescriptionChange = (event) => {
    const description = event.target.value;
    this.setState(() => ({ description }));
  }

  onAmountChange = (event) => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  onNoteChange = (event) => {
    const note = event.target.value;
    this.setState(() => ({ note }));
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ errorMessage: 'Please provide description and amount.' }));
    } else {
      this.setState(() => ({ errorMessage: undefined }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input 
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker 
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea 
            placeholder="Add a note for your expense"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default ExpenseForm;
