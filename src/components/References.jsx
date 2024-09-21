import React from "react";
import { Link } from "react-router-dom";
const References = () => {
  return (
    <div className="bg-green-400 px-2 py-5 md:p-5 my-7">
      <h1 className="font-extrabold text-4xl my-3 text-red-600">References</h1>
      <div className="flex md:flex-row flex-col">
        <p className="font-bold">
          React 3 Hours Crash Course from traversy media youtube :{" "}
        </p>
        <Link
          to="https://www.youtube.com/watch?v=LDB4uaJ87e0&t=8742s"
          target="_blank"
          className="text-blue-500 font-extrabold"
        >
          &nbsp;https://www.youtube.com/watch?v=LDB4uaJ87e0&t=8742s
        </Link>
      </div>
      <div className="flex md:flex-row flex-col">
        <p className="font-bold">
          Code for ToDoList using server :{" "}
        </p>
        <Link
          to="https://github.com/sriramyrsk/ToDoList"
          target="_blank"
          className="text-blue-500 font-extrabold"
        >
          &nbsp;https://github.com/sriramyrsk/ToDoList
        </Link>
      </div>

      <p className="font-medium">
        ChatGpt and Gemini : I cleared doubts on fundamentals like api , server
        ,etc. Also helped in understanding and solving the Errors
      </p>
    </div>
  );
};

export default References;
