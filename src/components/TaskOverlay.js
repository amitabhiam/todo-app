import React from 'react';

function TaskOverlay({ task, onClose }) {
  return (
    <div className="custom-modal">
      <h2>{task.text}</h2>
      <p>{task.description}</p>
      <button onClick={onClose} className="cancel">
        Close
      </button>
    </div>
  );
}

export default TaskOverlay;
