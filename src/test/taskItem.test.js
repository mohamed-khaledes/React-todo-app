import { render, renderHook, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DataProvider } from "../context/DataContext";
import Todo from "../components/Utils/Todo";
// import TasksOptions from "../components/Utils/TasksOptions/TasksOptions";
// import userEvent from "@testing-library/user-event";
// import TasksOptionsHook from "../components/Utils/TasksOptions/hook";
// import { act } from "react-dom/test-utils";

test("1-task item components", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <DataProvider>
        <Todo />
      </DataProvider>
    </MemoryRouter>
  );

  const todo = screen.getByTestId("todo");
  const todoTitle = screen.getByTestId("todo-title");
  const todoCurrentTime = screen.getByTestId("todo-current-time");
  expect(todo).toBeInTheDocument()
  expect(todoTitle).toBeInTheDocument()
  expect(todoCurrentTime).toBeInTheDocument()

});

// test("2-test the delete button", async () => {
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <DataProvider>
//         <TasksOptions />
//       </DataProvider>
//     </MemoryRouter>

//   );
//   // mock functions 
//   const setData = React.useState = jest.fn().mockReturnValue([[], {}])

//   const setDeleteNotificationTitle = jest.fn()
//   const setDeleteNotification = jest.fn()
//   const setOpenOptions = jest.fn()

//   const data = [
//     {
//       id: "d31f16c4-876c-4958-906e-e291d7bab8f4",
//       title: "test",
//       description: "test",
//       currentTime: "16/12/2024 ,01:26 PM",
//       check: false,
//       catagory: [
//         {
//           id: 1,
//           catagory: "Home",
//           emoji: "🏠",
//         },
//       ],
//     },
//   ]
  
//   const { result ,waitForNextUpdate } = await renderHook(() => TasksOptionsHook(data,setData,setDeleteNotificationTitle,setDeleteNotification,setOpenOptions),{
//     wrapper: ({ children }) => 
//     <DataProvider>
//      {children}
//     </DataProvider>
//   });
  
//   await waitForNextUpdate()
//   const taskOptions = screen.getByTestId("task-options");
//   const deleteBtn = screen.getByTestId("delete-btn");
//   expect(taskOptions).toBeInTheDocument()
//   expect(deleteBtn).toBeInTheDocument()
  
//   await userEvent.click(deleteBtn)

//   act(()=>{
//     result.current.handleDelete()
//   })

//   // expect(handleDeleteMock).toHaveBeenCalled()
// });
