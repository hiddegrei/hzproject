document.getElementById('start-btn').addEventListener('click', start);
function start(param) {
    let username = document.querySelector('input[id="username"]').value;
    let password = document.querySelector('input[id="password"]').value;
    let myStorage = window.localStorage;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}
//# sourceMappingURL=Start.js.map