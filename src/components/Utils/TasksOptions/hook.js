import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DataContext from "../../../context/DataContext";
const TasksOptionsHook = (
  data,
  setData,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setOpenOptions,
) => {
  const { setIndex } = useContext(DataContext);

  const handleDelete = (isData) => {
    const deleteData = data?.filter((val) => val?.id !== isData?.id);
    setData(deleteData);
    localStorage.setItem("todoItems", JSON.stringify(deleteData));

    setDeleteNotificationTitle(isData?.title);

    setDeleteNotification(true);
    setOpenOptions(false);
    setTimeout(() => {
      setDeleteNotification(false);
      setDeleteNotificationTitle("");
    }, 4000);
  };

  const handleCheck = (id) => {
    const doneData = data.map((val) =>
      val.id === id ? { ...val, check: !val.check } : val
    );
    setData(doneData);
    setOpenOptions(false);
    localStorage.setItem("todoItems", JSON.stringify(doneData));
  };

  const handleCopy = (val) => {
    const now = new Date();

    const date = now.getDate();

    const month = now.getMonth() + 1;

    const year = now.getFullYear();

    // Get the hours (in 24-hour format)
    let hours = now.getHours();

    // Determine whether it's AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = (hours % 12 || 12).toString().padStart(2, "0");

    // Get the minutes
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const copyObj = {
      id: uuidv4(),
      title: val.title,
      description: val.description,
      check: false,
      currentTime: `${date}/${month}/${year} ,${hours}:${minutes} ${amOrPm}`,
      catagory: val.catagory,
    };

    setData([...data, copyObj]);
    setOpenOptions(false);
    localStorage.setItem("todoItems", JSON.stringify([...data, copyObj]));
  };

  return  { handleCheck, setIndex, handleCopy, handleDelete } 

};

export default TasksOptionsHook;
