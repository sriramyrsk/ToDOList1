import React from "react";
import TaskForm from "../components/TaskForm";
const AddTasksPage = ({ addTaskSubmit, tasksArray, setTasksArray }) => {
  return (
    <>
      <TaskForm
        addTaskSubmit={addTaskSubmit}
        tasksArray={tasksArray}
        setTasksArray={setTasksArray}
      />
    </>
  );
};

export default AddTasksPage;
