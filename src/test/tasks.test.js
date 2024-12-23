import { render, renderHook, screen } from "@testing-library/react";
import DisplayTodos from "../components/Utils/DisplayTodo/DisplayTodos";
import { MemoryRouter } from "react-router-dom";
import { DataProvider } from "../context/DataContext";
import DisplayTodoHook from "../components/Utils/DisplayTodo/hook";

test("render 0 items when the array is empty", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <DataProvider>
        <DisplayTodos />
      </DataProvider>
    </MemoryRouter>
  );

  const { result } = await renderHook(() => DisplayTodoHook());
  expect(result.current.search).toBe("");
  const tasks = screen.queryAllByTestId("task");
  expect(tasks).toHaveLength(0);
});

test("render 1 items when the array is empty", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <DataProvider>
        <DisplayTodos
          data={[
            {
              id: "d31f16c4-876c-4958-906e-e291d7bab8f4",
              title: "test",
              description: "test",
              currentTime: "16/12/2024 ,01:26 PM",
              check: false,
              catagory: [
                {
                  id: 1,
                  catagory: "Home",
                  emoji: "🏠",
                },
              ],
            },
          ]}
        />
      </DataProvider>
    </MemoryRouter>
  );

  const { result } = await renderHook(() => DisplayTodoHook());
  expect(result.current.search).toBe("");
  const tasks = screen.queryAllByTestId("task");
  expect(tasks).toHaveLength(1);
  const noTasksMessage = screen.queryByTestId("no-tasks-message");
  expect(noTasksMessage).not.toBeInTheDocument();
});

test("if there is no tasks show don't have tasks", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <DataProvider>
        <DisplayTodos />
      </DataProvider>
    </MemoryRouter>
  );
  const tasks = screen.queryAllByTestId("task");
  expect(tasks).toHaveLength(0);
  const noTasksMessage = screen.getByTestId("no-tasks-message");
  expect(noTasksMessage).toBeInTheDocument();
});
