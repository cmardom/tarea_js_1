const todoListHTML = document.querySelector('#todo-list');
const template = document.querySelector("#list-item-template");
const pendientes = document.querySelector("#todo-count-pending");


let todoList = [];
const todoFromLocalStorage = localStorage.getItem("todo");
if(todoFromLocalStorage){
    todoList = JSON.parse(todoFromLocalStorage);
}

renderTodoList();
countPending();

const mainForm = document.querySelector('#mainForm');

mainForm.addEventListener('submit', e => {
    e.preventDefault();
    const todoInput = e.target.querySelector('.todo-input');
    todoList.push(todoInput.value);
    localStorage.setItem("todo", JSON.stringify(todoList));
    todoInput.value = '';

    renderTodoList();
});

function renderTodoList(){
    while(todoListHTML.firstElementChild){
        todoListHTML.replaceChildren()
    }

    for(const index in todoList){
        const todoId = "todo-" + index;

        const clone = template.cloneNode(true);
        clone.classList.remove("hidden");

        const label = clone.querySelector("label");
        label.textContent = todoList[index];
        label.setAttribute("for", todoId);

        clone.querySelector('button').addEventListener("click", borrarHandler);

        const checkbox = clone.querySelector('input[type=checkbox]');
        checkbox.setAttribute("id", todoId);
        checkbox.addEventListener("change", estadoHandler);

        todoListHTML.append(clone);
    }
}

function estadoHandler(e){
    countPending();
}

function countPending(){
    const pending = todoListHTML.querySelectorAll('input[type=checkbox]:not(:checked)').length;
    pendientes.querySelector('strong').textContent = pending;
}

function borrarHandler(e) {
    const todoItemToRemove = e.target.parentElement;
    const index = Array.from(todoListHTML.children).indexOf(todoItemToRemove);

    todoList.splice(index, 1);

    console.log(todoList);
    renderTodoList();
}

function borrarCompletados(e){

    console.log()
}