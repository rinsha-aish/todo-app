import React, { useState, useEffect } from 'react';
import './assets/styles/App.css'; 
import AddTask from './Components/AddTask/AddTask';
import TaskList from './Components/TaskList/TaskList';

function App() {
  //state declarations
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");


  //function to add a new task
  const handleAddTodo = (title, description) => {
    let newTodoItem = {
      title,
      description,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }; //storing updated tasks in localstorage


  //delete task
  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo)); //update storage after deleteing a todo item
    setTodos(reducedTodo);
  };


  //mask as completed
  const handleComplete = index => {
    let now = new Date();
    let completedOn = now.toLocaleString();

    let filteredItem = {
      ...allTodos[index],
      completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    handleDeleteTodo(index); //removing completed task from active task list
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr)); //storing completed task in local storage
  };


  //delete completed task
  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo)); //update storage after deletion
    setCompletedTodos(reducedTodo);
  };


  //hook to load tasks from local storage
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  
  //task editing
  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  //update task title
  const handleUpdateTitle = value => {
    setCurrentEditedItem(prev => ({ ...prev, title: value }));
  };


  //update task description
  const handleUpdateDescription = value => {
    setCurrentEditedItem(prev => ({ ...prev, description: value }));
  };

  //update the edited task
  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  };


  //rendering jsx

  return (
    <div className="App">
      <h1>Task Manager Pro</h1>
      <div className="todo-wrapper">

        {/*AddTask Component*/}
        <AddTask
          handleAddTodo={handleAddTodo}
        />

        {/*buttons for toggling between active and completed tasks*/}
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Active Tasks
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed Tasks
          </button>
        </div>

        {/*TaskList Component*/}
        <TaskList
          isCompleteScreen={isCompleteScreen}
          allTodos={allTodos}
          completedTodos={completedTodos}
          currentEdit={currentEdit}
          currentEditedItem={currentEditedItem}
          handleEdit={handleEdit}
          handleUpdateTitle={handleUpdateTitle}
          handleUpdateDescription={handleUpdateDescription}
          handleUpdateToDo={handleUpdateToDo}
          handleDeleteTodo={handleDeleteTodo}
          handleComplete={handleComplete}
          handleDeleteCompletedTodo={handleDeleteCompletedTodo}
        />
      </div>
    </div>
  );
}

export default App;
