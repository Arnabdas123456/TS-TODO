import { createContext, useContext, useState, type ReactNode } from "react";

// Props type for the provider component to accept children
export type TodosProviderProps = {
    children: ReactNode;
}

// Define the shape of a single Todo item
export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

// Define the structure of the context
export type TodosContext = {
    todos: Todo[];                              // Array of todos
    handleAddTodo: (task: string) => void;      // Function to add a todo
    toggleTodo: (id: string) => void;           // Function to toggle completed state
    handleDeleteTod: (id: string) => void;      // Function to delete a todo (note: typo in name)
}

// Create the context with default value null
export const todosContext = createContext<TodosContext | null>(null);

// Provider component that wraps children components with the context
export const TodosProvider = ({ children }: TodosProviderProps) => {

    // Initialize state with todos from localStorage
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    });

    // Function to add a new todo
    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),     // Generate a random ID
                    task: task,                       // Task text
                    completed: false,                 // Initially not completed
                    createdAt: new Date()             // Current time
                },
                ...prev                              // Add to beginning of previous todos
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos)); // Save to localStorage
            return newTodos;
        })
    }

    // Function to toggle the completed status of a todo
    const toggleTodo = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed } // Toggle completed
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos)); // Save updated todos
            return newTodos;
        })
    }

    // Function to delete a todo by its ID
    const handleDeleteTod = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id); // Filter out by ID
            localStorage.setItem("todos", JSON.stringify(newTodos)); // Save to localStorage
            return newTodos;
        })
    }

    // Provide state and handlers to the component tree
    return <todosContext.Provider value={{ todos, handleAddTodo, toggleTodo, handleDeleteTod }}>
        {children}
    </todosContext.Provider>
}

// Custom hook to use the todos context
export const useTodos = () => {
    const todosConsumer = useContext(todosContext); // Access context
    if (!todosConsumer) {
        throw new Error("use Todos used outside the provider"); // Ensure it's used inside provider
    }
    return todosConsumer;
}
