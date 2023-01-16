import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TodoContext = createContext({
  tasks: [],
  editingTask: {},
  isEditing: null,
  focus: null,
  editTask: () => {},
  setIsEditing: () => {},
  addTask: () => {},
  toggleChecked: () => {},
  deleteTask: () => {},
  updateTask: () => {},
});

export const ContextProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("react-todo.tasks", []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState({});
  const [focus, setFocus] = useState();

  const addTask = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  const toggleChecked = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, name: task } : t))
    );
  };

  const editTask = (task) => {
    setIsEditing(true);
    setEditingTask(task);
    setFocus(document.activeElement);
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        addTask,
        focus,
        toggleChecked,
        deleteTask,
        updateTask,
        editTask,
        editingTask,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
