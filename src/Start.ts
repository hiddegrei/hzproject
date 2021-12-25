document.getElementById('start-btn').addEventListener('click', start);
function start(param: any) {
    let username=document.querySelector<HTMLInputElement>('input[id="username"]')?.value;
    let password=document.querySelector<HTMLInputElement>('input[id="password"]')?.value;
    let repeatPassword=document.querySelector<HTMLInputElement>('input[id="repeatPassword"]')?.value;

    let myStorage = window.localStorage;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    console.log(localStorage.getItem('username'));
    console.log(localStorage.getItem('password'));
}