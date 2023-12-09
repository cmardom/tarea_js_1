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

todolistHTML.addEventListener('click', (event) => {
   const nombreElemento = event.target.localName;
   const todoElemento = event.target.parentElement.parentElement;
   const todoID = parseInt(todoElemento.getAttribute('data-id'));
//MIRAR DATA-ID
   if (nombreElemento.includes('input')){
       todoList = todoList.map(todo => {
           if (todo.id === todoID){
               todo.completado = !todo.completado;
           }
           return todo;
       });
       todoElemento.classList.toggle('completed');
   } else if (nombreElemento.includes('button')){
       //EXPLICAR
       todoList = todoList.filter(todo => todo.id !== todoID);
       todolistHTML.removeChild(todoElemento);
   }
});

btnBorrar.addEventListener('click', () => {
    todoList = todoList.filter(todo => !todo.completado);

    for (let i = todolistHTML.children.length - 1; i >= 0; i--) {
        const elemento = todolistHTML.children[i];

        if (elemento.classList.contains('completed')){
            todolistHTML.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if (!filtro){return;}

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of todolistHTML.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        //si no lo encuentra, se muestran tareas
        switch (filtro) {
            case 'Pendientes' :
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados' :
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});