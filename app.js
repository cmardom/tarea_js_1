const todolistHTML = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

let todoList = [];
function crearTodoHTML (estadoCompletado, textoTarea){
    const htmlTodo = `<li class="${estadoCompletado ? 'completed' : ''}">
                                <div class="view">
                                    <input class="toggle" type="checkbox" ${estadoCompletado ? 'checked' : ''}>
                                    <label>${textoTarea}</label>
                                    <button class="destroy"></button>
                                </div>
                                <input class="edit" value="Create TODOMVC Template">
                                </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    todolistHTML.append(div.firstElementChild);

    return div.firstElementChild;
}



input.addEventListener('keyup', (event) => {
    //13 == enter
    if (event.keyCode === 13 && input.value.length > 0){
        const textoTarea = input.value;
        const nuevoTodo = {
            id: Date.now(),
            texto: textoTarea,
            completado: false
        };

        todoList.push(nuevoTodo);
        crearTodoHTML(nuevoTodo.completado, nuevoTodo.texto);
        input.value = '';
    }
});



