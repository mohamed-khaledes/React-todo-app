import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const FormInputHook = (
  data,
  setData,
  setAddNotification,
  setAddNotificationTitle
) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [emptyInputError, setEmptyInputError] = useState(false);

  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");

  const [CategoryOpen, setCategoryOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState([]);

  const [maxSelectedError, setMaxSelectedError] = useState(false);

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleName = (e) => {
    let title = e.target.value;
    setTaskName(e.target.value);

    if (title.length > 35) {
      setNameCountError("Name should be less than or equal to 30 characters");
    } else {
      setNameCountError("");
    }
  };

  const handleDescription = (e) => {
    let description = e.target.value;
    setTaskDescription(e.target.value);

    if (description.length > 250) {
      setDescriptionCountError(
        "Description should be less than or equal to 200 characters"
      );
    } else {
      setDescriptionCountError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new Date object
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

    const id = uuidv4();
    const title = taskName;
    const description = taskDescription;
    const currentTime = `${date}/${month}/${year} ,${hours}:${minutes} ${amOrPm}`;
    const check = false;

    if (taskName === "") {
      setEmptyInputError(true);

      setTimeout(() => {
        setEmptyInputError(false);
      }, 4000);
    } else {
      const newTask = {
        id: id,
        title: title,
        description: description,
        currentTime: currentTime,
        check: check,
        catagory: selectedCategory,
      };

      localStorage.setItem("todoItems", JSON.stringify([...data, newTask]));
      setData([...data, newTask]);
      setTaskName("");
      setTaskDescription("");
      setEmptyInputError(false);
      navigate("/");

      setAddNotificationTitle(taskName);
      setAddNotification(true);
      setTimeout(() => {
        setAddNotification(false);
        setAddNotificationTitle("");
      }, 4000);
    }
  };

  const handleSelected = (catagoryObj) => {
    setSelectedCategory([...selectedCategory, catagoryObj]);

    const isCategorySelected = selectedCategory.filter(
      (val) => val.id === catagoryObj.id
    );

    if (isCategorySelected.length) {
      const updatedCatagories = selectedCategory.filter(
        (val) => val.id !== catagoryObj.id
      );
      setSelectedCategory(updatedCatagories);
    } else {
      if (selectedCategory.length < 3) {
        setMaxSelectedError(false);
        setSelectedCategory([...selectedCategory, catagoryObj]);
      } else {
        setMaxSelectedError(true);
        setTimeout(() => {
          setMaxSelectedError(false);
        }, 4000);
        setSelectedCategory([...selectedCategory]);
      }
    }

    // const isCategorySelected = selectedCategory.includes(catagory);

    // if (isCategorySelected) {
    //   const updatedCategories = selectedCategory.filter(
    //     (val) => val !== catagory
    //   );
    //   setselectedCategory(updatedCategories);
    //   console.log(updatedCategories);
    // } else {
    //   if (selectedCategory.length < 3) {
    //     setMaxSelectedError(false);
    //     setselectedCategory([...selectedCategory, catagory]);
    //   } else {
    //     setMaxSelectedError(true);
    //     setTimeout(() => {
    //       setMaxSelectedError(false);
    //     }, 4000);
    //     const updatedCategories = [...selectedCategory];
    //     setselectedCategory(updatedCategories);
    //   }
    // }
  };

  const categoryRef = useRef();

  useEffect(() => {
    let handleCatagoryTouch = (e) => {
      if (!categoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCatagoryTouch);

    return () => document.removeEventListener("mousedown", handleCatagoryTouch);
  });

  return {
    emptyInputError,
    nameCountError,
    descriptionCountError,
    CategoryOpen,
    maxSelectedError,
    handleDescription,
    handleKeyDown,
    handleName,
    handleSubmit,
    handleSelected,taskName,taskDescription,categoryRef,setCategoryOpen,selectedCategory
  };
};

export default FormInputHook;
