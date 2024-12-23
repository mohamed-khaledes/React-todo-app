import React, { useContext } from "react";
import TopNav from "../components/Utils/TopNav";
import FormInputs from "../components/Utils/FormInput/FormInputs";
import DataContext from "../context/DataContext";

const AddTodo = () => {
  const { data, setData, setAddNotification, setAddNotificationTitle } =
    useContext(DataContext);

  return (
    <div className=" w-full relative min-h-screen bg-gradient-to-r from-blue-700 to-blue-500">
      <div className=" max-w-[1300px] px-10 max-md:px-5 m-auto">
        <div>
          <TopNav title={"Add New Todo"}/>
          <FormInputs
            data={data}
            setData={setData}
            setAddNotification={setAddNotification}
            setAddNotificationTitle={setAddNotificationTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
