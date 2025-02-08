const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addMemo(){
    if (inputBox.value === '') {
        alert("You must add a memo");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = function() {
            editMemo(li);
        };
        
        let deleteButton = document.createElement("span");
        deleteButton.innerHTML = "\u00d7";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = function() {
            li.remove();
            saveData();
        };

        let alarmButton = document.createElement("button");
        alarmButton.innerHTML = "Set Alarm";
        alarmButton.className = "alarm-btn";
        alarmButton.onclick = function() {
            setAlarm(li);
        };

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(alarmButton);
        listContainer.appendChild(li);

        saveData();
    }
    inputBox.value = "";
}

function editMemo(li) {
    let newMemo = prompt("Edit your memo:", li.firstChild.textContent);
    if (newMemo) {
        li.firstChild.textContent = newMemo;
        saveData();
    }
}

function setAlarm(li) {
    let alarmTime = prompt("Set alarm time (in minutes):");
    if (alarmTime) {
        setTimeout(() => {
            alert("Alarm for memo: " + li.firstChild.textContent);
        }, alarmTime * 60000);
    }
}

listContainer.addEventListener('click', function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    let editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(button => {
        button.onclick = function() {
            editMemo(button.parentElement);
        };
    });
    
    let deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.onclick = function() {
            button.parentElement.remove();
            saveData();
        };
    });
    
    let alarmButtons = document.querySelectorAll(".alarm-btn");
    alarmButtons.forEach(button => {
        button.onclick = function() {
            setAlarm(button.parentElement);
        };
    });
}

showTask();
