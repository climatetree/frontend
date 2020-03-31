import { useState, useEffect } from "react";

import { fetchStories } from "../services/fetchStories";

const useStories = (category, term) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    (async (category, term) => {
      let response = await fetchStories(category, term);

      setStories(response);
    })(category, term);
  }, []);

  return stories;
};

export default useStories;
