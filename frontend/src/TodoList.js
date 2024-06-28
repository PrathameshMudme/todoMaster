import React, { useState } from "react";

function TodoList({
  todos,
  toggleComplete,
  toggleStar,
  addTodo,
  currentProject,
  currentFilter,
}) {
  const [newTodoText, setNewTodoText] = useState("");

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "starred") return todo.starred;
    if (currentFilter === "today")
      return todo.dueDate === new Date().toDateString();
    if (currentFilter === "week") {
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return new Date(todo.dueDate) <= weekFromNow;
    }
    return todo.projectId === currentProject;
  });

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim(), currentProject);
      setNewTodoText("");
    }
  };

  return (
    <div className="todo-list">
      <h2>Tasks</h2>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id)}
            />
            <span className={todo.completed ? "completed" : ""}>
              {todo.title}
            </span>
            <button onClick={() => toggleStar(todo._id)}>
              {todo.starred ? "★" : "☆"}
            </button>
          </li>
        ))}
      </ul>
      <div className="add-todo">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add Task</button>
      </div>
    </div>
  );
}

export default TodoList;
