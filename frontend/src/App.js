import React from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Filters from "./components/Filters";
import Projects from "./components/Projects";
import { TodoProvider } from "./context/TodoContext";

export default function App() {
  return (
    <TodoProvider>
      <div className="App">
        <header>
          <h1>
            todo<span>Master</span>.
          </h1>
        </header>
        <main>
          <aside>
            <Filters />
            <div className="projects-container sidebar">
              <Projects />
            </div>
          </aside>
          <section>
            <TodoList />
            <AddTodo />
          </section>
        </main>
      </div>
    </TodoProvider>
  );
}
