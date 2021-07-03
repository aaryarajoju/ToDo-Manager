const request = new XMLHttpRequest()
const url = 'http://localhost:3000/api/tasks';
let docBody = document.getElementById('bodyDiv')


let listCont = document.createElement('div');
listCont.setAttribute('id', 'listContainer');
docBody.appendChild(listCont);

let createCont = document.createElement('div');
createCont.setAttribute('id', 'createForm');
docBody.appendChild(createCont);

let editCont = document.createElement('div');
editCont.setAttribute('id', 'editForm');
docBody.appendChild(editCont);


document.addEventListener("DOMContentLoaded", (event) => {

    request.open("GET", url);
    request.send();

    request.onload = (e) => {
        let res = request.response;
        let resObj = JSON.parse(res);
        console.log(resObj);

        let listOfTasks = document.createElement("ul");
        for (const key in resObj){
            console.log(key, resObj[key])
            let tasks = document.createElement("li");
            let taskDiv = document.createElement('div');
            let statusMenu = document.createElement('select');
            let doneOption = document.createElement('option');
            let doingOption = document.createElement('option')
            let todoOption = document.createElement('option');
            let deleteButton = document.createElement('button');
            let editButton = document.createElement('button')

            let taskName = document.createTextNode(resObj[key].taskname);

            todoOption.setAttribute('value', 'todo');
            todoOption.appendChild(document.createTextNode('ToDo'));
            doingOption.setAttribute('value', 'doing');
            doingOption.appendChild(document.createTextNode('Doing'));
            doneOption.setAttribute('value', 'done');
            doneOption.appendChild(document.createTextNode('Done'));
            statusMenu.appendChild(todoOption);
            statusMenu.appendChild(doingOption);
            statusMenu.appendChild(doneOption);

            deleteButton.setAttribute('type', 'button');
            deleteButton.appendChild(document.createTextNode('-'));

            editButton.setAttribute('type', 'button');
            editButton.appendChild(document.createTextNode('*'));

            taskDiv.appendChild(taskName);
            taskDiv.appendChild(statusMenu);
            taskDiv.appendChild(deleteButton);
            taskDiv.appendChild(editButton);
            tasks.appendChild(taskDiv);
            listOfTasks.appendChild(tasks);
        }
        listCont.appendChild(listOfTasks);
    };

    let newTaskForm = document.createElement('form');
    let inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('value', 'New Task');

    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'ADD TASK');

    newTaskForm.appendChild(inputField)
    newTaskForm.appendChild(submitButton)

    createCont.appendChild(newTaskForm)

});

