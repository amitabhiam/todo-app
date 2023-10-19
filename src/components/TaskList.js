import React, { useState, useEffect } from 'react';

function TaskList({ tasks, onTaskView, onTaskDelete }) {
  const [shortenedDescriptions, setShortenedDescriptions] = useState({});

  useEffect(() => {
    const shortened = {};
    tasks.forEach((task) => {
      const shortenedDescription = task.description.substring(0, 30);
      shortened[task.id] = shortenedDescription;
    });
    setShortenedDescriptions(shortened);
  }, [tasks]);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>You have no tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div className="task-container">
                <div>
                  <span>{task.text}</span>
                  <p>{shortenedDescriptions[task.id]}</p>
                </div>
                <div className="button-container">
                  <button onClick={() => onTaskView(task)} className="view">
                    View
                  </button>
                  <button onClick={() => onTaskDelete(task.id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
