const todoInput = document.getElementById("todo-input")
const todoButtonAdd = document.getElementById("todo-button-add")
const todoList = document.getElementById("todo-list")

window.addEventListener("DOMContentLoaded", fetchTodosFromLocalStorage)
todoButtonAdd.addEventListener("click", addTodo)
todoList.addEventListener("click", completeOrDeleteTodo)

function addTodo(event) {
  event.preventDefault()

  saveTodosToLocalStorage(todoInput.value)

  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  const newTodo = document.createElement("li")
  newTodo.innerText = todoInput.value
  newTodo.classList.add("todo-item")
  todoDiv.appendChild(newTodo)

  const todoButtonComplete = document.createElement("button")
  todoButtonComplete.innerHTML = '<i class="fas fa-check-square"></i>'
  todoButtonComplete.classList.add("todo-button-complete")
  todoDiv.appendChild(todoButtonComplete)

  const todoButtonDelete = document.createElement("button")
  todoButtonDelete.innerHTML = '<i class="fas fa-minus-square"></i>'
  todoButtonDelete.classList.add("todo-button-delete")
  todoDiv.appendChild(todoButtonDelete)

  todoList.appendChild(todoDiv)
  todoInput.value = ""
}

function completeOrDeleteTodo(event) {
  const item = event.target

  if (item.classList[0] === "todo-button-delete") {
    const todo = item.parentElement
    todo.classList.add("fall")
    removeTodosFromLocalStorage(todo)
    todo.addEventListener("transitionend", () => {
      todo.remove()
    })
  }

  if (item.classList[0] === "todo-button-complete") {
    const todo = item.parentElement
    todo.classList.toggle("complete")
  }
}

function saveTodosToLocalStorage(todo) {
  let todos

  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos))
}

function fetchTodosFromLocalStorage() {
  let todos

  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    const newTodo = document.createElement("li")
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    const todoButtonComplete = document.createElement("button")
    todoButtonComplete.innerHTML = '<i class="fas fa-check-square"></i>'
    todoButtonComplete.classList.add("todo-button-complete")
    todoDiv.appendChild(todoButtonComplete)

    const todoButtonDelete = document.createElement("button")
    todoButtonDelete.innerHTML = '<i class="fas fa-minus-square"></i>'
    todoButtonDelete.classList.add("todo-button-delete")
    todoDiv.appendChild(todoButtonDelete)

    todoList.appendChild(todoDiv)
    todoInput.value = ""
  })
}

function removeTodosFromLocalStorage(todo) {
  let todos

  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)

  localStorage.setItem("todos", JSON.stringify(todos))
}
