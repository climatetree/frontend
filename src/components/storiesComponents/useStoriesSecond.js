import { useState, useEffect } from "react";
import axios from "axios";

// Hooks State
const useStoriesSecond = (url, parameter) => {
  const [storiesSecond, setStoriesSecond] = useState([]);

  const fetchStories = async (url, parameter) => {
    const response = await axios.get(`${url}${parameter}`);

    setStoriesSecond(response.data);
  };

  useEffect(() => {
    fetchStories(url, parameter);
  }, [storiesSecond]);

  return storiesSecond;
};

export default useStoriesSecond;
