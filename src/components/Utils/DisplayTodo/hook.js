import { useEffect, useState } from "react";

const DisplayTodoHook = (data) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const completedTask = () => {
    const completed = data.filter((val) => val.check);

    if (data.length) {
      const completePercentage = (completed.length / data.length) * 100;
      return completePercentage.toFixed();
    } else {
      return 0;
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterResults = data.filter(
      (val) =>
        val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults);
  }, [data, search]);

  const handleTasksStatus = () => {
    const parsePercentage = parseFloat(completedTask());

    if (parsePercentage === 0) {
      return "No tasks completed";
    } else if (parsePercentage === 100) {
      return "All tasks completed";
    } else if (parsePercentage >= 50) {
      return "More than half tasks completed";
    } else {
      return "Less than half tasks completed";
    }
  };

  return {
    handleTasksStatus,
    completedTask,
    search,
    handleSearch,
    searchResults,
  };
};

export default DisplayTodoHook;
