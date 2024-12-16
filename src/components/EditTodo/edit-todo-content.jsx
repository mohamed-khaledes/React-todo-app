import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import EditCatagoryBtn from "../../components/Utils/EditCatagoryBtn";
import { category } from "../../constants/Data";
import EditTodoHook from "./hook";

const EditTodoContent = () => {
  const {
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
  } = EditTodoHook();
  return (
    <div className="mt-10">
      <form className="max-w-[600px] m-auto">
        <div>
          <label
            className={`text-sm max-sm:text-xs ${
              nameCountError ? "text-red-500" : "text-blue-200"
            } text-blue-200`}
            htmlFor="taskName"
          >
            Edit Name
          </label>
          <input
            type="text"
            id="taskName"
            value={edit.title}
            onChange={handleEditTitle}
            onKeyDown={handleKeyDown}
            placeholder="Enter task name"
            className={`w-full h-14 max-sm:h-12 ${
              nameCountError ? "border-red-500 border-2" : "border-none"
            } rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none`}
          />
          <p className="text-red-500 text-base max-sm:text-xs mt-1">
            {nameCountError}
          </p>
        </div>
        <div className=" mt-7 max-sm:mt-4">
          <label
            className={`text-sm max-sm:text-xs ${
              descriptionCountError ? "text-red-500" : "text-blue-200"
            } text-blue-200`}
            htmlFor="taskDescription"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            value={edit.description}
            onChange={handleEditDescription}
            placeholder="Enter task description"
            className={`resize-none ${
              descriptionCountError ? "border-red-500 border-2" : "border-none"
            }  w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none`}
          ></textarea>
          <p className="text-red-500 text-base max-sm:text-xs mt-1">
            {descriptionCountError}
          </p>
        </div>

        <div ref={catagoryRef} className=" mt-7 max-sm:mt-4">
          <label className="text-sm text-blue-200">Category</label>

          <div
            onClick={() => setCategoryOpen(!CategoryOpen)}
            className=" bg-white flex gap-7 cursor-pointer justify-between min-h-14 max-sm:min-h-12 px-3 py-3 max-sm:px-2 max-sm:py-2 items-center max-sm:text-xs rounded-xl w-full mt-1"
          >
            {edit.id && (
              <div className=" flex gap-2 flex-wrap items-center">
                {edit.catagory.map((val, index) => (
                  <div
                    key={index}
                    className=" bg-blue-500 text-white text-sm max-sm:text-xs flex items-center gap-1 px-3 py-2 max-sm:py-2 font-medium rounded-lg"
                  >
                    <span className=" text-xl max-sm:text-sm">{val.emoji}</span>
                    {val.catagory}
                  </div>
                ))}
              </div>
            )}
            <div className=" ms-auto">
              {CategoryOpen ? (
                <IoIosArrowUp className=" text-2xl max-sm:text-xl" />
              ) : (
                <IoIosArrowDown className=" text-2xl max-sm:text-xl" />
              )}
            </div>
          </div>
          {CategoryOpen ? (
            <div className="mt-3">
              <ul className=" p-2 bg-blue-400 flex flex-col gap-2 max-sm:gap-1 rounded-xl">
                {category.map((val, index) => (
                  <EditCatagoryBtn
                    key={index}
                    val={val}
                    handleSelected={handleSelected}
                    selectedCatagory={selectedCatagory}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="text-center flex gap-4 max-sm:flex-col mt-4">
          <button
            onClick={handleCancel}
            className="bg-blue-400 hover:bg-blue-800 transition text-xl font-bold text-white p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full"
          >
            Cancel
          </button>

          <button
            disabled={
              nameCountError || descriptionCountError || !edit.id ? true : false
            }
            type="submit"
            onClick={(e) => handleEditSubmit(e, index)}
            className={`${
              nameCountError || descriptionCountError || !edit.id
                ? "bg-blue-700 cursor-not-allowed text-blue-400"
                : "hover:bg-blue-800 text-white"
            } transition text-xl font-bold bg-blue-400  p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
          >
            Update
          </button>
        </div>
      </form>

      {emptyInputError && (
        <div className=" max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[10px] flex items-center gap-2 border-red-600 absolute bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className=" text-2xl max-sm:text-xl text-red-500" />{" "}
          <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
            Please enter a task name
          </h2>
        </div>
      )}

      {maxSelectedError && (
        <div className=" max-sm:w-[320px] px-3 py-2 max-sm:px-2 max-sm:py-1 rounded-md bg-white border-l-[10px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className=" text-3xl max-sm:text-2xl text-red-500" />{" "}
          <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
            You cannot add more than 3 catagories
          </h2>
        </div>
      )}
    </div>
  );
};

export default EditTodoContent;
