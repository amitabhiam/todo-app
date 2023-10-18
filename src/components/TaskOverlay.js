import React from 'react';
import Modal from 'react-modal';

function TaskOverlay({ task, onClose }) {
  return (
    <Modal isOpen={true} onRequestClose={onClose} className="modal">
      <h2>{task.text}</h2>
      <p>{task.description}</p>
      <button onClick={onClose} className="cancel">Close</button>
    </Modal>
  );
}

export default TaskOverlay;