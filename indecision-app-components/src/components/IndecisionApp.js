import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: this.props.options,
        chosen: false,
        option: undefined
    }

    handleRemoveAll = () => {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption = (option) => {
        this.setState((prevState) => ({ options: prevState.options.filter((opt) => opt !== option) }));
    }

    handleNewOption = (newOption) => {
        if (!newOption) {
            return 'Insert a valid option';
        }

        if (this.state.options.indexOf(newOption) !== -1) {
            return 'The option already exists!';
        }

        this.setState((prevState) => ({ options: prevState.options.concat([newOption]) }));
    }

    handlePick = () => {
        if (this.state.options) {
            const randomNum = Math.floor(Math.random() * this.state.options.length);
            const option = this.state.options[randomNum];
            const chosen = true;
            this.setState(() => ({ chosen, option }));
        }
        
    }

    componentDidMount() {
        const json = localStorage.getItem("options");
        if (json) {
            const options = JSON.parse(json);
            this.setState(() => ({ options }));
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        try {
            if (prevState.options.length !== this.state.options.length) {
                const json = JSON.stringify(this.state.options);
    
                if (this.state.options) {
                    localStorage.setItem("options", json);
                }
                
            }
        } catch (error) {
            // Do nothing
        }
    }

    render() {
        return (
            <div>
                <Header subtitle="Put your life in the hands of a computer!" />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick} 
                />
                <Options 
                    options={this.state.options} 
                    handleRemoveAll={this.handleRemoveAll}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleNewOption={this.handleNewOption} />
                <OptionModal chosen={this.state.chosen} option={this.state.option} />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}