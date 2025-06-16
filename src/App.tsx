import { AddTodo } from "./component/addtodo";
import "./App.css";
import Todos from "./component/todos";
import { Navbar } from "./component/navbar";

const App = () => {
  document.title = "TODO application"
  return (
    <main>
      <h1>TODO REACT USING TS</h1>
      <Navbar />
      <AddTodo />
      <Todos />
    </main>
  );
};
export default App;