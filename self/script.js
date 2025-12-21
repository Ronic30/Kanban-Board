const addTask = document.querySelector(".new-task")
const submitTask = document.querySelector(".submit")
const aboutTask = document.querySelector(".task")


addTask.addEventListener("click", () => {
    aboutTask.style.display = "flex"
})

submitTask.addEventListener("click", () => {
    aboutTask.style.display = "none"
})