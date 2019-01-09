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
                <form onSubmit={this.handleFormSubmission}>
                    <input type="text" name="option" />
                    <button>Add option</button>
                </form>
                {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
            </div>
        );
    }
}

