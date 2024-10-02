import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useApi } from "./api";

function TodoListGroupList() {
  const [groups, setGroups] = useState([]);
  const todoGroupsApi = useApi("todoListGroups");

  const fetchGroups = useCallback(() => {
    const fetchedGroups = todoGroupsApi.getAll();
    setGroups(fetchedGroups);
  }, [todoGroupsApi]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleDelete = (id) => {
    todoGroupsApi.delete(id);
    fetchGroups();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Link to={`/todogroups/edit/${params.row.id}`}>
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
      <h2>Todo List Groups</h2>
      <Link to="/todogroups/add">
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          Add New Group
        </Button>
      </Link>
      <DataGrid
        rows={groups}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default TodoListGroupList;
