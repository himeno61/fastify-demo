import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

const useEmailSearch = (onSearchComplete) => {
  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useCallback(
    debounce(async (text) => {
      if (text.trim()) {
        try {
          const response = await fetch(
            `http://localhost:3001/search?searchText=${encodeURIComponent(
              text
            )}`,
            {
              headers: { Accept: "application/json" },
            }
          );
          const data = await response.json();
          onSearchComplete(data);
        } catch (error) {
          console.error("Error searching emails:", error);
        }
      } else {
        onSearchComplete(null);
      }
    }, 500),
    [onSearchComplete]
  );

  return {
    searchText,
    setSearchText,
    debouncedSearch,
  };
};

export default useEmailSearch;
