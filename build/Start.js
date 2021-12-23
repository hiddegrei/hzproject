document.getElementById('start-btn').addEventListener('click', start);
function start(param) {
    let username = document.querySelector('input[id="username"]').value;
    let password = document.querySelector('input[id="password"]').value;
    let repeatPassword = document.querySelector('input[id="repeatPassword"]').value;
    if (username === '' && password === '' || username === '' && repeatPassword === '') {
        alert("Voer een gebruikersnaam en wachtwoord in!");
    }
    else if (username === '') {
        alert("Voer een gebruikersnaam in!");
    }
    else if (password === '' || repeatPassword === '') {
        alert("Voer een wachtwoord in!");
    }
    else if (password === repeatPassword) {
        window.location.href = `./start.html?username=${username}&password=${password}`;
        let myStorage = window.localStorage;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    }
    else {
        alert("Wachtwoorden komen niet overeen!");
    }
}
//# sourceMappingURL=Start.js.map