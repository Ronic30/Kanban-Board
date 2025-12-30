const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")

const toggleModalButton = document.querySelector("#toggle-modal")
const modalBg = document.querySelector(".modal .bg")
const modal = document.querySelector(".modal")
const addTaskButton = document.querySelector("#add-new-task")

const tasks = document.querySelectorAll(".task")

let dragElement = null

/*ADDING NEW TASK*/

function addNewTask(title, desc, column){
    const div = document.createElement("div")
    div.classList.add("task")
    div.innerHTML = `<h2>${title}</h2><p>${desc}</p><button>Delete</button>`
    div.setAttribute("draggable", "true")

    column.appendChild(div)
    div.addEventListener("drag", () => {
        dragElement = div 
    })

    const deleteButton = div.querySelector("button")
    deleteButton.addEventListener("click", () => {
        div.remove()
        updateTaskCount()
    })

}

toggleModalButton.addEventListener("click", () => {
    modal.classList.add("active")
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active")
})

addTaskButton.addEventListener("click", () => {
    const title = document.querySelector("#task-title-input").value
    const desc = document.querySelector("#task-desc-input").value

    addNewTask(title, desc, todo)

    modal.classList.remove("active")

    document.querySelector("#task-title-input").value = " "
    document.querySelector("#task-desc-input").value = " "

    updateTaskCount()
})

/*DRAGGING AND DROPING LOGIC*/

const taskColumns = [todo, progress, done]

tasks.forEach((task) => {
    task.addEventListener("dragstart", () => {
        dragElement = task
    })
})

function addDragEventOnColumn(column){
    column.addEventListener("dragenter", (e) => {
        e.preventDefault()
        column.classList.add("hover-over")
    })

    column.addEventListener("dragleave", (e) => {
        e.preventDefault()
        column.classList.remove("hover-over")
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault()

        column.appendChild(dragElement)

        column.classList.remove("hover-over")

        updateTaskCount()

        taskColumns.forEach((col) => {
            const tasks = col.querySelectorAll(".task")
            const count = col.querySelector(".right")
            count.textContent = tasks.length
        })
    })
}

addDragEventOnColumn(todo)
addDragEventOnColumn(progress)
addDragEventOnColumn(done)

/*STORING TASKS IN LOCAL STORAGE*/

let tasksData = {}

function updateTaskCount(){
    taskColumns.forEach((col) => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")
        
        tasksData[col.id] = Array.from(tasks).map((t) => {
            return{
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })

        localStorage.setItem("tasks", JSON.stringify(tasksData))
        count.textContent = tasks.length
    })
}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"))

    for(const col in data){
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
            addNewTask(task.title, task.desc, column)
        })

        const tasks = column.querySelectorAll(".task")
        const count = column.querySelector(".right")
        count.innerText = tasks.length
    }
}
