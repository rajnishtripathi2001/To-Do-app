var taskinput = document.getElementById("task-input");
var taskList = document.getElementById("task-list");

function addTask() {
  const tasktext = taskinput.value;
  if (tasktext !== "") {
    const task = {
      id: Date.now(),
      text: tasktext,
    };
    axios
      .post("http://localhost:5000/addTask", task)
      .then((res) => {
        taskinput.value = "";
        renderTask();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function renderTask() {
  axios.get("http://localhost:5000/getTasks").then((res) => {
    // console.log(res.data);
    var tasks = res.data;
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <span>
          ${task.text}
      </span>
      <button onclick="deleteTask(${task.id})">Delete</button>
      <button onclick="updateTask(${task.id})">Update Task</button>
      `;
      taskList.appendChild(listItem);
    });
  });
}

function deleteTask(id) {
  axios.delete(`http://localhost:5000/deleteTask/${id}`).then((res) => {
    renderTask();
  });
}

function updateTask(id) {
  let text = prompt("Enter new task");
  const task = {
    text,
  };
  axios.patch(`http://localhost:5000/updateTask/${id}`, task)
  .then((res) => {
    console.log(res)
    renderTask();
  })
  .catch((err) => {
    console.log(err);
  });
}