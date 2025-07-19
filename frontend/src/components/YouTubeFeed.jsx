// src/components/YouTubeFeed.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_YOUTUBE_KEY; // Use VITE prefix for environment variables  
const CHANNEL_ID = import.meta.env.CHANNEL_ID; // Replace with your actual Channel ID
const MAX_RESULTS = 6;

const YouTubeFeed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        );
        setVideos(res.data.items);
      } catch (err) {
        console.error("YouTube API error:", err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
     {videos
  .filter((video) => video.id.videoId) // ✅ Remove items without videoId
  .map((video) => (
    <div
      key={video.id.videoId}
      className="group bg-white rounded-3xl border border-yellow-100 shadow-md hover:shadow-xl transition-all duration-300 p-3 transform hover:-translate-y-1 hover:scale-[1.02]"
    >
      <div className="aspect-w-16 aspect-h-16 overflow-hidden rounded-xl shadow-sm">
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          frameBorder="0"
          allowFullScreen
          title={video.snippet.title}
        ></iframe>
      </div>
      <h4 className="mt-4 text-lg font-semibold text-orange-700 group-hover:underline line-clamp-2">
        {video.snippet.title}
      </h4>
    </div>
))}

    </>
  );
};

export default YouTubeFeed;
