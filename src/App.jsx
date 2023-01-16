import Form from "./views/Form";
import TaskList from "./views/TaskList";
import { useTodoContext } from "./context/ContextProvider";
import EditForm from "./views/EditForm";
import ThemeSwitcher from "./views/ThemeSwitcher";

function App() {
  const { isEditing } = useTodoContext();

  return (
    <div className="container">
      <header>
        <h1>My Task Lists</h1>
      </header>
      {isEditing && <EditForm />}
      <Form />
      <TaskList />
      <ThemeSwitcher />
    </div>
  );
}

export default App;
