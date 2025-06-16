import { useTodos } from "../store/todos";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
    // Access todos and handler functions from the custom context hook
    const { todos, toggleTodo, handleDeleteTod } = useTodos();

    // Get search params from URL (e.g., ?todos=active or ?todos=completed)
    const [serachParams] = useSearchParams();
    let todosData = serachParams.get("todos");

    // Start with all todos
    let filterData = todos;

    // If the filter is "active", keep only todos that are not completed
    if (todosData === "active") {
        filterData = filterData.filter((task) => !task.completed);
    }

    // If the filter is "completed", keep only todos that are completed
    if (todosData === "completed") {
        filterData = filterData.filter((task) => task.completed);
    }

    return (
        <ul className="main-task">
            {
                // Render filtered todos as list items
                filterData.map((todo) => {
                    return (
                        <li key={todo.id}>
                            {/* Checkbox to toggle todo completed state */}
                            <input
                                type="checkbox"
                                id={`todo-${todo.id}`}
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            {/* Label showing the todo task */}
                            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

                            {/* Show delete button only if todo is completed */}
                            {todo.completed && (
                                <button
                                    type="button"
                                    onClick={() => handleDeleteTod(todo.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </li>
                    );
                })
            }
        </ul>
    );
}
export default Todos;
