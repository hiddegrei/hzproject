document.getElementById('start-btn').addEventListener('click', start);
function start(param) {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    console.log(`Username: ${document.querySelector('input[name="username"]').value}\n
                 Password: ${document.querySelector('input[name="password"]').value}`);
    let username = document.querySelector('input[name="username"]').value;
    let pass = document.querySelector('input[name="password"]').value;
=======
    console.log(`Username: ${document.querySelector('input[name="username"]')?.value}\n
                 Password: ${document.querySelector('input[name="password"]')?.value}`);
    let username = document.querySelector('input[id="username"]')?.value;
    let pass = document.querySelector('input[id="password"]')?.value;
>>>>>>> 87798c83e21f1c47b4763cb2c4459794a6009b17
    let myStorage = window.localStorage;
    localStorage.setItem('username', username);
    localStorage.setItem('password', pass);
>>>>>>> 0fa9840f56b9933e23de798fd329d1719d88e8ff
}
//# sourceMappingURL=Start.js.map