import React from 'react';

export default class AddOption extends React.Component {
    state = {
        errorMessage: undefined
    }

    handleFormSubmission = (e) => {
        e.preventDefault();
        const newOption = e.target.elements.option.value.trim();
        const errorMessage = this.props.handleNewOption(newOption);
        
        if (!errorMessage) {
            e.target.elements.option.value = '';
        }
        
        this.setState(() => ({ errorMessage }));
        
    }

    render() {
        return (
            <div>
                {this.state.errorMessage && <p className="add-option-error">{this.state.errorMessage}</p>}
                <form className="add-option" onSubmit={this.handleFormSubmission}>
                    <input className="add-option__input" type="text" name="option" />
                    <button className="button">Add option</button>
                </form>
            </div>
        );
    }
}

