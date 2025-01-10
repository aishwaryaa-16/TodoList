import React, { Component, useEffect, useState, useRef} from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import Typed from "typed.js";

const Tasks = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const typedElement = useRef(null); // Ref for Typed.js

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ['Taskify – Stay on Track, Stay on Top .', 'Taskify – Your Task Organiser!'], // Add your strings here
      typeSpeed: 50,
      backSpeed: 25,
      loop: true, // Makes the typing effect loop
    });
    return () => {
        typed.destroy();
      };
    }, []);
  
    const saveToLS = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };
  
    const toggleFinished = () => {
      setshowFinished(!showFinished);
    };
  
    const handleEdit = (e, id) => {
      const t = todos.filter((i) => i.id === id);
      setTodo(t[0].todo);
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLS();
    };
  
    const handleDelete = (e, id) => {
      const userConfirmed = confirm("Are you sure you want to delete this to-do?");
      if (userConfirmed) {
        const newTodos = todos.filter((item) => item.id !== id);
        setTodos(newTodos);
        saveToLS();
      }
    };
  
    const handleAdd = () => {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
      saveToLS();
    };
  
    const handleChange = (e) => {
      setTodo(e.target.value);
    };
  
    const handleCheckbox = (e) => {
      const id = e.target.name;
  
      const index = todos.findIndex((item) => item.id === id);
      const newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      saveToLS();
    };
  
  return (
    <>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[85vh] w-full md:w-3/4 lg:w-1/2">
        <h1 className="font-bold text-center text-3xl">
          <span ref={typedElement}></span> {/* Typed.js effect */}
        </h1>
        <div className="addTodo my-6 flex flex-col gap-3">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-lg px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-blue-800 hover:bg-blue-950 disabled:bg-blue-750 p-4 py-2 text-sm font-bold text-white rounded-md mx-2"
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        Show Finished
        <hr />
        <h2 className="text-xl font-bold">Your ToDos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">No Todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex flex-wrap my-3 justify-between"
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=" "
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Tasks

