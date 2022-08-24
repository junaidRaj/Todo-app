const firebaseConfig = {
    apiKey: "AIzaSyBzB-_TvFX2wM3LoUqHp2eeJJ1ifLjw_bo",
    authDomain: "todo-app-b8a62.firebaseapp.com",
    databaseURL: "https://todo-app-b8a62-default-rtdb.firebaseio.com",
    projectId: "todo-app-b8a62",
    storageBucket: "todo-app-b8a62.appspot.com",
    messagingSenderId: "548082304608",
    appId: "1:548082304608:web:4491b1ee1caac40cd36505",
    measurementId: "G-W31CZYQSCK"
  };

var inputValue = document.getElementById('item');
// Initialization of Firebase
const app = firebase.initializeApp(firebaseConfig);

// Key Generate here
var key = app.database().ref('/').child('todolist').push().key

// Retreive from firebase database
app.database().ref('/').child('todolist/').on('child_added', function (data) {
    console.log(data.val().value, data.key)

    var taskText = document.createTextNode(data.val().value);
    var table = document.getElementById('table');
    var txtTd = document.createElement('td');
    var editTd = document.createElement('td');
    var delBtnTd = document.createElement('td');
    var editBtn = document.createElement("button");
    var delBtn = document.createElement("button");

    txtTd.appendChild(taskText);
    var editBtnTxt = document.createTextNode("Edit");
    var delBtnTxt = document.createTextNode("Delete");
    editBtn.appendChild(editBtnTxt);
    delBtn.appendChild(delBtnTxt);
    editBtn.setAttribute('class', "editBtn");
    delBtn.setAttribute('class', "delBtn");
    editBtn.setAttribute('onclick', "editItem(this)");
    delBtn.setAttribute('onclick', "delItem(this)");

    editBtn.setAttribute('id', data.key);
    delBtn.setAttribute('id', data.key);

    editTd.appendChild(editBtn);
    delBtnTd.appendChild(delBtn);
    txtTd.setAttribute('class', "itemtTd");
    editTd.setAttribute('class', "editTd");
    delBtnTd.setAttribute('class', "delTd");
    var tr = document.createElement("tr");
    tr.appendChild(txtTd);
    tr.appendChild(editTd);
    tr.appendChild(delBtnTd);
    table.appendChild(tr);
})

function addtodo() {
    
    if (!inputValue.value.trim()) {
        alert("Enter your task")
    }
    else {
        var key = firebase.database().ref('/').child('todolist').push().key
        // adding Data to firebase
        app.database().ref('/').child('todolist').push({ value: inputValue.value, key: key })
        var val = {
            value: inputValue.value,
            key: key
        }

        input_value.value = ""
    }
}

function editItem(e) {
    var val = e.parentNode.previousSibling.innerText;

    var uptval = prompt('Enter new Task', val)
    if (!uptval.trim()) {
        alert("Empty Input, Changes not saved")
    }
    else {
        var update = {
            value: uptval,
            key: e.id
        }

        app.database().ref('/todolist').child(e.id).set(update)
        e.parentNode.previousSibling.innerText = update.value
    }


}

function delItem(e) {
    e.parentNode.parentNode.remove();
    app.database().ref('/todolist').child(e.id).remove()
}

function deleteAlltodo() {
    var table = document.getElementById('table');
    table.innerHTML = ""
    app.database().ref('/todolist').remove()
}