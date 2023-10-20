//! функція, що зберігає дані в locale storage
// 1. у функцію передаємо ключ і значення
// 2. привести до JSON
// 3. використовувати try ... catch
export const save = (key, value) => {
    try {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data)
    } catch(error) {
        console.log('Stringify error', error.message);
    }
}

//! функція, що отримує дані з locale storage
// 1. у функцію передаємо ключ
// 2. перевіряємо, чи приходить null, чи дані; якщо дані - парсимо їх; якщо null - перетворюємо його на undefined
// 3. використовувати try ... catch
export const load = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data === null ? undefined : JSON.parse(data);
    } catch(error) {
        console.log('Parse error!!', error.message);
    }
} 