import React from "react";
import { BiTask } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import TasksOptionsHook from "./hook";

const TasksOptions = ({
  data,
  setData,
  val,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setOpenOptions,
  index,
}) => {
  const { handleCheck, setIndex, handleCopy, handleDelete } = TasksOptionsHook(
    data,
    setData,
    setDeleteNotificationTitle,
    setDeleteNotification,
    setOpenOptions
  );

  return (
    <div
      data-testid="task-options"
      className="absolute z-10 w-[215px] shadow bg-white top-8 left-0 max-xl:-left-48 p-3 rounded-2xl"
    >
      <ul className=" flex flex-col text-black">
        <li
          onClick={() => handleCheck(val?.id)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 max-sm:py-2 px-2 rounded-md"
        >
          <FaCheck className=" text-2xl max-sm:text-xl text-slate-700" />
          {val?.check ? "Mark as not done" : "Mark as done"}
        </li>
        <li
          onClick={() => {
            setIndex(index);
            setEdit({
              id: val?.id,
              title: val?.title,
              description: val?.description,
              check: val?.check,
              currentTime: val?.currentTime,
              catagory: val?.catagory,
            });
          }}
        >
          <Link
            to={"/edit"}
            className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3  px-2 rounded-md"
          >
            <RiEdit2Fill className=" text-2xl max-sm:text-xl text-slate-700" />
            Edit
          </Link>
        </li>
        <li
          onClick={() => handleCopy(val)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <MdContentCopy className=" text-2xl max-sm:text-xl text-slate-700" />
          Copy
        </li>
        <li
          data-testid="delete-btn"
          onClick={() => handleDelete(val)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
        >
          <MdDelete className=" text-2xl max-sm:text-xl text-slate-700" />
          Delete
        </li>
        <li>
          <Link
            to={`/todo/${val?.id}`}
            className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
          >
            <BiTask className=" text-2xl max-sm:text-xl text-slate-700" />
            Task details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TasksOptions;
