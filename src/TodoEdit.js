import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useApi } from "./api";

function TodoEdit() {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const todosApi = useApi("todos");

  useEffect(() => {
    const todo = todosApi.getById(id);
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [id, todosApi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = todosApi.update(id, { title, completed });
    navigate(`/todos/${updatedTodo.groupId}`);
  };

  return (
    <div>
      <h2>Edit Todo</h2>
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
          Update Todo
        </Button>
      </form>
    </div>
  );
}

export default TodoEdit;
