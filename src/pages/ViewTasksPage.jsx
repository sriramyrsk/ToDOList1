import React from "react";
import Tasks from "../components/Tasks";
const ViewTasksPage = ({
  deleteTaskFn,
  updateFinishedTask,
  tasksArray,
  setTasksArray,
}) => {
  return (
    <>
      <Tasks
        deleteTaskFn={deleteTaskFn}
        updateFinishedTask={updateFinishedTask}
        tasksArray={tasksArray}
        setTasksArray={setTasksArray}
      />
    </>
  );
};

export default ViewTasksPage;
