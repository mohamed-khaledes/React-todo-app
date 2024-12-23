// 1-form render correctly
// 2-when the user type in input the value should change
// 3-check if the error message is displayed when the input is empty
// 4-check if the item added to the list if the user clicked on the button
// 5-check if the input is cleared after adding the item

import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddTodo from "../pages/AddTodo";
import { DataProvider } from "../context/DataContext";
import userEvent from "@testing-library/user-event";
import FormInputs from "../components/Utils/FormInput/FormInputs";
import FormInputHook from "../components/Utils/FormInput/hook";
import { act } from "react-dom/test-utils";

export const TestProvider = ({ Children }) => {
  return (
    <MemoryRouter initialEntries={["/addTodo"]}>
      <DataProvider>{Children}</DataProvider>
    </MemoryRouter>
  );
};

test("1-form render correctly", () => {
  render(
    <MemoryRouter initialEntries={["/addTodo"]}>
      <DataProvider>
        <AddTodo />
      </DataProvider>
    </MemoryRouter>
  );

  const taskName = screen.getByTestId("task-name");
  const taskDescription = screen.getByTestId("task-description");
  const taskCategory = screen.getByTestId("category");
  const addTaskButton = screen.getByTestId("add-task-button");

  expect(taskName).toBeInTheDocument();
  expect(taskDescription).toBeInTheDocument();
  expect(taskCategory).toBeInTheDocument();
  expect(addTaskButton).toBeInTheDocument();
});

test("2-input value should change when the user type", async () => {
  render(
    <MemoryRouter initialEntries={["/addTodo"]}>
      <DataProvider>
        <AddTodo />
      </DataProvider>
    </MemoryRouter>
  );

  const taskName = screen.getByTestId("task-name");
  const taskDescription = screen.getByTestId("task-description");
  const taskCategory = screen.getByTestId("category");
  const addTaskButton = screen.getByTestId("add-task-button");

  await userEvent.type(taskName, "task 1");
  //  await waitFor(() => expect(taskName).toHaveValue("task 1"))
  expect(taskName).toHaveValue("task 1");
});

test("3-display an error when the input is empty", async () => {
  render(
    <MemoryRouter initialEntries={["/addTodo"]}>
      <DataProvider>
        <FormInputs />
      </DataProvider>
    </MemoryRouter>
  );

  const addTaskButton = screen.getByTestId("add-task-button");

  await userEvent.click(addTaskButton);
  const errorMessage = screen.getByTestId("error-message");
  expect(errorMessage).toBeInTheDocument();
});

test('4-add the task when I click the button & test the form input hook', async () => {
  // Mock the handleSubmit function from the hook
  const handleSubmitMock = jest.fn();

  // Render your component
  render(
    <MemoryRouter initialEntries={["/addTodo"]}>
      <DataProvider>
        <AddTodo />
      </DataProvider>
    </MemoryRouter>
  );

  const taskName = screen.getByTestId("task-name");
  const addTaskButton = screen.getByTestId("add-task-button");

  // Interact with the form
  await userEvent.type(taskName, 'mohamed khaled');
  await userEvent.click(addTaskButton);

  // Now, render the hook and ensure handleSubmit is called
  const { result } = renderHook(() => FormInputHook(), {
    wrapper: ({ children }) => <MemoryRouter initialEntries={['/addTodo']}>{children}</MemoryRouter>,
  });

  // Now you need to simulate the event object being passed to the handleSubmit function
  const mockEvent = { preventDefault: jest.fn() };

  // You should trigger handleSubmit with this mock event
  result.current.handleSubmit(mockEvent);

  // Expect that the preventDefault was called
  expect(mockEvent.preventDefault).toHaveBeenCalled();

  act(()=> 
    result.current.handleSubmit(mockEvent)
  )

  expect(result.current.handleSubmit(mockEvent)).toHaveBeenCalled();
});
