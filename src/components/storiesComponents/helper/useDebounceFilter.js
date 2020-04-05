import React, { useState, useEffect } from "react";

const useDebounceFilter = (filterTerm, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(filterTerm);

  useEffect(() => {
    const debouncingHandler = setTimeout(() => {
      setDebouncedValue(filterTerm);
    }, delay);

    return () => {
      clearTimeout(debouncingHandler);
    };
  }, [filterTerm, delay]);

  return debouncedValue;
};

export default useDebounceFilter;
