import React from "react";
import AddTodo from "./pages/AddTodo";
import { Route, Routes } from "react-router-dom";
import EditTodo from "./pages/EditTodo";
import TaskDetails from "./pages/TaskDetails";
import { DataProvider } from "./context/DataContext";
import PageNotFound from "./pages/NotFound";
import Home from "./pages/Home";

const App = () => {
  return (
    <DataProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addTodo" element={<AddTodo />} />

          <Route path="/edit" element={<EditTodo />} />

          <Route path="/todo/:id" element={<TaskDetails />} />

          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </div>
    </DataProvider>
  );
};

export default App;
