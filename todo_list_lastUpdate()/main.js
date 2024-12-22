let datebox = document.querySelector(".datebox")
let title = document.querySelector(".titleTask")
let description = document.querySelector(".description")
let saveTask = document.querySelector(".save-task");
let deleteButton = document.querySelector(".delete-all");

let icons = document.querySelector(".icons")
let mood = true;
let tmp;
let divtasks;



let tasks = document.querySelector("#divTask")
let task = document.querySelector(".task")
let create = document.querySelector("#create")
let info = document.querySelector('.info')

let arrayOfTasks;
// check if local storage has data
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.tasks);

}
else {
    arrayOfTasks = [];
}

saveTask.onclick = function () {


    if (title.value !== "") {
        let newtask;
        newtask = {
            datebox: datebox.value, id: Date.now(), title: title.value, description: description.value, checked: false
        }

        if (mood) {
            alert("create");

            arrayOfTasks.push(newtask)
        }
        else {
            mood = true
            saveTask.textContent = "saveTask"
            arrayOfTasks[tmp] = newtask

        }


        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
        showTasks();
        clearData();



    }

};
function clearData() {
    datebox.value = ""
    title.value = ""
    description.value = ""

}

function showTasks() {
   

    divtasks = '';
    for (let i = 0; i < arrayOfTasks.length; i++) {


        divtasks += `
        <div class="task">


                <div class="test">
                    <input type="checkbox"  class ="checkboxclass" id="done${i}" onchange="handleCheckboxChange(${i})" ${arrayOfTasks[i].checked ? 'checked' : ''}  >
                    <div class="content2">
                    
                        <h2 style="${arrayOfTasks[i].checked ? 'text-decoration: line-through; opacity:.7;' : ''}">${arrayOfTasks[i].title}</h2>
                        
                        <span style="${arrayOfTasks[i].checked ? 'text-decoration: line-through; opacity:.7;' : ''}">${arrayOfTasks[i].datebox}</span>
                        <p style="${arrayOfTasks[i].checked ? 'text-decoration: line-through; opacity:.7;' : ''}">${arrayOfTasks[i].description}</p>
                    </div>
                </div>
                <div class="icons">
                   
            <button class='upd'onclick="updateTaskWith(${i})">   <i class="bi bi-pencil-square"  > </i></button>
           <button class='del' onclick= "deleteTaskWith(${i})"> <i class="bi bi-trash3"  ></i></button>
                </div>

            </div>`

    }
    document.getElementById('divTask').innerHTML = divtasks;

}
showTasks()



function deleteTaskWith(i) {

    arrayOfTasks.splice(i, 1);
    localStorage.tasks = JSON.stringify(arrayOfTasks)
    showTasks()




}
function updateTaskWith(i) {
    mood = false
    datebox.value = arrayOfTasks[i].datebox
    title.value = arrayOfTasks[i].title
    description.value = arrayOfTasks[i].description

    saveTask.textContent = "Update"
    tmp = i;


}
deleteButton.onclick = function () {

    localStorage.clear();
    arrayOfTasks.splice(0)
    showTasks()

}

//search 
function searchTasks(value) {
    let divtasks = '';
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].title.includes(value)) {
            divtasks += `
        <div class="task">


                <div class="test">
                    <input type="checkbox" id="done"  >
                    <div class="content2">
                        <h2>${arrayOfTasks[i].title}</h2>
                        <span>${arrayOfTasks[i].datebox}</span>
                        <p>${arrayOfTasks[i].description}</p>
                    </div>
                </div>
                <div class="icons">
                   
            <button class='upd'onclick="updateTaskWith(${i})">   <i class="bi bi-pencil-square"  > </i></button>
           <button class='del' onclick= "deleteTaskWith(${i})"> <i class="bi bi-trash3"  ></i></button>
                </div>

            </div>`



        }
    }
    document.getElementById('divTask').innerHTML = divtasks;
}
function handleCheckboxChange(i) {
    let checkbox = document.getElementById(`done${i}`);
    let title = document.querySelector(`#divTask .task:nth-child(${i + 1}) .content2 h2`);
    let date = document.querySelector(`#divTask .task:nth-child(${i + 1}) .content2 span`);

    let description = document.querySelector(`#divTask .task:nth-child(${i + 1}) .content2 p`);


    if (checkbox.checked) {
        title.style.textDecoration = "line-through";

        title.style.opacity = '.7';
        description.style.textDecoration = "line-through";

        description.style.opacity = '.7';
        date.style.textDecoration = "line-through";

        date.style.opacity = '.7';

    } else {
        title.style.textDecoration = "none";
        title.style.opacity = '1';
        description.style.textDecoration = "none";
        description.style.opacity = '1';
        date.style.textDecoration = "none";
        date.style.opacity = '1';
    }

    arrayOfTasks[i].checked = checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}