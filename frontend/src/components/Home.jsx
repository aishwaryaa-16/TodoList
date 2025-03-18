import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    
    <div className="container mx-auto my-5 p-5 rounded-xl bg-blue-200 min-h-[85vh] w-full md:w-3/4 lg:w-1/2 flex flex-col items-center">
      {/* Title */}
      <video src="/src/todo_list_video.mp4" autoPlay loop muted/>
      <h1 className="text-4xl font-bold text-blue-950 text-center mb-5 py-7">
        Welcome to <span className="text-blue-700">Taskify!</span>
      </h1>

      {/* Introduction Section */}
      <p className="text-center text-lg text-gray-700 mb-6">
        Your ultimate task organizer to simplify your daily workflow. Create, edit, and manage tasks efficiently and stay on top of your goals!
      </p>

      {/* Features Section */}
      <div className="features flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-semibold text-blue-800">Key Features</h2>
        <ul className="list-disc list-inside text-left text-gray-600">
          <li>Add, Edit, and Delete Tasks Seamlessly</li>
          <li>Mark Tasks as Completed</li>
          <li>Save Your Tasks Locally</li>
          <li>Interactive UI with Live Typing Animation</li>
        </ul>
      </div>

      {/* Navigation Section */}
      <div className="mt-10 flex gap-6">
        <Link to="/tasks">
          <button className="bg-blue-800 hover:bg-blue-950 px-6 py-3 text-white font-bold rounded-md">
            Get Started
          </button>
        </Link>
     
      </div>
    </div>
    </>
  );
};

export default Home;
