import React from "react";
import TopNav from "../components/Utils/TopNav";
import EditTodoContent from "../components/EditTodo/edit-todo-content";

const EditTodo = () => {

  return (
    <div className=" w-full relative min-h-screen bg-gradient-to-r from-blue-700 to-blue-500">
      <div className=" max-w-[1300px] px-10 max-md:px-5 m-auto">
        <div>
          <TopNav title={"Edit Todo"} />
          <EditTodoContent/>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
