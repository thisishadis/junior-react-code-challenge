
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

const defaultTasks = [
  "Morning Strategy Meeting",
  "Review Financial Reports",
  "Project Site Visits",
  "HR and Talent Development",
];

const TaskList = () => {
  const [Tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addtask = () => {
    if (task.trim() !== "") {
      setTasks([...Tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggletask = (index) => {
    const newTasks = [...Tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deletetask = (index) => {
    const newTasks = [...Tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  // Initialize the Tasks state with defaultTasks when the component mounts
  useEffect(() => {
    setTasks(defaultTasks.map((text) => ({ text, completed: false })));
  }, []);

  const filteredTasks = Tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-[80vh] mt-8">
      <h1 className="text-2xl font-semibold mb-4">Task List</h1>
      <div className="flex justify-between gap-2 mb-4 w-[65vh]">
        <TextField
          id="standard-basic"
          label="Add a new task"
          variant="standard"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          style={{ width: "60vh" }}
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
          onClick={addtask}
        >
          Add
        </button>
      </div>
      <div className="mb-4 flex justify-between w-[65vh]">
        <button
          className={`mr-2 w-[120px] ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-3 py-2 rounded-lg`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`mr-2 w-[120px] ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-3 py-2 rounded-lg`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`w-[120px] ${
            filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-3 py-2 rounded-lg`}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>
      <ul className="w-[65vh]">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between px-3 py-2 border-b ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            <span onClick={() => toggletask(index)}>{task.text}</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toggletask(index)} // Toggle between complete and incomplete
                className={`${
                  task.completed
                    ? "bg-green-400 text-white"
                    : "bg-blue-500 text-white"
                } px-2 py-1 rounded-lg`}
              >
                {task.completed ? "Incomplete" : "Complete"}
              </button>
              <button onClick={() => deletetask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
