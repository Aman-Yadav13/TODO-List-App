import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "./theme";
import "./App.css";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
const App = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens("light");

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  let handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  };

  let deleteTodo = (id) => {
    const updatesTodo = [...todos].filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatesTodo);
  };

  let toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  let editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  };

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ backgroundColor: "#141b2d" }}>
            <main className="content" style={{ backgroundColor: "#1F2A40" }}>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  textAlign: "center",
                  marginTop: "30px",
                  color: `${colors.primary[400]}`,
                }}
              >
                To Do List
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="auto"
              >
                <Box padding="40px" mt="50px">
                  <Box display="flex" justifyContent="space-between">
                    <TextField
                      id="standard-textarea"
                      placeholder="Enter Task"
                      required
                      label="Task"
                      sx={{
                        input: { color: `${colors.greenAccent[500]}` },
                        label: { color: `${colors.primary[400]}` },
                      }}
                      variant="standard"
                      value={todo}
                      onChange={(e) => {
                        setTodo(e.target.value);
                      }}
                    />
                    <Button
                      onClick={handleSubmit}
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ padding: "10px" }}
                    >
                      Add
                    </Button>
                  </Box>

                  <Box
                    m="30px 0 20px 0"
                    sx={{
                      border: "1px dashed black",
                      borderRadius: "3px",
                      backgroundColor: `${colors.blueAccent[400]}`,
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="h3"
                      sx={{ color: colors.greenAccent[700] }}
                    >
                      Tasks
                    </Typography>
                  </Box>
                  {todos.map((todo) => {
                    return (
                      <Box
                        mt="12px"
                        key={todo.id}
                        display="flex"
                        alignItems="center"
                      >
                        <Checkbox
                          defaultChecked
                          sx={{
                            margin: "0 -5px",
                            color: `${colors.primary[400]}`,
                          }}
                          onChange={() => toggleComplete(todo.id)}
                          checked={todo.completed}
                        />
                        <Box display="flex" alignItems="center">
                          {todoEditing === todo.id ? (
                            <TextField
                              id="standard-multiline-flexible"
                              label="Edit"
                              variant="standard"
                              onChange={(e) => setEditingText(e.target.value)}
                              sx={{
                                input: { color: `${colors.greenAccent[500]}` },
                                label: { color: `${colors.primary[400]}` },
                              }}
                              value={editingText}
                            />
                          ) : (
                            <Typography
                              sx={{
                                overflow: "auto",
                                margin: "0 50px 0 0",
                                color: `${colors.greenAccent[500]}`,
                              }}
                              variant="h6"
                            >
                              {todo.text}
                            </Typography>
                          )}
                          <Box display="flex">
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              sx={{ margin: "0 5px 0 0" }}
                              color="error"
                              onClick={() => deleteTodo(todo.id)}
                            >
                              Delete
                            </Button>
                            {todoEditing === todo.id ? (
                              <Button
                                onClick={() => editTodo(todo.id)}
                                size="small"
                                variant="outlined"
                                startIcon={<EditIcon color="secondary" />}
                                sx={{ padding: "10px" }}
                              >
                                Update
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setTodoEditing(todo.id)}
                                size="small"
                                variant="outlined"
                                startIcon={<EditIcon color="secondary" />}
                                sx={{ padding: "10px" }}
                              >
                                Edit
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
