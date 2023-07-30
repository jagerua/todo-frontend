window.fetchService = {};

(function () {
  const checkErr = function(err) {
    if (err.massage && err.massage.toLowerCase().indexOf('invalid token') != -1) {
      localStorage.deleteItem('token');
      window.location.href = './login/index.html';
    }
  };
  
  const signupHandler = (data) => {
    return fetch('http://localhost:3000/ToDo/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
  };
  
  const loginHandler = (data) => {
    return fetch('http://localhost:3000/ToDo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
  };

  const postTask = (data) => {
    const token = localStorage.getItem('token');
    return fetch('http://localhost:3000/ToDo/postTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(data),
    })
  };
  
  const getTasks = () => {
    let name = JSON.parse(localStorage.getItem('authData')).userData.user.name;

    const token = localStorage.getItem('token');
    return fetch(`http://localhost:3000/ToDo/getTasks/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
    })
  };

  const updateTask = (user, id, obj) => {
    const token = localStorage.getItem('token');
    return fetch(`http://localhost:3000/ToDo/updateTask/${user}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(obj),
    })
  };

  const deleteTask = (user, id) => {
    console.log('User: ', user);
    console.log('Id: ', id);

    const token = localStorage.getItem('token');
    return fetch(`http://localhost:3000/ToDo/deleteTask/${user}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
    })
  };
  
  const getMembers = () => {
    //limit = limit || 100;
    //start = start || 0;
    const token = localStorage.getItem('token');
    // console.log('token: ', token);
  
    //const url = 'http://localhost:3000/ToDo/all?' + 'limit=' + limit + '&'...
    // return fetch('http://localhost:3000/ToDo/all?limit=10&start=20',
    return fetch('http://localhost:3000/ToDo/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
      },
    })
      .then((res) => res.json())
      .then((data) => {
      })
      .catch(checkErr);
  };

  const updateCheckStatus = (user, id, taskCheckStatus) => {
    const token = localStorage.getItem('token');
    return fetch(`http://localhost:3000/ToDo/updateCheckStatus/${user}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(taskCheckStatus),
    })
  };
  
  window.fetchService = {
    signupHandler: signupHandler,
    loginHandler: loginHandler,

    getMembers: getMembers,
    getTasks: getTasks,

    postTask: postTask,
    deleteTask: deleteTask,
    updateTask: updateTask,

    updateCheckStatus: updateCheckStatus,
  };

})();

// email": "wwwspot@yahoo.com",
// "password": "$2a$10$71FBOqfrc5uXhF1PLTq2nOX8E2eApk7VnKquP5o7uAX7GWDrE4Lla"