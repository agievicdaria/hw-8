!function(){var e=function(e,t){try{var n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.log("Stringify error",e.message)}},t=function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.log("Parse error!!",e.message)}},n="tasks",o=document.getElementById("myInput"),a=document.getElementById("myUL"),i=0;
//! додаємо хрестик на li
function d(e){var t=document.createElement("span"),n=document.createTextNode("×");t.className="close",t.appendChild(n),e.appendChild(t)}
//! створюємо li; додаємо його в інтерфейс (ВФ) і в locale storage (ВФ)
//! створюємо li і додаємо в ul і в інтерфейс
function r(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i,o=document.createElement("li");o.textContent=e,o.dataset.id=n,t&&(o.classList="checked"),a.appendChild(o),d(o)}
//! змінюємо статус а). при зміні task виконано/не виконано; б). при видаленні за допомогою хрестика
//! створюємо об'єкт, що будемо додавати в locale storage
function c(e,t){return{text:e,isDone:t,id:i}}
//! додаємо масив в local storage або створюємо і додаємо новий
var s=document.getElementById("addBtn"),l=document.getElementById("myUL");s.addEventListener("click",(function(){var a=o.value.trim();console.log(a),o.value="",""!==a?(r(a),function(o){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],d=t(n);if(void 0===d){var r=[c(o,a)];e(n,r)}else d.push(c(o,a)),e(n,d);i+=1}
//! заповнюємо інтерфейс після завантаження сторінки
(a)):alert("Введіть текст!")})),l.addEventListener("click",(function(o){var a=o.target,i=t(n);if("LI"===a.nodeName){a.classList.toggle("checked");var d=i.findIndex((function(e){return Number(e.id)===Number(a.dataset.id)}));i[d].isDone=!i[d].isDone}else if(a.classList.contains("close")){a.parentNode.remove();var r=i.findIndex((function(e){return Number(e.id)===Number(a.parentNode.dataset.id)}));i.splice(r,1)}e(n,i)})),
//! додаємо подію під час завантаження сторінки і завантаження DOM
window.addEventListener("DOMContentLoaded",(function(){var e=t(n);void 0!==e&&e.forEach((function(e){var t=e.text,n=e.isDone,o=e.id;r(t,n,o),i=o+1}))}))}();
//# sourceMappingURL=index.198795ea.js.map
