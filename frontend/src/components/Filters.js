import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

function Filters() {
  const { filter, setFilter } = useContext(TodoContext);
  const [isToggleOn, setIsToggleOn] = useState(false);

  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
    // You can add dark mode functionality here
  };

  return (
    <div className="filters">
      <h2>
        Filters
        <div
          className={`toggle ${isToggleOn ? "on" : ""}`}
          onClick={handleToggle}
        ></div>
      </h2>
      <ul>
        <li
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </li>
        <li
          onClick={() => setFilter("starred")}
          className={filter === "starred" ? "active" : ""}
        >
          Starred
        </li>
        <li
          onClick={() => setFilter("today")}
          className={filter === "today" ? "active" : ""}
        >
          Today
        </li>
        <li
          onClick={() => setFilter("week")}
          className={filter === "week" ? "active" : ""}
        >
          Week
        </li>
      </ul>
    </div>
  );
}

export default Filters;
