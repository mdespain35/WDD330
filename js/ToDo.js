const ul = document.querySelector('#todo-list');

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
        this.type = 'todo';
        this.id = Date();
        this.content = content;
        this.completed = false;
    }


}

function addToDo(content) {
    const todo = new ToDo(content);
    todoList.push(todo);
    localStorage.setItem(todo.type, JSON.stringify(todoList));
}

function addItemListener() {
    const todo = document.getElementById('todo-item').value;
    addToDo(todo);
    getIncompleteTotal();
    console.log(todo);
    
    console.log(todoList);

    //console.log(this.model);
}

function getAllToDo() {
    let list = '';
    ul.innerHTML = '';

    todoList.forEach(todo => {
        list += `<li id="${todo.id}"><input type="checkbox" value="${todo.id}">${todo.content}</li>`;
    });
    ul.innerHTML = list;
    getIncompleteTotal();
}

function getCompletedToDo() {
    let list = '';
    ul.innerHTML = '';
    todoList.forEach(todo => {
        if (todo.completed) {
            list += `<li id="${todo.id}"><input type="checkbox" value="${todo.id}">${todo.content}</li>`;
        }
    });
    ul.innerHTML = list;
    getIncompleteTotal();
}

function getIncompleteToDo() {
    let list = '';
    ul.innerHTML = '';
    todoList.forEach(todo => {
        if (!todo.completed) {
            list += `<li id="${todo.id}"><input type="checkbox" value="${todo.id}">${todo.content}</li>`;
        }
    });
    ul.innerHTML = list;
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
        }
    });
}

ul.addEventListener('click', swapStatus);

const displayAll = document.querySelector('#all-todos');
displayAll.addEventListener('click', getAllToDo);

const displayComplete = document.querySelector('#completed-todos');
displayComplete.addEventListener('click', getCompletedToDo);

const displayIncomplete = document.querySelector('#incomplete-todos');
displayIncomplete.addEventListener('click', getIncompleteToDo);

const plusBtn = document.querySelector('#add-todo');
plusBtn.addEventListener('click', addItemListener);