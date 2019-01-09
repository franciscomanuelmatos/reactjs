import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={props.chosen}
        contentLabel="Selected option"
    >
        <h3>Selected Option</h3>
        <p>{props.option}</p>
    </Modal>
)

export default OptionModal;