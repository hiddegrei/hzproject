document.getElementById('start-btn').addEventListener('click', start);
function start(param) {
    console.log(`Username: ${document.querySelector('input[name="username"]').value}\n
                 Password: ${document.querySelector('input[name="password"]').value}`);
    let username = document.querySelector('input[name="username"]').value;
    let pass = document.querySelector('input[name="password"]').value;
    let myStorage = window.localStorage;
    localStorage.setItem('username', username);
    localStorage.setItem('password', pass);
}
//# sourceMappingURL=Start.js.map