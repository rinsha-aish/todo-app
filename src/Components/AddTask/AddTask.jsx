import React, { useState } from 'react';

import './AddTask.css';

function AddTask({ handleAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  //function to handle form submission
  const handleSubmit = () => {

    // e.preventDefault();

    if (!title || !description) {
      //alert if title or description is empty
      alert('Please enter both title and description.');
      return;
    }


    handleAddTodo(title, description);
    //clear input fields after adding task
    setTitle('');
    setDescription('');
  };


//render jsx
  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>
      <div className="todo-input-item">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="primaryBtn"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
