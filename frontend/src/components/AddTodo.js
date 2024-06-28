import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function AddTodo() {
  const [title, setTitle] = useState("");
  const { addTodo, currentProject } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title, currentProject);
      setTitle("");
    }
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit" className="icon-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}

export default AddTodo;
