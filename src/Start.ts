document.getElementById('start-btn').addEventListener('click', start);
<<<<<<< HEAD
function start(param: any) {
    let username = document.querySelector<HTMLInputElement>('input[name="username"]').value;
    let password = document.querySelector<HTMLInputElement>('input[name="password"]').value;
    if (username === '' && password === '') {
        alert("Voer een gebruikersnaam en wachtwoord in!");
    } else if (username === '') {
        alert("Voer een gebruikersnaam in!");
    } else if (password === '') {
        alert("Voer een wachtwoord in!");
    } else {
        window.location.href = `./?username=${username}&password=${password}`;
    }
=======
function start(param: any) {  
    console.log(`Username: ${document.querySelector<HTMLInputElement>('input[name="username"]')?.value}\n
                 Password: ${document.querySelector<HTMLInputElement>('input[name="password"]')?.value}`);
      
    let username=document.querySelector<HTMLInputElement>('input[id="username"]')?.value
    let pass=document.querySelector<HTMLInputElement>('input[id="password"]')?.value

    // console.log(username)

    let myStorage = window.localStorage;
    localStorage.setItem('username', username)
    localStorage.setItem('password', pass)
    // window.location.href = `./?
    // username=${document.querySelector<HTMLInputElement>('input[name="username"]').value}&
    // password=${document.querySelector<HTMLInputElement>('input[name="password"]').value}`;
>>>>>>> 87798c83e21f1c47b4763cb2c4459794a6009b17
}