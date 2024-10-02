import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useApi } from "./api";

function Home() {
  const [groups, setGroups] = useState([]);
  const todoGroupsApi = useApi("todoListGroups");
  const todosApi = useApi("todos");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedGroups = todoGroupsApi.getAll();
      const groupsWithTodos = fetchedGroups.map((group) => ({
        ...group,
        todos: todosApi.getAll().filter((todo) => todo.groupId === group.id),
      }));
      setGroups(groupsWithTodos);
    };
    fetchData();
  }, [todoGroupsApi, todosApi]);

  const handleTodoToggle = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    todosApi.update(todo.id, updatedTodo);
    setGroups(
      groups.map((group) => ({
        ...group,
        todos: group.todos.map((t) => (t.id === todo.id ? updatedTodo : t)),
      }))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List Groups</h1>
      {groups.map((group) => (
        <Accordion key={group.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{group.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {group.todos.map((todo) => (
                <li key={todo.id} className="flex items-center">
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleTodoToggle(todo)}
                  />
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to={`/todos/${group.id}`}
              className="text-blue-500 hover:underline"
            >
              Manage Todos
            </Link>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default Home;
