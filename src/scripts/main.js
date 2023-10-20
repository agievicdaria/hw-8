import {addNewTask, handleTaskBehavior, fillTasksList} from './functions.js';

const addBtn = document.getElementById('addBtn');
const myUL = document.getElementById('myUL');

addBtn.addEventListener('click', addNewTask);
myUL.addEventListener('click', handleTaskBehavior );
 
//! додаємо подію під час завантаження сторінки і завантаження DOM
window.addEventListener('DOMContentLoaded', fillTasksList);