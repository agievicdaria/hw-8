const e=(e,t)=>{try{const n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.log("Stringify error",e.message)}},t=e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.log("Parse error!!",e.message)}},n=document.getElementById("myInput"),s=document.getElementById("myUL");
//! id для task
let o=0;
//! додаємо хрестик на li
//! створюємо li і додаємо в ul і в інтерфейс
function c(e,t=!1,n=o){const c=document.createElement("li");c.textContent=e,c.dataset.id=n,t&&(c.classList="checked"),s.appendChild(c),function(e){const t=document.createElement("span"),n=document.createTextNode("×");t.className="close",t.appendChild(n),e.appendChild(t)}
//! створюємо li; додаємо його в інтерфейс (ВФ) і в locale storage (ВФ)
(c)}
//! змінюємо статус а). при зміні task виконано/не виконано; б). при видаленні за допомогою хрестика
//! створюємо об'єкт, що будемо додавати в locale storage
function d(e,t){return{text:e,isDone:t,id:o}}
//! додаємо масив в local storage або створюємо і додаємо новий
const a=document.getElementById("addBtn"),i=document.getElementById("myUL");a.addEventListener("click",(function(){const s=n.value.trim();console.log(s),n.value="",""!==s?(c(s),function(n,s=!1){const c=t("tasks");if(void 0===c){const t=[d(n,s)];e("tasks",t)}else c.push(d(n,s)),e("tasks",c);o+=1}
//! заповнюємо інтерфейс після завантаження сторінки
(s)):alert("Введіть текст!")})),i.addEventListener("click",(function({target:n}){const s=t("tasks");if("LI"===n.nodeName){n.classList.toggle("checked");const e=s.findIndex((e=>Number(e.id)===Number(n.dataset.id)));s[e].isDone=!s[e].isDone}else if(n.classList.contains("close")){n.parentNode.remove();const e=s.findIndex((e=>Number(e.id)===Number(n.parentNode.dataset.id)));s.splice(e,1)}e("tasks",s)})),
//! додаємо подію під час завантаження сторінки і завантаження DOM
window.addEventListener("DOMContentLoaded",(function(){const e=t("tasks");void 0!==e&&e.forEach((({text:e,isDone:t,id:n})=>{c(e,t,n),o=n+1}))}));
//# sourceMappingURL=index.edd8cebe.js.map
