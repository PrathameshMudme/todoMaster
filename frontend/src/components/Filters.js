import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function Filters() {
  const { setFilter, setCurrentProject } = useContext(TodoContext);

  const handleFilterClick = (filter) => {
    setFilter(filter);
    if (
      filter !== "all" &&
      filter !== "starred" &&
      filter !== "today" &&
      filter !== "week"
    ) {
      setCurrentProject(filter);
    } else {
      setCurrentProject("Default");
    }
  };

  return (
    <div className="filters">
      <h2>Filters</h2>
      <ul>
        <li onClick={() => handleFilterClick("all")}>All</li>
        <li onClick={() => handleFilterClick("starred")}>Starred</li>
        <li onClick={() => handleFilterClick("today")}>Today</li>
        <li onClick={() => handleFilterClick("week")}>This Week</li>
      </ul>
    </div>
  );
}

export default Filters;
