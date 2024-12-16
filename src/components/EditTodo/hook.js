import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";

const EditTodoHook = () => {
  const {
    data,
    setData,
    edit,
    setEdit,
    setEditNotificationTitle,
    setEditNotification,
    index,
  } = useContext(DataContext);

  const [emptyInputError, setEmptyInputError] = useState(false);

  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");
  const [CategoryOpen, setCategoryOpen] = useState(false);

  const [selectedCatagory, setSelectedCatagory] = useState([]);
  const [maxSelectedError, setMaxSelectedError] = useState(false);

  const navigate = useNavigate("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleEditTitle = (e) => {
    let title = e.target.value;
    setEdit({
      id: edit.id,
      title: title,
      description: edit.description,
      check: edit.check,
      currentTime: edit.currentTime,
      catagory: edit.catagory,
    });

    if (title.length >= 35) {
      setNameCountError("Name should be less than or equal to 30 characters");
    } else {
      setNameCountError("");
    }
  };

  const handleEditDescription = (e) => {
    let description = e.target.value;
    setEdit({
      id: edit.id,
      title: edit.title,
      description: description,
      check: edit.check,
      currentTime: edit.currentTime,
      catagory: edit.catagory,
    });

    if (description.length >= 200) {
      setDescriptionCountError(
        "Description should be less than or equal to 200 characters"
      );
    } else {
      setDescriptionCountError("");
    }
  };

  const handleEditSubmit = (e, index) => {
    e.preventDefault();

    if (edit.title === "") {
      setEmptyInputError(true);

      setTimeout(() => {
        setEmptyInputError(false);
      }, 4000);
    } else {
      const editIndex = [...data];
      editIndex[index] = edit;

      setData(editIndex);
      localStorage.setItem("todoItems", JSON.stringify(editIndex));
      setEdit("");
      navigate("/");

      setEditNotificationTitle(edit.title);
      setEditNotification(true);
      setTimeout(() => {
        setEditNotification(false);
        setEditNotificationTitle("");
      }, 4000);
    }
  };

  const handleCancel = () => {
    setEdit("");
    navigate("/");
  };

  const catagoryRef = useRef();

  useEffect(() => {
    let handleCatagoryTouch = (e) => {
      if (!catagoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCatagoryTouch);

    return () => document.removeEventListener("mousedown", handleCatagoryTouch);
  });

  useEffect(() => {
    if (edit.id) {
      const editCata = edit.catagory.map((v) => v);
      setSelectedCatagory(editCata);
    } else {
      return;
    }
  }, [edit]);

  const handleSelected = (catagoryObj) => {
    const isCategorySelected = selectedCatagory.filter(
      (val) => val.id === catagoryObj.id
    );

    if (isCategorySelected.length) {
      const updatedCatagories = selectedCatagory.filter(
        (val) => val.id !== catagoryObj.id
      );
      setSelectedCatagory(updatedCatagories);
      setEdit({
        id: edit.id,
        title: edit.title,
        description: edit.description,
        check: edit.check,
        currentTime: edit.currentTime,
        catagory: updatedCatagories,
      });
    } else {
      if (selectedCatagory.length < 3) {
        setMaxSelectedError(false);
        setSelectedCatagory([...selectedCatagory, catagoryObj]);
        setEdit({
          id: edit.id,
          title: edit.title,
          description: edit.description,
          check: edit.check,
          currentTime: edit.currentTime,
          catagory: [...selectedCatagory, catagoryObj],
        });
      } else {
        setMaxSelectedError(true);
        setTimeout(() => {
          setMaxSelectedError(false);
        }, 4000);
        setSelectedCatagory([...selectedCatagory]);
        setEdit({
          id: edit.id,
          title: edit.title,
          description: edit.description,
          check: edit.check,
          currentTime: edit.currentTime,
          catagory: [...selectedCatagory],
        });
      }
    }
  };


  return {
    nameCountError,
    edit,
    handleEditTitle,
    handleKeyDown,
    descriptionCountError,
    handleEditDescription,
    catagoryRef,
    setCategoryOpen,
    CategoryOpen,
    handleCancel,
    handleSelected,
    selectedCatagory,
    handleEditSubmit,
    emptyInputError,
    maxSelectedError,
    index,
  }
};

export default EditTodoHook;
