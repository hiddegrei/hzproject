document.getElementById('start-btn').addEventListener('click', start);
function start(param: any) {  
    console.log(`Username: ${document.querySelector<HTMLInputElement>('input[name="username"]').value}\n
                 Password: ${document.querySelector<HTMLInputElement>('input[name="password"]').value}`);
      
    let username=document.querySelector<HTMLInputElement>('input[name="username"]').value     
    let pass=document.querySelector<HTMLInputElement>('input[name="password"]').value

    let myStorage = window.localStorage;
    localStorage.setItem('username', username)
    localStorage.setItem('password', pass)
    window.location.href = `./?
    username=${document.querySelector<HTMLInputElement>('input[name="username"]').value}&
    password=${document.querySelector<HTMLInputElement>('input[name="password"]').value}`;
}