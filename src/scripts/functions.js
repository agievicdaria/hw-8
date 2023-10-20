import {save, load} from './storage.js';

const STORAGE_KEY = 'tasks';

const myInput = document.getElementById('myInput');
const myUL = document.getElementById('myUL');

//! id для task
let currentId = 0;

//! додаємо хрестик на li
// 1. у функцію використовуємо target
// 2. створюємо текстовий вузол
// 3. додаємо клас
// 4. додаємо текст на спан
// 5. додаємо спан на li
function addCloseButton(target) {
    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    target.appendChild(span);
}

//! створюємо li; додаємо його в інтерфейс (ВФ) і в locale storage (ВФ)
// 1. використовувати trim
// 2. очищуємо input перед введенням
// 3. якщо користувач хоче додати пустий task, виводимо alert
//* 4. викликаємо функцію createLi, що створює li в ul і додає в інтерфейс
//* 5. викликаємо функцію addTaskToStorage
function addNewTask() {
    const task = myInput.value.trim();
    console.log(task);
    myInput.value = '';

    if(task === "") {
        alert('Введіть текст!');
        return
    }
    createLi(task);

    addTaskToStorage(task);
}

//! створюємо li і додаємо в ul і в інтерфейс
// 1. у функцію передаємо текст, статус, id
// 2. статус по замовченням false, а id - currentId
// 3. беремо посилання на li, додаємо на нього текст і id
// 4. якщо task виконаний, то додаємо клас "checked"
// 5. додаємо li в ul
// 6. викликаємо функцію addCloseButton (що додає хрестик на li)
function createLi(text, isDone = false, id = currentId) {
    const liEl = document.createElement('li');
    liEl.textContent = text;
    liEl.dataset.id = id;
    if(isDone) {
        liEl.classList = 'checked';
    }
    myUL.appendChild(liEl);
    addCloseButton(liEl)
}

//! змінюємо статус а). при зміні task виконано/не виконано; б). при видаленні за допомогою хрестика
// 1. у функції використовуємо target
//* 2. створюємо константу для виклику функції load(яка отримує дані з locale storage)
// 3.1 якщо натискаємо на li, то додаємо або видаляємо клас "checked"
// 3.2. знаходимо індекс того task, на який ми натиснули (використовувати dataset)
// 3.3. змінюємо статус на протилежний у цього task
// 4.1 якщо натиснули на хрестик (перевіряти умову через клас хрестика), видаляємо task
// 4.2 знаходимо індекс li, на хрестик якого ми натисули (використовувати parentNode і dataset)
// 4.3 видаляємо task з locale storage через константу, що створили в п. 2
//* 5. виклакаємо функцію save, куди передаємо константу з п. 2
function handleTaskBehavior({target}) {
    const currentState = load(STORAGE_KEY);
    if(target.nodeName === 'LI') {
        target.classList.toggle('checked');
        const taskIndex = currentState.findIndex(task => Number(task.id) === Number(target.dataset.id));
        currentState[taskIndex].isDone = !currentState[taskIndex].isDone;
    } else if(target.classList.contains('close')) {
        target.parentNode.remove();
        const taskIndex = currentState.findIndex(task => Number(task.id) === Number(target.parentNode.dataset.id));
        currentState.splice(taskIndex, 1)
    }
    save(STORAGE_KEY, currentState)
}

//! створюємо об'єкт, що будемо додавати в locale storage
// 1. у функцію передаємо текст і статус
// 2. повертаємо текст, статус і id
// 3. в id передаємо currentId
function createTaskObj(text, isDone) {
    return {
        text,
        isDone, 
        id: currentId,
    }
}

//! додаємо масив в local storage або створюємо і додаємо новий
// 1. у функцію передаємо текст і статус
// 2. статус по замовченню false
//* 3. створюємо константу виклику функції load (яка отримує дані з locale storage)
// 4.1. якщо масив в locale storage пустий, то створюємо масив і додаємо туди перший об'єкт задачі
//* 4.2 викликаємо функцію save і передаємо туди новостворений масив
//* 5.1 якщо масив уже є, то додаємо туди результат виклику функції createTaskObj (яка створює об'єкт, 
// що будемо додавати в locale storage), з аргументами текст і статус
//* 5.2 викликаємо функцію save і передаємо туди константу з п. 3
// 6. збільшуємо currentId на 1
function addTaskToStorage(text, isDone = false) {
    const currentState = load(STORAGE_KEY);

    if(currentState === undefined) {
        // створюємо масив і додаємо туди перший об'єкт задачі
        const arr = [createTaskObj(text, isDone)];
        save(STORAGE_KEY, arr);
    } else {
        // до вже існуючого масиву додати новий об'єкт задачі
        currentState.push(createTaskObj(text, isDone));
        save(STORAGE_KEY, currentState);
    }
    currentId += 1; 
}

//! заповнюємо інтерфейс після завантаження сторінки
//* 1. створюємо константу для виклику функції load
// 2. якщо в locale storage є непустий масив, то перебираємо цей масив і викликаємо функцію createLi, що створює li і додає в ul і в інтерфейс
// 2(пояснення). 1). перевіряємо на те, що константа з п. 1 не дорівнює undefined
//               2). перебираємо методом forEach, куди пеедаємо текст, статус і id і отримуємо результат виклику функції createLi, куди передаємо текст, статус і id
// 3. currentId являє собою id збільшений на 1
function fillTasksList() {
    const currentState = load(STORAGE_KEY);

    if(currentState !== undefined) {
    currentState.forEach(({text, isDone, id}) => {createLi(text, isDone, id);
    currentId = id + 1;
    })
}
}

export {addNewTask, handleTaskBehavior, fillTasksList}