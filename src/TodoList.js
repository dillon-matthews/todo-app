import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Checkbox } from "@mui/material";
import { useApi } from "./api";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const { groupId } = useParams();
  const todosApi = useApi("todos");

  const fetchTodos = useCallback(() => {
    const allTodos = todosApi.getAll();
    const groupTodos = allTodos.filter((todo) => todo.groupId === groupId);
    setTodos(groupTodos);
  }, [todosApi, groupId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleDelete = (id) => {
    todosApi.delete(id);
    fetchTodos();
  };

  const handleToggleComplete = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    todosApi.update(todo.id, updatedTodo);
    fetchTodos();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "completed",
      headerName: "Completed",
      width: 120,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => handleToggleComplete(params.row)}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Link to={`/todos/edit/${params.row.id}`}>
            <Button variant="outlined" size="small" style={{ marginRight: 8 }}>
              Edit
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Todos</h2>
      <Link to={`/todos/add/${groupId}`}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          Add New Todo
        </Button>
      </Link>
      <DataGrid
        rows={todos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default TodoList;
