const inputValue = document.getElementById("inputValue");
const addButton = document.getElementById("btn");
const Lists = document.querySelector(".todoList");

function saveTasksToLocalStorage() {
  const tasks = [...document.querySelectorAll("article")].map((article) => ({
    text: article.querySelector("#tasks-label").textContent,
    completed: article.querySelector("#tasks").checked,
  }));
  // console.log(tasks);
  // console.log(JSON.stringify(tasks));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText, isCompleted = false) {
  let addArticle = document.createElement("article");
  addArticle.innerHTML = `
    <input type="checkbox" id="tasks" ${isCompleted ? "checked" : ""}>
    <label for="task" id="tasks-label" style="${isCompleted ? "text-decoration: line-through;" : ""}">${taskText}</label>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    `;
  Lists.append(addArticle);
  inputValue.value = "";

  const checkbox = addArticle.querySelector("#tasks");
  const deleteBtn = addArticle.querySelector(".delete-btn");
  const editBtn = addArticle.querySelector(".edit-btn");
  const label = addArticle.querySelector("#tasks-label");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
    } else {
      label.style.textDecoration = "none";
    }
    saveTasksToLocalStorage();
  });

  deleteBtn.addEventListener("click", () => {
    Lists.removeChild(addArticle);
    saveTasksToLocalStorage();
  });

  editBtn.addEventListener("click", () => {
    inputValue.value = label.innerHTML;
    Lists.removeChild(addArticle);
    saveTasksToLocalStorage();

    localStorage.setItem("editingTask", label.innerHTML);
  });
}

addButton.addEventListener("click", () => {
  let listItem = inputValue.value;

  if (listItem.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  createTaskElement(listItem);
  saveTasksToLocalStorage();
  localStorage.removeItem("editingTask");
  inputValue.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
  const storedData = JSON.parse(localStorage.getItem("tasks")) || [];
  storedData.forEach((tasks) => createTaskElement(tasks.text, tasks.completed));

  const editingTask = localStorage.getItem("editingTask");
  if (editingTask) {
    inputValue.value = editingTask;
  }
});
