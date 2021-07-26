/*
*  Copyright (c) 2021 AARYA RAJOJU. Rights reserved.
*  This Code is licensed under the GNU General Public License v3.0
*  refer: https://github.com/aaryarajoju/ToDo-Manager/blob/main/LICENSE
*/

// importing the `XMLHttpRequest` module for sending http calls to the rest api
const request = new XMLHttpRequest();

// defining the url for sending the http requests to
const url = 'http://localhost:3000/api/tasks';

let docBody = document.getElementById('bodyDiv');
docBody.setAttribute('class', 'bodyDiv');

let titleCont = document.createElement('div');
titleCont.setAttribute('id', 'titleCont');
titleCont.setAttribute('class', 'titleCont');
docBody.appendChild(titleCont);

let title = document.createElement('h1');
title.setAttribute('id', 'title');
title.setAttribute('class', 'title');
title.innerHTML = "Tasks Manager";
titleCont.appendChild(title);


let listCont = document.createElement('div');
listCont.setAttribute('id', 'listContainer');
listCont.setAttribute('class', 'listContainer');
docBody.appendChild(listCont);

let createCont = document.createElement('div');
createCont.setAttribute('id', 'createForm');
createCont.setAttribute('class', 'createForm');
docBody.appendChild(createCont);


document.addEventListener("DOMContentLoaded", (event) => {

    // sending a `GET` request to the api to get all the tasks data
    request.open("GET", url);
    request.send();

    request.onload = (e) => {
        let res = request.response;
        let resObj = JSON.parse(res);

        let listOfTasks = document.createElement("div");
        listOfTasks.setAttribute('id', 'tasksList');
        for (const key in resObj){

            if (resObj.hasOwnProperty(key)) {
                let task = {
                    taskname: resObj[key].taskname,
                    id: resObj[key].id,
                    status: resObj[key].status
                }
                // calling the function to add each task to the list
                addTaskToList(task, listOfTasks);
            }
        }
        listCont.appendChild(listOfTasks);
    };

    // add a field to create new tasks
    let newTaskForm = document.createElement('form');
    newTaskForm.setAttribute('autocomplete', 'off')
    let inputField = document.createElement('input');

    inputField.setAttribute('id', 'newTaskInput');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', 'Add your new task here...');
    inputField.setAttribute('class', 'newTask');
    inputField.addEventListener('change', function(){
        let text = document.getElementById('newTaskInput').value;
        document.getElementById('newTaskInput').value = "";
        addTask(text);
    });

    // adding a submit button to the new task field
    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('class', 'addButton');
    submitButton.setAttribute('value', 'ADD TASK');
    submitButton.addEventListener('click', function(){
        let text = document.getElementById('newTaskInput').value;
        document.getElementById('newTaskInput').value = "";
        addTask(text);
    });

    // adding the new task elements to the div
    newTaskForm.appendChild(inputField);
    newTaskForm.appendChild(submitButton);

    createCont.appendChild(newTaskForm);

});


function addTaskToList(task, listOfTasks){

    let tasks = document.createElement("div");
    let taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'taskContainer');
    let statusMenu = document.createElement('select');
    let doneOption = document.createElement('option');
    let doingOption = document.createElement('option')
    let todoOption = document.createElement('option');
    let deleteButton = document.createElement('button');

    // adding the task name to the field
    let textSpan = document.createElement('span');
    textSpan.setAttribute('class', 'taskName');
    textSpan.setAttribute('id', `span${task.id}`);
    textSpan.addEventListener('dblclick', function (e) {changeTaskName(e, task)});
    textSpan.addEventListener('focusout', function (e) {
        textSpan.innerHTML = task.taskname;
    })
    let taskName = document.createTextNode(task.taskname);
    textSpan.appendChild(taskName);

    // adding status options to the field
    todoOption.setAttribute('value', 'todo');
    todoOption.setAttribute('id', 'todoSelect');
    todoOption.setAttribute('class', 'selectOption');
    todoOption.appendChild(document.createTextNode('ToDo'));
    doingOption.setAttribute('value', 'doing');
    doingOption.setAttribute('id', 'doingSelect');
    doingOption.setAttribute('class', 'selectOption');
    doingOption.appendChild(document.createTextNode('Doing'));
    doneOption.setAttribute('value', 'done');
    doneOption.setAttribute('id', 'doneSelect');
    doneOption.setAttribute('class', 'selectOption');
    doneOption.appendChild(document.createTextNode('Done'));
    statusMenu.appendChild(todoOption);
    statusMenu.appendChild(doingOption);
    statusMenu.appendChild(doneOption);

    if (task.status === "todo"){
        todoOption.setAttribute('selected', "true");
    } else if (task.status === "doing"){
        doingOption.setAttribute('selected', "true");
    } else if (task.status === "done"){
        doneOption.setAttribute('selected', "true");
    }

    statusMenu.addEventListener('input', function (e){
        let newStatus = statusMenu.value;
        changeStatus(task, newStatus);
    })

    // adding a delete button
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'deleteButton');
    deleteButton.addEventListener('click', function(e){deleteTask(task.id)});
    let trashIcon = document.createElement('i');
    trashIcon.setAttribute('class', 'far fa-trash-alt');
    deleteButton.appendChild(trashIcon);

    // adding a bullet to the field
    let bulletDiv = document.createElement('div');
    bulletDiv.setAttribute('class', 'bulletDiv');
    let bulletIcon = document.createElement('i');
    bulletIcon.setAttribute('class', 'fa fa-hand-o-right');
    bulletDiv.appendChild(bulletIcon);

    let textDiv = document.createElement('div');
    textDiv.setAttribute('class', 'textDiv');
    textDiv.appendChild(textSpan);

    let statusDiv = document.createElement('div');
    statusDiv.setAttribute('class', 'statusDiv');
    statusDiv.appendChild(statusMenu);

    let deleteDiv = document.createElement('div');
    deleteDiv.setAttribute('class', 'deleteDiv');
    deleteDiv.appendChild(deleteButton);

    // adding all the elements to a div
    taskDiv.appendChild(bulletDiv);
    taskDiv.appendChild(textDiv);
    taskDiv.appendChild(statusDiv);
    taskDiv.appendChild(deleteButton);

    tasks.setAttribute('id', `task${task.id}`);
    tasks.setAttribute('class', `listedTask`);
    tasks.appendChild(taskDiv);

    let borderDiv = document.createElement('div');
    borderDiv.setAttribute('class', 'bottomBorder');
    tasks.appendChild(borderDiv);

    listOfTasks.appendChild(tasks);
}

// function to create a new task
function addTask(text){

    // sends a `POST` http request to the api
    request.open("POST", `${url}`);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({
        'taskname': text,
        'status': 'todo'
    }));
    request.onload = (e) => {
        let resp = request.response;
        let stat = request.status;
        if (stat === 201) {

            let newTask = {
                taskname: text,
                id: resp,
                status: "todo"
            };

            addTaskToList(newTask, document.getElementById('tasksList'));

        } else {
            alert('error ' + resp);
        }
    };
}

// function to change the status of a task
function changeStatus(task, newStatus) {

    let taskID = task.id

    // sends a `PUT` http request to the api
    request.open("PUT", `${url}/${taskID}`);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({
        'taskname': task.taskname,
        'status': newStatus
    }));
    request.onload = (e) => {
        let resp = request.response;
        let stat = request.status;
        if (stat === 200) {
            //nothing
        } else {
            alert('error ' + resp);
        }
    };
}

// function to change the name of a task
function changeTaskName(e, task){

    let spanElement = document.getElementById(`span${task.id}`);

    let editNameField = document.createElement('input');
    editNameField.setAttribute('type', 'text');
    editNameField.setAttribute('class', 'editForm')
    editNameField.setAttribute('id', 'editTaskName');
    editNameField.setAttribute('value', task.taskname);
    editNameField.addEventListener('change', function (e) {

        let newTaskName = editNameField.value;

        // sends a `PUT` http request to the api
        request.open("PUT", `${url}/${task.id}`);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify({
            'taskname': newTaskName,
            'status': task.status
        }));
        request.onload = (e) => {
            let resp = request.response;
            let stat = request.status;
            if (stat === Number(200)) {
                spanElement.innerHTML = "";
                spanElement.appendChild(document.createTextNode(newTaskName))
                task.taskname = newTaskName;
            } else {
                alert('error ' + resp);
            }
        };

    })
    spanElement.innerHTML = "";
    spanElement.appendChild(editNameField);

}

// function to delete a task
function deleteTask(taskId){

    // sends a `DELETE` http request to the api
    request.open("DELETE", `${url}/${taskId}`);
    request.send();
    request.onload = (e) => {
        let resp = request.response;
        let stat = request.status;
        if (stat === 200) {
            document.getElementById(`task${taskId}`).remove();
        } else {
            alert('error ' + resp);
        }
    };
}

