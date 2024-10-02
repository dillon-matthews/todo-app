import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useApi } from "./api";

function TodoListGroupAdd() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const todoGroupsApi = useApi("todoListGroups");

  const handleSubmit = (e) => {
    e.preventDefault();
    todoGroupsApi.create({ name });
    navigate("/todogroups");
  };

  return (
    <div>
      <h2>Add Todo List Group</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Group
        </Button>
      </form>
    </div>
  );
}

export default TodoListGroupAdd;
