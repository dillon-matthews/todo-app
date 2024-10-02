import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import TodoListGroupList from "./TodoListGroupList";
import TodoListGroupAdd from "./TodoListGroupAdd";
import TodoListGroupEdit from "./TodoListGroupEdit";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import TodoEdit from "./TodoEdit";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todogroups">Todo Groups</Link>
            </li>
            <li>
              <Link to="/todogroups/add">Add Todo Group</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todogroups" element={<TodoListGroupList />} />
          <Route path="/todogroups/add" element={<TodoListGroupAdd />} />
          <Route path="/todogroups/edit/:id" element={<TodoListGroupEdit />} />
          <Route path="/todos/:groupId" element={<TodoList />} />
          <Route path="/todos/add/:groupId" element={<TodoAdd />} />
          <Route path="/todos/edit/:id" element={<TodoEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
