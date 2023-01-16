import { CheckIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useTodoContext } from "../context/ContextProvider";

const EditForm = () => {
  const { setIsEditing, editingTask, updateTask, focus } = useTodoContext();
  const [task, setTask] = useState(editingTask);

  useEffect(() => {
    const closeModel = (e) => {
      e.key === "Escape" && setIsEditing(false);
    };

    window.addEventListener("keydown", closeModel);
    return () => {
      window.removeEventListener("keydown", closeModel);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, task.name);
    setTask("");
    setIsEditing(false);
    focus.focus();
  };

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => {
        e.target === e.currentTarget && setIsEditing(false);
      }}
    >
      <form className="todo" onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={task.name}
            onInput={(e) =>
              setTask((prevTask) => ({ ...prevTask, name: e.target.value }))
            }
            required
            autoFocus
            maxLength={60}
            placeholder="Update Task"
          />
          <label htmlFor="editTask" className="label">
            Update Task
          </label>
        </div>
        <button className="btn" aria-label="Edit Task" type="submit">
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  );
};

export default EditForm;
