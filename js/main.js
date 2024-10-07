const form = document.querySelector('#form');
const input = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector('#emptyList');


let tasks = [];


if(localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => renderTask(task)); //Рендерим задачи из LocalStorage на странице
}


// Проверяем есть ли данные в списке задач
checkEmpyList();


form.addEventListener("submit", addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);


function addTask(event){
    event.preventDefault();

    const inputText = input.value;
    
    // Создаем класс для каждой задачи
    const newTask = {
        id: Date.now(),
        text: inputText,
        done: false
    };

    // Добавляем новую задачу в список задач
    tasks.push(newTask);

    // Сохраняем список задач в хранилище браузера LocalStorage
    saveToLocalStorage();

    //Рендерим задачу на странице
    renderTask(newTask);

    // Очищаем строку input
    input.value = '';
    input.focus();

    // Проверяем пустой ли список задач
    checkEmpyList();

}


function deleteTask(event){
    // Проверяем нажата ли кнопка delete
    if(event.target.dataset.action !== "delete") return;

    const parentNode = event.target.closest(".list-group-item");

    // Определеям ID задачи
    const id = Number(parentNode.id);

    // Производим фильтрацию списка задач
    tasks = tasks.filter((task) => task.id !== id);

    // Сохраняем список задач в хранилище браузера LocalStorage
    saveToLocalStorage();

    parentNode.remove();

    // Проверяем наличие элементов в списке задач
    checkEmpyList();
}


function doneTask(event){
    // Проверяем нажата ли кнопка done
    if(event.target.dataset.action !== "done") return;

    const parentNode = event.target.closest(".list-group-item");


    //Определяем ID задачи
    const id = Number(parentNode.id);

    // Находим элемент списка по id
    const task = tasks.find((task) => task.id === id); 

    // Изменяем значение done 
    task.done = !task.done;

    // Сохраняем список задач в хранилище браузера LocalStorage
    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle("task-title--done");
}   


function checkEmpyList(){
    // Если список задач пуст, то выводим окно на экран
    if(tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
        
        tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
    }

    // Если в списке задач есть данные, то удаляем окно.
    if(tasks.length > 0){
        const emptyListElement =  document.querySelector('#emptyList');   
        emptyListElement ? emptyListElement.remove() : null;
    }
}


function saveToLocalStorage(){
    // Устанавливаем значени в хранилище браузера LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTask(task){
    // Формируем css класс    
    const cssClass = (task.done)? 'task-title task-title--done': 'task-title'; 

    // Формируем разметку для новой задачи
    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    // Добавляем разметку новой задачт в HTML
    tasksList.insertAdjacentHTML('beforeend', taskHTML);  
}






























































