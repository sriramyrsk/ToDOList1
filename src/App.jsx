import React from "react";
import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddTasksPage from "./pages/AddTasksPage";
import ViewTasksPage from "./pages/ViewTasksPage";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const [tasksArray, setTasksArray] = useState([]);

  const addTask = () => {};

  const deleteTask = () => {};

  const finishedTask = () => {};
  /*This section handles API and methods suchs get post put etc
  const addTask = async (newJob) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  const deleteTask = async (taskId) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });
  };

  const finishedTask = async (updatedData, taskId) => {
    const apiRes = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  };
*/
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/add-tasks"
          element={
            <AddTasksPage
              addTaskSubmit={addTask}
              tasksArray={tasksArray}
              setTasksArray={setTasksArray}
            />
          }
        />
        <Route
          path="/view-tasks"
          element={
            <ViewTasksPage
              deleteTaskFn={deleteTask}
              updateFinishedTask={finishedTask}
              tasksArray={tasksArray}
              setTasksArray={setTasksArray}
            />
          }
        ></Route>
        <Route path="/about" element={<AboutPage />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
