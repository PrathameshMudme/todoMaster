import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState(["Default"]);

  const [currentProject, setCurrentProject] = useState("Default");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const editProject = (oldName, newName) => {
    if (!projects.includes(newName)) {
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p === oldName ? newName : p))
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.project === oldName ? { ...todo, project: newName } : todo
        )
      );
      if (currentProject === oldName) {
        setCurrentProject(newName);
      }
    }
  };

  const deleteProject = (projectName) => {
    if (projectName !== "Default") {
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p !== projectName)
      );
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.project !== projectName)
      );
      if (currentProject === projectName) {
        setCurrentProject("Default");
      }
    }
  };
  const addTodo = async (title, project = "Default") => {
    try {
      const response = await axios.post("http://localhost:8001/api/todos", {
        title,
        project,
        createdAt: new Date(),
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const editTodo = async (id, title) => {
    try {
      const response = await axios.patch(
        `http://localhost:8001api/todos/${id}`,
        { title }
      );
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === id ? response.data : t))
      );
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(
        `http://localhost:8001/api/todos/${id}`,
        { completed: !todo.completed }
      );
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === id ? response.data : t))
      );
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const toggleStar = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(
        `http://localhost:8001/api/todos/${id}`,
        { starred: !todo.starred }
      );
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === id ? response.data : t))
      );
    } catch (error) {
      console.error("Error toggling todo star:", error);
    }
  };

  const addProject = (projectName) => {
    if (!projects.includes(projectName)) {
      setProjects((prevProjects) => [...prevProjects, projectName]);
      setCurrentProject(projectName);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "starred") return todo.starred;
    if (filter === "today")
      return (
        new Date(todo.dueDate).toDateString() === new Date().toDateString()
      );
    if (filter === "week") {
      const today = new Date();
      const weekLater = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      return new Date(todo.dueDate) <= weekLater;
    }
    return todo.project === filter;
  });

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        filter,
        setFilter,
        projects,
        currentProject,
        setCurrentProject,
        addTodo,
        toggleComplete,
        toggleStar,
        addProject,
        editProject,
        deleteProject,
        editTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
