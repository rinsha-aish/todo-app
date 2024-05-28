import React from 'react';
import './TaskList.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function TaskList({
  isCompleteScreen,
  allTodos,
  completedTodos,
  currentEdit,
  currentEditedItem,
  handleEdit,
  handleUpdateTitle,
  handleUpdateDescription,
  handleUpdateToDo,
  handleDeleteTodo,
  handleComplete,
  handleDeleteCompletedTodo,
}) {

//rendering JSX based on whether it's complete screen or active tasks screen
  return (
    <div className="todo-list">
      {!isCompleteScreen &&
        allTodos.map((item, index) => {
          if (currentEdit === index) {
            return (
              <div className="edit__wrapper" key={index}>
                <input
                  placeholder="Updated Title"
                  onChange={(e) => handleUpdateTitle(e.target.value)}
                  value={currentEditedItem.title}
                />
                <textarea
                  placeholder="Updated Description"
                  rows={4}
                  onChange={(e) => handleUpdateDescription(e.target.value)}
                  value={currentEditedItem.description}
                />
                <button
                  type="button"
                  onClick={handleUpdateToDo}
                  className="primaryBtn"
                >
                  Update
                </button>
              </div>
            );
          } else {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <BsCheckLg
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                  />
                  <AiOutlineEdit
                    className="icon"
                    onClick={() => handleEdit(index, item)}
                  />
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteTodo(index)}
                  />
                </div>
              </div>
            );
          }
        })}
      {isCompleteScreen &&
        completedTodos.map((item, index) => (
          <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Completed on: {item.completedOn}</p>
            </div>
            <div>
              <AiOutlineDelete
                className="icon"
                onClick={() => handleDeleteCompletedTodo(index)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskList;
