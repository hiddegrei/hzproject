document.getElementById('start-btn').addEventListener('click', start);
function start(param) {
    let username = document.querySelector('input[name="username"]').value;
    let password = document.querySelector('input[name="password"]').value;
    if (username === '' && password === '') {
        alert("Voer een gebruikersnaam en wachtwoord in!");
    }
    else if (username === '') {
        alert("Voer een gebruikersnaam in!");
    }
    else if (password === '') {
        alert("Voer een wachtwoord in!");
    }
    else {
        window.location.href = `./?username=${username}&password=${password}`;
    }
    let myStorage = window.localStorage;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}
//# sourceMappingURL=Start.js.map