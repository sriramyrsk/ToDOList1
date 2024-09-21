import React from "react";
import Task from "./Task";
import { useState, useEffect } from "react"; //used when we fetch from server
import { Link } from "react-router-dom";
const Tasks = ({
  deleteTaskFn,
  updateFinishedTask,
  tasksArray,
  setTasksArray,
}) => {
  let updatedArray;
  const fetchTask = () => {};

  //This section of code works when we have a server to fetch data from

  /*const fetchTask = async () => {
    try {
      const data = await fetch("/api/tasks");
      const res = await data.json();
      const sortedRes = res.sort((a, b) => a.priority - b.priority);
      setTasks(sortedRes);
    } catch {
      console.log("Error fetching data");
    }
  };

   useEffect(() => {
     fetchTask();
   }, []);
*/

  //This section of code is used when we dont use server

  //removes element with target id from state array
  const removeFromArray = (taskId) => {
    updatedArray = tasksArray.filter((task) => task.id != taskId);
    setTasksArray(updatedArray);
    console.log(tasksArray);
  };

  //updates existing state array
  const updatedStatus = (taskId, newStatus) => {
    updatedArray = tasksArray.map((task) => {
      if (task.id == taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasksArray(updatedArray);
    console.log(tasksArray);
  };

  return (
    <>
      <div className="flex justify-evenly bg-orange-50 flex-wrap min-h-screen">
        {tasksArray.length > 0 ? (
          tasksArray.map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTaskFn={deleteTaskFn}
              reFetch={fetchTask}
              updateFinishedTask={updateFinishedTask}
              removeFromArray={removeFromArray}
              tasksArray={tasksArray}
              setTasksArray={setTasksArray}
              updatedStatus={updatedStatus}
            />
          ))
        ) : (
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-center align-center font-extrabold">
              Sorry No tasks added yet! Please add tasks to view them
            </h1>
            <Link to="/add-tasks" className="text-blue-500">
              click here to a add Task
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;

/*
1)Using useEffect with ()=>{
    const somefn= async()=>{
        }
    } []

    using this we fetch data from server

2)storing data into a state

3)Looping for each element in the state 
passing 1 element as prop to task comp which prints data using that object

Mistakes:
1)Forgot to call the api function
2)failed to select single element from state where i fetched the array
*/
