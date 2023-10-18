import React, { useState } from 'react';
import Modal from 'react-modal';
import TaskList from './components/TaskList';
import TaskOverlay from './components/TaskOverlay';
import './App.css';

const initialTasks = [
  { id: 1, text: 'Task 1', description: 'Description 1' },
  { id: 2, text: 'Task 2', description: 'Description 2' },
  { id: 3, text: 'Task 3', description: 'Description 3' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [viewingTask, setViewingTask] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewTaskText('');
    setNewTaskDescription('');
  };

  const addTask = () => {
    if (newTaskText) {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText,
        description: newTaskDescription,
      };
      setTasks([...tasks, newTask]);
      closeModal();
    }
  }

  const viewTask = (task) => {
    setViewingTask(task);
  }

  const closeTaskOverlay = () => {
    setViewingTask(null);
  }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  
  return (
    <div>
      <h1>Todo App</h1>
      <button onClick={openModal}>Add Task</button>
      <TaskList tasks={tasks} onTaskView={viewTask} onTaskDelete={deleteTask} />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2>Add New Task</h2>
        <label htmlFor="newTaskText">Title:</label>
        <input
          type="text"
          id="newTaskText"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <label htmlFor="newTaskDescription">Description:</label>
        <textarea
          id="newTaskDescription"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
        <button onClick={closeModal} className="cancel">Cancel</button>
      </Modal>
      {viewingTask && (
        <TaskOverlay task={viewingTask} onClose={closeTaskOverlay} />
      )}
    </div>
  );
}

export default App;


