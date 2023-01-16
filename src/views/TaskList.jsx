import { useTodoContext } from "../context/ContextProvider";
import TaskItem from "../components/TaskItem";
import styles from "./tasklist.module.css";

const TaskList = () => {
  const { tasks } = useTodoContext();

  return (
    <ul className={styles.tasks}>
      {tasks
        .filter((task) => !task.checked)
        .map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}

      {tasks
        .filter((task) => task.checked)
        .map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </ul>
  );
};

export default TaskList;
