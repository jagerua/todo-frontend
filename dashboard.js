// window.fetchService.getMembers();
let taskArr = [];

let id = 0;

const notification = document.querySelector('.notification-wrapper');
const logout = document.querySelector('#logout');
const jediName = document.querySelector('#jedi');
const addBtn = document.querySelector('#add');

let tasksBody = document.querySelector('.tasks');

// Get current user data from DB
const currentUserData = JSON.parse(localStorage.getItem('authData'));
const currUserName = currentUserData.userData.user.name;
// const currUserName = "Darth Vader";

// Check if its comming
!currentUserData ? alert('Jedi left the room!') : applyUserData(currentUserData);

// Apply data from DB to frontend page
function applyUserData () {
  colorToTheTitle(currUserName);
};

// Clear the HTML task block
function clearHTML() {
  tasksBody.innerHTML = ' ';
};

// Render tasks on the web page
function renderTasks(taskArr) {
  // Check if there is any data coming
  if (!taskArr) return;

  for (let i = taskArr.length - 1; i >= 0; i--) {
    tasksBody.insertAdjacentHTML("beforeend", 
      `<div id="${taskArr[i].id}" class="todo-cell body-cell">
        <input class="checkmark" name="done" type="checkbox" onclick='clickDone(this)'>
        <input id="task-title" class="task-title-edit" name="task-name" placeholder="${taskArr[i].title}" value="${taskArr[i].title}" readonly>
        <button class="edit-btn task-btn edit" type="button" data-id="${id += 1}" onclick='clickEdit(this)'>Edit</button>
        <button class="delete-btn task-btn delete" type="button" onclick='clickDelete(this)'>Delete</button>
      </div>`);
  }
};

// Get all the tasks from backend for THIS user
window.onload = function() {
  window.fetchService.getTasks()
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) {
        data.UserTasks.forEach(el => {
          el['id'] = el['_id'];
          delete el['_id'];
        });

        taskArr = data.UserTasks;
        renderTasks(taskArr);
        showSuccessNotify(data);
        clearNotify();
      } else {
        showErrorNotify();
        clearNotify();
      }

    })
    .catch(err => {
      showErrorNotify();
      clearNotify();
    });
};

// Click on the edit button
function clickEdit(el) {
  // const id = el.getElementById('id');
  const id = el.getAttribute("data-id");
  const currEl = el.parentElement;
  const currElId = el.parentElement.id;
  console.log(currElId);

  let currInput = currEl.querySelector('.task-title-edit');
  let currInputValue = currInput.value;
  let currInputValueLength = currInput.value.length;

  if (el.innerText.toLowerCase() == 'edit') {
    currInput.removeAttribute("readonly");
    currInput.setSelectionRange(currInputValueLength, currInputValueLength); // Set cursor to the end of the value
    currInput.focus();
    el.innerText = 'Save';
  } else {
    // Update data in local storage taskArr
    taskArr = taskArr.map(el => el.id == currElId ? { ...el, title: currInputValue } : el);

    let update = taskArr.find(el => el.id == currElId);
    console.log(update);

    window.fetchService.updateTask(currUserName, currElId, update)
    .then((res) => res.json())
    .then((data) => {
      if (data.code == 200) {
        currInput.setAttribute("readonly", '');
        currInput.setAttribute('value', currInputValue);
        currInput.setAttribute('placeholder', currInputValue);
        el.innerText = 'Edit';
      }
    })
    .catch(err => {
      showErrorNotify();
      setTimeout(() => notification.innerHTML = '', 8*1000);
    });
  }
};

// Click on the delete button 
function clickDelete(el) {
  const currElId = el.parentElement.id;

  window.fetchService.deleteTask(currUserName, currElId)
  .then((res) => res.json())
  .then((data) => {
    if (data.code == 200) {
      // Delete task from TaskArray
      taskArr = taskArr.filter(el => currElId !== el.id);
      clearHTML();
      renderTasks(taskArr);
    };
  })
  .catch(err => {
    showErrorNotify();
    setTimeout(() => notification.innerHTML = '', 8*1000);
  });
};

// Some color to the user name
function colorToTheTitle (data) {
  switch (data.toLowerCase()) {
    case "obi-wan kenobi":
      jediName.style.color = "#2826c3";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "0px 1px 2px #7a7a7a,0px 0px 1em blue,0px 0px 0.2em blue";
      break;
    case "anakin skywalker":
      jediName.style.color = "#027e00";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#817f7f 0px 1px 2px, #009719 0px 0px 1em, #029d00 0px 0px 0.2em";
      break;
    case "mace windu":
      jediName.style.color = "#811bc1";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#000000 0px 1px 2px, #a900ff 0px 0px 1em, #7000a9 0px 0px 0.2em";
      break;
    case "yoda":
      jediName.style.color = "#027e00";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#817f7f 0px 1px 2px, #009719 0px 0px 1em, #029d00 0px 0px 0.2em";
      break;
    case "qui-gon jinn":
      jediName.style.color = "#027e00";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#817f7f 0px 1px 2px, #009719 0px 0px 1em, #029d00 0px 0px 0.2em";
      break;
    case "luke skywalker":
      jediName.style.color = "#2826c3";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#7a7a7a 0px 1px 2px, 0px 0px 1em blue,0px 0px 0.2em blue";
      break;
    case "princess leia":
      jediName.style.color = "#2826c3";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#7a7a7a 0px 1px 2px, 0px 0px 1em blue,0px 0px 0.2em blue";
      break;
    case "han solo":
      jediName.style.color = "#2826c3";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#7a7a7a 0px 1px 2px, 0px 0px 1em blue,0px 0px 0.2em blue";
      break;
    case "darth maul":
      jediName.style.color = "#830606";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#817f7f 0px 1px 2px, red 0px 0px 1em, red 0px 0px 0.2em";
      break;
    case "darth vader":
      jediName.style.color = "#830606";
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.textShadow = "#817f7f 0px 1px 2px, red 0px 0px 1em, red 0px 0px 0.2em";
      break;
    default:
      jediName.innerText = ' - ' + currUserName + ' - ';
      jediName.style.color = "black";
  }
};

// Add new Task
addBtn.addEventListener('mouseup', () => {
  let taskTtitle = document.querySelector('#task-title').value;
  // Cjeck if the input field is not empty
  if (!taskTtitle || taskTtitle === ' ' || taskTtitle === null) return alert('Can`t create task!');

  const newTask = {
    user: currUserName,
    title: taskTtitle,
    done: false,
  };

  // Push user data to local array
  taskArr.push(newTask);

  // Send data to DB!!!
  window.fetchService.postTask(taskArr[taskArr.length - 1])
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data.code == 200) {
      // Update ID for the task
      taskArr = taskArr.map(el => el.user == currUserName && el.title == data.tasks.title ? { ...el, id: data.tasks._id } : el);
      clearHTML();
      renderTasks(taskArr);
    };
  })
  .catch(err => {
    showErrorNotify();
    setTimeout(() => notification.innerHTML = '', 8*1000);
  });

  // Clear the input field after enter
  clearInput();
});

// Add class Done and cross line to the task
function clickDone(el) {
  const currElId = el.parentElement.id;
  let taskCheck = taskArr.find(el => el.id == currElId);

  if (!el.classList.contains('done')) {
    taskArr.map(task => task.id == currElId ? task.done = true : task.done);
    let taskCheckStatus = {done: taskCheck.done};

    console.log(taskCheckStatus);
    
    window.fetchService.updateCheckStatus(currUserName, currElId, taskCheckStatus)
    .then((res) => res.json())
    .then((data) => {
      if (data.code == 200) {
        el.classList.add('done');
      }
    })
    .catch(err => {
    });

  } else {
    taskArr.map(task => task.id == currElId ? task.done = false : task.done);
    let taskCheckStatus = {done: taskCheck.done};

    window.fetchService.updateCheckStatus(currUserName, currElId, taskCheckStatus)
    .then((res) => res.json())
    .then((data) => {
      if (data.code == 200) {
        el.classList.remove('done');
      }
    })
    .catch(err => {
    });

    console.log(taskCheck.done);
  };
};

// Update ID for the task
// function updateUserData(data) {
//   return taskArr = taskArr.map(el => el.user == currUserName && el.title == data.tasks.title ? { ...el, id: data.tasks._id } : el);
// };

// Click on the Logout button
logout.addEventListener('mouseup', () => {
  const logoutMass = document.querySelector('.logout');
  const mainWindow = document.querySelector('.main');
  localStorage.clear();

  mainWindow.style.opacity = '0';
  logoutMass.style.visibility = 'visible';

  setTimeout(()=> {
    logoutMass.style.visibility = 'hidden';
  }, 2000);

  setTimeout(()=> {
    window.location.href = './login/index.html';
  }, 2600);
});

// Add one more PUT request to update current user (done/undone) task list

// Clear the input field after enter
function clearInput() {
  let inputField = document.querySelector('#task-title');
  inputField.value = '';
  inputField.focus();
};

function showSuccessNotify(data) {
  notification.insertAdjacentHTML("beforeend", `
  <div class="alert alert-success alert-white rounded">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true" onclick="closeNotify(this)">×</button>
    <div class="icon"><i class="fa fa-check"></i></div>
    <strong>Success!</strong> <span class="notification-text">${data.operation}!</span> 
  </div>
  `);
};

function showErrorNotify() {
  notification.insertAdjacentHTML("beforeend", `
    <div class="alert alert-danger alert-white rounded">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true" onclick="closeNotify(this)">×</button>
      <div class="icon"><i class="fa fa-times-circle"></i></div>
      <strong>Error!</strong> <span class="notification-text">The server is not responding, your deep in this shit again!</span> 
    </div>
  `);
};

// Clear notification
function clearNotify() {
  setTimeout(() => notification.innerHTML = '', 10*1000);
};

function closeNotify(el) {
  const currEl = el.parentElement;
  currEl.remove();
};

// showErrorNotify();
// setTimeout(() => notification.innerHTML = '', 8*1000);
  // ASK
  // How to handel check/ uncheck tasks