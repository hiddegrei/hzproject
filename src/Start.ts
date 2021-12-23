document.getElementById('start-btn').addEventListener('click', start);
function start(param: any) {
    let username = document.querySelector<HTMLInputElement>('input[id="username"]').value;
    let password = document.querySelector<HTMLInputElement>('input[id="password"]').value;
   
    
    let myStorage = window.localStorage;
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
}