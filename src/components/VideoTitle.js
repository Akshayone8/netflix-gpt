import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0">
        <button className=" text-black py-1 md:py-4 px-3 md:px-12 bg-white rounded-md hover:opacity-80">
          ▶️ Play
        </button>
        <button className="hidden mx-2 md:inline-block text-white p-4 px-12 bg-gray-500 bg-opacity-50 rounded-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
