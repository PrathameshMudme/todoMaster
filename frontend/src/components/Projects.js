import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

function Projects() {
  const { projects, addProject, setFilter } = useContext(TodoContext);
  const [newProject, setNewProject] = useState("");

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProject.trim()) {
      addProject(newProject);
      setNewProject("");
    }
  };

  return (
    <div className="projects">
      <h2>
        Projects
        <button onClick={handleAddProject}>+</button>
      </h2>
      <ul>
        {projects.map((project) => (
          <li key={project} onClick={() => setFilter(project)}>
            {project}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
