const request = new XMLHttpRequest();
const url = 'http://localhost:3000/api/tasks';
let docBody = document.getElementById('bodyDiv');


let listCont = document.createElement('div');
listCont.setAttribute('id', 'listContainer');
docBody.appendChild(listCont);

let createCont = document.createElement('div');
createCont.setAttribute('id', 'createForm');
docBody.appendChild(createCont);


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
            console.log(key, resObj[key]);

            let task = {
                taskname: resObj[key].taskname,
                id: resObj[key].id,
                status: resObj[key].status
            }
            addTaskToList(task, listOfTasks);
        }
        listCont.appendChild(listOfTasks);
    };

    let newTaskForm = document.createElement('form');
    let inputField = document.createElement('input');

    inputField.setAttribute('id', 'newTaskInput');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', 'New Task');

    let submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('value', 'ADD TASK');
    submitButton.addEventListener('click', function(){
        let text = document.getElementById('newTaskInput').value;
        document.getElementById('newTaskInput').value = "";
        console.log(text);
        addTask(text);
    });

    newTaskForm.appendChild(inputField);
    newTaskForm.appendChild(submitButton);

    createCont.appendChild(newTaskForm);

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

function addTaskToList(task, listOfTasks){

    let tasks = document.createElement("li");
    let taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'taskContainer');
    let statusMenu = document.createElement('select');
    let doneOption = document.createElement('option');
    let doingOption = document.createElement('option')
    let todoOption = document.createElement('option');
    let deleteButton = document.createElement('button');

    let textSpan = document.createElement('span');
    textSpan.setAttribute('class', 'taskName');
    textSpan.addEventListener('dblclick', function (e) {changeTaskName(e, task)});
    textSpan.addEventListener('focusout', function (e) {
        textSpan.innerHTML = task.taskname;
    })
    let taskName = document.createTextNode(task.taskname);
    textSpan.appendChild(taskName);

    todoOption.setAttribute('value', 'todo');
    todoOption.setAttribute('id', 'todoSelect');
    todoOption.appendChild(document.createTextNode('ToDo'));
    doingOption.setAttribute('value', 'doing');
    doingOption.setAttribute('id', 'doingSelect');
    doingOption.appendChild(document.createTextNode('Doing'));
    doneOption.setAttribute('value', 'done');
    doneOption.setAttribute('id', 'doneSelect');
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
        alert(newStatus);
        changeStatus(task, newStatus);
    })

    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'deleteBut');
    deleteButton.addEventListener('click', function(e){deleteTask(task.id)});
    deleteButton.appendChild(document.createTextNode('-'));

    tasks.setAttribute('id', `task${task.id}`);
    taskDiv.appendChild(textSpan);
    taskDiv.appendChild(statusMenu);
    taskDiv.appendChild(deleteButton);
    tasks.appendChild(taskDiv);
    listOfTasks.appendChild(tasks);
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

function changeStatus(task, newStatus) {

    let taskID = task.id

    request.open("PUT", `${url}/${taskID}`);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({
        'taskname': task.taskname,
        'status': newStatus
    }));
    request.onload = (e) => {
        let resp = request.response;
        let stat = request.status;
        console.log(stat);
        if (stat === 200) {
            //nothing
        } else {
            alert('error ' + resp);
            //TODO: revert to previous status incase of error
        }
    };
}

function changeTaskName(e, task){

    let editNameField = document.createElement('input');
    editNameField.setAttribute('type', 'text');
    editNameField.setAttribute('id', 'editTaskName');
    editNameField.setAttribute('value', task.taskname);
    editNameField.addEventListener('change', function (e) {
        alert('changed');

        let newTaskName = editNameField.value;

        request.open("PUT", `${url}/${task.id}`);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify({
            'taskname': newTaskName,
            'status': task.status
        }));
        request.onload = (e) => {
            let resp = request.response;
            let stat = request.status;
            console.log(stat);
            if (stat === 200) {
                spanElement.innerHTML = newTaskName;
                task.taskname = newTaskName;
            } else {
                alert('error ' + resp);
                //TODO: revert to previous name incase of error
            }
        };

    })

    let spanElement = e.target;

    spanElement.innerHTML = "";
    spanElement.appendChild(editNameField);

}