const express = require("express");
const cor = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cor());

let tasks = [];

app.get("/getTasks", (req, res) => {
  res.status(200).send(tasks);
});

app.post("/addTask", (req, res) => {
  const text = req.body.text;
  const id = Date.now();
  const task = {
    id: id,
    text: text,
  };
  tasks.push(task);
  res.status(200).send(tasks);
});

app.delete("/deleteTask/:id", (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((task) => task.id != id);
  res.status(200).send(tasks);
});

app.patch("/updateTask/:id", (req, res) => {
  const id = req.params.id;
  const text = req.body.text;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].text = text;
      res.status(200).send("tasks updated");
      break;
    }
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});