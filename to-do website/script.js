const todoForm = document.getElementById("todo-form"),
  titleInput = document.getElementById("title"),
  descriptionInput = document.getElementById("description"),
  pendingList = document.querySelector(".pending-list ol"),
  completedList = document.querySelector(".completed-list ol");

let pendingTodos = [];
let completedTodos = [];

function renderPendingList() {
  pendingList.innerHTML = "";
  let e = 1;
  pendingTodos.forEach((t) => {
    let o = document.createElement("li");
    (o.innerHTML = `
      <div>
        <h3>${e}. ${t.title}</h3>
        <p>${t.description}</p>
        <p>Added on: ${t.addedDate}</p>
      </div>
      <div>
        <button onclick="editTodoItem('pending', ${e - 1})">Edit</button>
        <button onclick="deleteTodoItem('pending', ${e - 1})">Delete</button>
        <button onclick="completeTodoItem(${e - 1})">Completed</button>
      </div>
    `),
      pendingList.appendChild(o),
      e++;
  });
  
  pendingList.style.height = `${pendingList.scrollHeight}px`;
}

function renderCompletedList() {
  completedList.innerHTML = "";
  let e = 1;
  completedTodos.forEach((t) => {
    let o = document.createElement("li");
    (o.innerHTML = `
      <div>
        <h3>${e}. ${t.title}</h3>
        <p>${t.description}</p>
        <p>Added on: ${t.addedDate}</p>
        <p>Completed on: ${t.completedDate}</p>
      </div>
      <div>
        <button onclick="editTodoItem('completed', ${e - 1})">Edit</button>
        <button onclick="deleteTodoItem('completed', ${e - 1})">Delete</button>
        <button onclick="revertTodoItem(${e - 1})">Pending</button>
      </div>
    `),
      completedList.appendChild(o),
      e++;
  });
  
  completedList.style.height = `${completedList.scrollHeight}px`;
}

function addTodoItem(event) {
  event.preventDefault();
  let title = titleInput.value;
  let description = descriptionInput.value;
  let addedDate = new Date().toLocaleString();
  let isCompleted = false;

  pendingTodos.push({ title, description, addedDate, isCompleted });
  titleInput.value = "";
  descriptionInput.value = "";

  renderPendingList();
}

function editTodoItem(section, index) {
  let todo =
    section === "pending" ? pendingTodos[index] : completedTodos[index];
  let newTitle = prompt("Enter a new title", todo.title);
  let newDescription = prompt("Enter a new description", todo.description);

  if (newTitle && newDescription) {
    todo.title = newTitle;
    todo.description = newDescription;
    if (section === "pending") {
      renderPendingList();
    } else {
      renderCompletedList();
    }
  }
}

function deleteTodoItem(section, index) {
  if (section === "pending") {
    pendingTodos.splice(index, 1);
    renderPendingList();
  } else {
    completedTodos.splice(index, 1);
    renderCompletedList();
  }
}

function completeTodoItem(index) {
  let todo = pendingTodos[index];
  todo.isCompleted = true;
  todo.completedDate = new Date().toLocaleString();
  todo.addedDate = todo.addedDate || ""; 
  completedTodos.push(todo);
  pendingTodos.splice(index, 1);
  renderPendingList();
  renderCompletedList();
}

function revertTodoItem(index) {
  let todo = completedTodos[index];
  todo.isCompleted = false;
  todo.completedDate = undefined;
  pendingTodos.push(todo);
  completedTodos.splice(index, 1);
  renderPendingList();
  renderCompletedList();
}

todoForm.addEventListener("submit", addTodoItem);