import { IoIosCloseCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import CategoryBtn from "../CategoryBtn/CategoryBtn";
import { category } from "../../../constants/Data";
import FormInputHook from "./hook";

const FormInputs = ({
  data,
  setData,
  setAddNotification,
  setAddNotificationTitle,
}) => {
  const {
    emptyInputError,
    nameCountError,
    descriptionCountError,
    CategoryOpen,
    maxSelectedError,
    handleDescription,
    handleKeyDown,
    handleName,
    handleSubmit,
    handleSelected,
    taskName,
    taskDescription,
    categoryRef,
    setCategoryOpen,
    selectedCategory,
  } = FormInputHook(data, setData, setAddNotification, setAddNotificationTitle);

  return (
    <div className=" py-10">
      <form onSubmit={handleSubmit} className="max-w-[600px] m-auto">
        <div>
          <label
            className={`text-sm max-sm:text-xs ${
              nameCountError ? "text-red-500" : "text-purple-200"
            } text-purple-200`}
            htmlFor="taskName"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleName}
            onKeyDown={handleKeyDown}
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
              descriptionCountError ? "text-red-500" : "text-purple-200"
            } text-purple-200`}
            htmlFor="taskDescription"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={handleDescription}
            className={`resize-none ${
              descriptionCountError ? "border-red-500 border-2" : "border-none"
            }  w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none`}
          ></textarea>
          <p className="text-red-500 text-base max-sm:text-xs">
            {descriptionCountError}
          </p>
        </div>

        <div ref={categoryRef} className=" mt-7 max-sm:mt-4">
          <label className="text-sm max-sm:text-xs text-purple-200">
            Category
          </label>

          <div
            onClick={() => setCategoryOpen(!CategoryOpen)}
            className=" bg-white flex gap-7 cursor-pointer justify-between min-h-14 max-sm:min-h-12 px-3 py-3 max-sm:px-2 max-sm:py-2 items-center max-sm:text-xs rounded-xl w-full mt-1"
          >
            <div className=" flex gap-2 flex-wrap items-center">
              {selectedCategory.map((val, index) => (
                <div
                  key={index}
                  className=" bg-purple-500 text-white text-sm max-sm:text-xs flex items-center gap-1 px-3 py-2 max-sm:py-2 font-medium rounded-lg"
                >
                  <span className=" text-xl max-sm:text-sm">{val.emoji}</span>{" "}
                  {val.catagory}
                </div>
              ))}
            </div>

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
              <ul className=" p-2 bg-purple-400 flex flex-col gap-2 max-sm:gap-1 rounded-xl">
                <li className=" my-2 px-3 text-white max-sm:text-sm">
                  Select max (3 Categories)
                </li>
                {category.map((val, index) => (
                  <CategoryBtn
                    key={index}
                    val={val}
                    selectedCategory={selectedCategory}
                    handleSelected={handleSelected}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="text-center mt-4">
          <button
            disabled={nameCountError || descriptionCountError ? true : false}
            type="submit"
            className={`${
              nameCountError || descriptionCountError
                ? "bg-purple-700 cursor-not-allowed text-purple-400"
                : "hover:bg-purple-800 text-white "
            } transition text-xl font-bold bg-purple-400 p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full`}
          >
            Create Task
          </button>
        </div>
      </form>

      {emptyInputError && (
        <div className=" max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className=" text-2xl max-sm:text-xl text-red-500" />{" "}
          <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
            Please enter a task name
          </h2>
        </div>
      )}

      {maxSelectedError && (
        <div className=" max-sm:w-[320px] px-3 py-2 max-sm:px-2 max-sm:py-1 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className=" text-3xl max-sm:text-2xl text-red-500" />{" "}
          <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
            You cannot add more than 3 catagories
          </h2>
        </div>
      )}
    </div>
  );
};
export default FormInputs;
