const ul = document.querySelector('#todo-list');
let currentPage = '';

class ToDoModel {
    
    constructor() {
        this.type = 'todo';
        this.todo = JSON.parse(localStorage.getItem(type)) || [];
    }

    getToDo(q=null) {
        if (q !== null) {
            return this.todo.filter(el => el.name === q);
        }
        return this.todo;
    }

    
}

let todoList = JSON.parse(localStorage.getItem('todo')) || [];

class ToDo {
    constructor(content) {
        this.id = Date();
        this.content = content;
        this.completed = false;
    }


}

function addToDo(content) {
    const todo = new ToDo(content);
    todoList.push(todo);
    localStorage.setItem('todo', JSON.stringify(todoList));
}

function addItemListener() {
    const todo = document.getElementById('todo-item');
    addToDo(todo.value);
    getIncompleteTotal();
    todo.value = '';
    refreshPage();

    //console.log(this.model);
}

function getAllToDo() {
    ul.innerHTML = '';
    todoList.forEach(todo => {
        ul.appendChild(createToDoItem(todo));
        if (todo.completed) {
            document.getElementById(todo.id).setAttribute('class', 'completed');
        }
    });
    currentPage = '';
    getIncompleteTotal();
}

function getCompletedToDo() {
    ul.innerHTML = '';
    todoList.forEach(todo => {
        if (todo.completed) {
            ul.appendChild(createToDoItem(todo));
        }
    });
    currentPage = 'complete';
    getIncompleteTotal();
}

function createToDoItem(todo) {
    let inp = document.createElement('input');
    let button = document.createElement('button');
    let li = document.createElement('li');

    inp.setAttribute('type', 'checkbox');
    inp.setAttribute('value', todo.id);
    inp.addEventListener('click', swapStatus);

    button.innerHTML = 'X';
    button.setAttribute('value', todo.id);
    button.addEventListener('click', deleteToDo);

    li.setAttribute('id', todo.id);
    li.appendChild(inp);
    li.innerHTML += todo.content;
    li.appendChild(button);
    return li;
}

function getIncompleteToDo() {
    ul.innerHTML = '';
    todoList.forEach(todo => {
        if (!todo.completed) {
            ul.appendChild(createToDoItem(todo));
        }
    });
    currentPage = 'incomplete';
    getIncompleteTotal();
}

function getIncompleteTotal() {
    const totalLeft = document.querySelector('#items-remaining');
    let count = 0;
    todoList.forEach(todo => {
        if (!todo.completed) {
            count++;
        }
    });
    totalLeft.innerHTML = `${count} tasks left`;
}

function swapStatus(e) {
    let swap = e.target.value;
    console.log(swap);
    todoList.forEach(todo => {
        if (swap === todo.id) {
            console.log(todo.completed);
            todo.completed = !todo.completed;
            console.log(todo.completed);
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
    refreshPage();
}

function refreshPage() {
    switch (currentPage) {
        case 'incomplete':
            getIncompleteToDo();
            break;
        case 'complete':
            getCompletedToDo();
            break;
        default:
            getAllToDo();
            break;
    }
}

function deleteToDo(e) {
    let del = e.target.value;
    todoList.splice(getIndex(del), 1);
    refreshPage();
}

function getIndex(del) {
    let index = -1;
    for (let i = 0; i < todoList.length; i++){
        if (todoList[i].id === del){
            index = i;
            break;
        }
    }
    return index;
}

refreshPage();

ul.addEventListener('click', swapStatus);

const displayAll = document.querySelector('#all-todos');
displayAll.addEventListener('click', getAllToDo);

const displayComplete = document.querySelector('#completed-todos');
displayComplete.addEventListener('click', getCompletedToDo);

const displayIncomplete = document.querySelector('#incomplete-todos');
displayIncomplete.addEventListener('click', getIncompleteToDo);

const plusBtn = document.querySelector('#add-todo');
plusBtn.addEventListener('click', addItemListener);