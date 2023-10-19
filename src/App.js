import React, { useState, useRef } from 'react';
import TaskList from './components/TaskList';
import TaskOverlay from './components/TaskOverlay';
import { useUser } from './components/UserContext';
import './App.css';

const initialTasks = [
  { id: 1, text: 'Task 1', description: 'Description 1' },
  { id: 2, text: 'Task 2', description: 'Description 2' },
  { id: 3, text: 'Task 3', description: 'Description 3' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [viewingTask, setViewingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const { user, login, logout } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
  };

  const viewTask = (task) => {
    setViewingTask(task);
  };

  const closeTaskOverlay = () => {
    setViewingTask(null);
  };

  const deleteTask = (taskId) => {
    if (user) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } else {
      alert('Please log in to delete tasks');
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => login(username, password)}>Login</button>
        </div>
      )}
      <button onClick={openModal}>Add Task</button>
      {isModalOpen && (
        <div className="custom-modal" ref={modalRef}>
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
          <button onClick={closeModal} className="cancel">
            Cancel
          </button>
        </div>
      )}
      <TaskList tasks={tasks} onTaskView={viewTask} onTaskDelete={deleteTask} />
      {viewingTask && <TaskOverlay task={viewingTask} onClose={closeTaskOverlay} />}
    </div>
  );
}

export default App;
