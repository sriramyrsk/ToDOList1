import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Task = ({ task, deleteTaskFn, reFetch, updateFinishedTask }) => {
  //Hooks
  const navigate = useNavigate();

  //Time Variables
  const deadlineDate = new Date(task.deadline);
  const currentTime = new Date();
  const remainingTimeSec = deadlineDate - currentTime; //12.4364768
  const remainingTime = remainingTimeSec / 1000 / 60 / 60;
  const hours = Math.floor(remainingTime); //12
  const mins = Math.floor((remainingTime - hours) * 60); //50

  //style Variables
  let bgColor;
  let txColor;
  let finishedBtnStyle;

  switch (task.status) {
    case "Completed":
      bgColor = "bg-green-500";
      txColor = "text-green-400";
      finishedBtnStyle = "invisible h-14";
      break;
    case "Yet to Complete":
      bgColor = "bg-orange-500";
      txColor = "text-orange-500";
      finishedBtnStyle =
        "btn rounded p-2 bg-green-500 text-white my-2 hover:bg-green-400 hover:font-bold";
      break;
    case "Failed to Complete":
      bgColor = "bg-red-800";
      finishedBtnStyle = "invisible h-14";
      txColor = "text-red-600";
      break;
    default:
      bgColor = "bg-orange-500";
      break;
  }

  //Functions

  const deleteTask = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task ?"
    );

    if (!confirmation) return;
    try {
      deleteTaskFn(task.id);
      toast.success("Task Deleted Successfully");
    } catch {
      toast.error("Failed to delete task");
    } finally {
      reFetch();
    }
    return;
  };

  const finishedTask = () => {
    const updatedData = { ...task, status: "Completed" };
    updateFinishedTask(updatedData, task.id);
    reFetch();
    return;
  };

  const failedTask = () => {
    const updatedData = { ...task, status: "Failed to Complete" };
    updateFinishedTask(updatedData, task.id);
    reFetch();
  };

  remainingTime < 0 && task.status != "Completed" ? failedTask() : null;

  return (
    <div
      id={task.id}
      className={`flex flex-col justify-evenly ${bgColor} w-full my-2 md:my-5 md:mx-3 md:w-2/5 min-h-64 h-fit  p-5 relative max-w-sm`}
    >
      <p className="absolute bg-black text-white w-1/4 text-center top-0 left-0 font-extrabold">
        {" "}
        {task.priority}
      </p>
      <h1 className="my-3 bg-orange-50 text-center px-2 py-3 text-rose-500 font-extrabold text-2xl">
        {task.name}
      </h1>
      <p
        className={`my-2 bg-orange-50 p-2 rounded-full w-48 text-center ${txColor} font-medium`}
      >
        {task.status}
      </p>
      <div className="my-3 flex flex-col p-3">
        <span className="my-3 flex justify-between">
          {" "}
          <p className="mr-2 font-medium px-5 py-2">Deadline</p>{" "}
          <p className="bg-orange-50 px-5 py-2 text-center">
            {" "}
            {deadlineDate.toLocaleString()}
          </p>
        </span>
        <span className="my-3 flex justify-between ">
          {" "}
          <p className="mr-2 font-medium px-2 py-2">Time Remaining</p>{" "}
          <p className="bg-orange-50 px-5 py-2 text-center">
            {" "}
            {`${hours} Hours : ${mins} Mins`}
          </p>
        </span>
      </div>
      <div className="flex flex-col">
        <button className={finishedBtnStyle} onClick={finishedTask}>
          Finished
        </button>
        <button
          className="btn rounded p-2 bg-red-500 text-white hover:bg-red-400 hover:font-bold"
          onClick={deleteTask}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Task;
