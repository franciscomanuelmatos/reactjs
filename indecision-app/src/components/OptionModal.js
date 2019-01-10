import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    isOpen={props.chosen}
    contentLabel="Selected option"
    closeTimeoutMS={1000}
    className="modal"
  >
    <h3 className="modal__title">Selected Option</h3>
    <p className="modal__body">{props.option}</p>
    <button className="button" onClick={props.onClose}>Okay</button>
  </Modal>
)

export default OptionModal;