import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function AddTodo() {
  const [title, setTitle] = useState("");
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle("");
    }
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add Task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTodo;
