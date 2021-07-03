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
        listOfTasks.setAttribute('id', 'tasksList');
        for (const key in resObj){
            console.log(key, resObj[key])
            addTaskToList(resObj, key, listOfTasks);
        }
        listCont.appendChild(listOfTasks);
    };

    let newTaskForm = document.createElement('form');
    let inputField = document.createElement('input');

    inputField.setAttribute('id', 'newTaskInput');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', 'New Task');

    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'ADD TASK');
    submitButton.addEventListener('click', function(){
        let text = document.getElementById('newTaskInput').value;
        console.log(text);
        addTask(text);
    });

    newTaskForm.appendChild(inputField)
    newTaskForm.appendChild(submitButton)

    createCont.appendChild(newTaskForm)

});


function deleteTask(taskId){

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

function addTask(text){

    request.open("POST", `${url}`);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({
        'taskname': text,
        'status': 'todo'
    }));
    request.onload = (e) => {
        let resp = request.response;
        let stat = request.status;
        console.log(stat);
        if (stat === 201) {
            // supposed to add task to list, but the automatic page reload takes care of that
        } else {
            alert('error ' + resp)
        }
    };
}

function addTaskToList(resObj, key, listOfTasks){
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

    editButton.setAttribute('type', 'button');
    editButton.setAttribute('class', 'editBut');
    editButton.appendChild(document.createTextNode('*'));

    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'deleteBut');
    deleteButton.addEventListener('click', function(e){deleteTask(resObj[key].id)});
    deleteButton.appendChild(document.createTextNode('-'));

    tasks.setAttribute('id', `task${resObj[key].id}`)
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(statusMenu);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);
    tasks.appendChild(taskDiv);
    listOfTasks.appendChild(tasks);
}
