import React from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Task = ({
  task,
  deleteTaskFn,
  reFetch,
  updateFinishedTask,
  removeFromArray,
  updatedStatus,
}) => {
  //Note : the code section below is used only when there is no server to render the components

  //Time Variables on Global Scope

  const deadlineDate = new Date(task.deadline);
  const currentTime = new Date();
  const remainingTimeSec = deadlineDate - currentTime; //12.4364768
  const remainingTime = remainingTimeSec / 1000 / 60 / 60;

  //Time Variables as function

  const calculateRemainingTime = () => {
    const deadline = new Date(task.deadline);
    const current = new Date();
    const remaingTime = deadline - current;
    const remainingTimehrs = remaingTime / 1000 / 60 / 60;
    return remainingTimehrs;
  };

  const [remTime, setRemTime] = useState(calculateRemainingTime); //Setting Timer as State
  const hours = Math.floor(remainingTime); //12
  const mins = Math.floor((remainingTime - hours) * 60); //50

  //Used for updating the time state every minute
  useEffect(() => {
    //useEffect here because we have timer
    const timer = setInterval(() => {
      setRemTime(calculateRemainingTime());
    }, 60000); //runs this function on loop every 60 secs
    return () => clearInterval(timer); //when the component unmounts it stops the loop
  }, []);
  //useEffect here for reRendering on change in timeState and status
  useEffect(() => {
    if (remTime < 0 && task.status !== "Completed") {
      failedTask();
      console.log("working");
    }
  }, [remTime, task.status]); // Only runs when remainingTime or task.status changes

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

  const finishedTask = () => {
    // console.log("finished task")
    updatedStatus(task.id, "Completed");
    // console.log(tasksArray)
  };
  const deleteTask = () => {
    console.log("finished task");
    const confirmation = window.confirm(
      "Are you sure you want to delete this task ?"
    );

    if (!confirmation) return;

    try {
      removeFromArray(task.id);
      toast.success("Task Deleted Sucessfully");
    } catch {
      toast.error("Failed to Delete the Task");
    }
  };
  const failedTask = () => {
    console.log("failed task");
    updatedStatus(task.id, "Failed to Complete");

    return;
  };

  //for fetching api's
  //these code works when we have server
  /*
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
  };*/

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

/*
Problme:Not using useState properly
Need for useState :

for changing Tasks I used them as Arrays and not State Array 
result : The change in arrays were not rendered by the component 

 for calculating remaing time I was not using state instead I used variable 
 result: the time was calculated only once and not updated later

 Need for useEffect :
 Use Effect allows us to reRender component after a change in some of its dependency array or it just renders or mounts component in the begning

With a change in some state in the dependency array, the useEffect will do some action first, and then the component will render again.

 I needed to update the time state with value for every certain intervals

 for this i used setINterval from js which - runs something in a gap of some intervals
 then i used return ()=> useEffect cleanup function to clear this interval

 result: the change in time was not visible after recaculating them after every 60 second

 I Used useEffect for calling a function to let the react reRender the changes of the function with dependency= on Change of which state(in this case its the remtim) 
 i should do some action and render

 I specified the states to be remaining time 

*/
