import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useApi } from "./api";

function TodoAdd() {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const { groupId } = useParams();
  const navigate = useNavigate();
  const todosApi = useApi("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    todosApi.create({ title, completed, groupId });
    navigate(`/todos/${groupId}`);
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Completed"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
    </div>
  );
}

export default TodoAdd;
