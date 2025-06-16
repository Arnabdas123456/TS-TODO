import { Link, useSearchParams } from "react-router-dom"

export const Navbar = () => {

    // Get search params from the URL (?todos=...)
    const [serachParams] = useSearchParams()

    // Get the value of the "todos" query parameter from URL
    let todosData = serachParams.get("todos");

    return (
        <nav>
            {/* Link to show all todos - active if no "todos" param is present */}
            <Link to="/"
                className={todosData === null ? "active" : ""}>
                All
            </Link>

            {/* Link to filter and show only active todos - active if todos=active */}
            <Link to="/?todos=active"
                className={todosData === "active" ? "active" : ""}>
                Active
            </Link>

            {/* Link to filter and show only completed todos - active if todos=completed */}
            <Link to="/?todos=completed"
                className={todosData === "completed" ? "active" : ""}>
                Completd
            </Link>
        </nav>
    )
}
