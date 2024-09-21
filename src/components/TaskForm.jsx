import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import PageBg from "../images/bg-3.jpg";
const TaskForm = ({ addTaskSubmit, tasksArray, setTasksArray }) => {
  const navigate = useNavigate();
  const warpperFlexForm =
    "flex flex-col items-center md:flex-row md:justify-evenly md:items-center";
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(1);
  const [deadline, setDeadline] = useState("");

  //this section of code is used when there is no server
  const submitForm = (e) => {
    console.log("Submit form");
    e.preventDefault();
    const newObj = {
      id: uuidv4(),
      name: name,
      priority: priority,
      deadline: deadline,
      status: "Yet to Complete",
    };
    try {
      setTasksArray([...tasksArray, newObj]); //we push data into state tasksArray
      toast.success("Task Added sucessfully");
      navigate("/view-tasks");
    } catch {
      toast.error("Failed to Add task");
    }

    console.log(tasksArray);
  };

  //This section of code is used for sending data to server
  /*
  const submitForm = (e) => {
    e.preventDefault();
    const newObj = {
      name: name,
      priority: priority,
      deadline: deadline,
      status: "Yet to Complete",
    };
    try {
      addTaskSubmit(newObj);
      toast.success("Task added sucessfully");
    } catch {
      toast.error("Failed to add Task");
    } finally {
      navigate("/view-tasks");
    }
  };*/
  return (
    <div
      className="bg-image bg-cover bg-no-repeat bg-right md:bg-center w-full h-screen opacity-80 brightness-95"
      style={{ backgroundImage: `url(${PageBg})` }}
    >
      <div className="flex items-center justify-center h-full">
        <form
          action=""
          className="flex flex-col justify-evenly bg-green-500 w-4/5 h-3/5 shadow-lg rounded-md bg-opacity-90"
          onSubmit={submitForm}
        >
          <div className={warpperFlexForm}>
            <label
              htmlFor="task"
              className="text-center md:text-xl mb-2 md:mb-0 md:w-20 font-extrabold"
            >
              Task
            </label>
            <input
              type="text"
              id="task"
              name="task"
              className="w-4/5 focus:outline-none rounded p-2 appearance-none form-input  focus:ring-2 disabled:opacity-50"
              required
              placeholder="Add your tasks here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={warpperFlexForm}>
            <label
              htmlFor="priority"
              className="text-center mb-2 md:text-xl md:mb-0 md:w-20 font-extrabold"
            >
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              className="w-4/5 focus:ring-2 focus:outline-none rounded p-2 form-select cursor-pointer"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div className={warpperFlexForm}>
            <label
              htmlFor="deadline"
              className="text-center mb-2 md:text-xl md:mb-0 md:w-20 font-extrabold"
            >
              Deadline
            </label>
            <input
              type="datetime-local"
              name="deadline"
              id="deadline"
              className="w-4/5 focus:outline-none rounded p-2 cursor-pointer"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className={warpperFlexForm}>
            <button
              className="btn w-4/5 md:w-52 rounded-md p-2 bg-white font-medium hover:bg-opacity-80"
              type="submit"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
