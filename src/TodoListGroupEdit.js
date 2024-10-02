import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useApi } from "./api";

function TodoListGroupEdit() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const todoGroupsApi = useApi("todoListGroups");

  useEffect(() => {
    const group = todoGroupsApi.getById(id);
    if (group) setName(group.name);
  }, [id, todoGroupsApi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    todoGroupsApi.update(id, { name });
    navigate("/todogroups");
  };

  return (
    <div>
      <h2>Edit Todo List Group</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Update Group
        </Button>
      </form>
    </div>
  );
}

export default TodoListGroupEdit;
