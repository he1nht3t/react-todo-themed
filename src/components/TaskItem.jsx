import styles from "./taskitem.module.css";

import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useTodoContext } from "../context/ContextProvider";

const TaskItem = ({ task }) => {
  const { toggleChecked, deleteTask, editTask } = useTodoContext();

  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
        <input
          className={styles.checkbox}
          type="checkbox"
          onChange={() => toggleChecked(task.id)}
          checked={task.checked}
          name={task.name}
          id={task.id}
        />
        <label htmlFor={task.id} className={styles.label}>
          {task.name}
          <p className={styles.checkmark}>
            <CheckIcon strokeWidth={2} width={24} />
          </p>
        </label>
      </div>
      <div className={styles["task-group"]}>
        <button className="btn" onClick={() => editTask(task)}>
          <PencilSquareIcon width={24} height={24} />
        </button>
        <button
          className={`btn ${styles.delete}`}
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
