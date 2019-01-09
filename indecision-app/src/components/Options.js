import React from 'react';
import Option from './Option';


const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleRemoveAll}>Remove all</button>
            {props.options.length === 0 && <p>Please, add an option to get started!</p>}
            <ol>
                {props.options.map((opt, index) => (
                    <Option 
                        key={index} 
                        option={opt}
                        handleDeleteOption={props.handleDeleteOption} 
                    />)
                )}
            </ol>
        </div>
    );
}

export default Options;