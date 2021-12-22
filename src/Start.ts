document.getElementById('start-btn').addEventListener('click', start);
function start(param: any) {  
    console.log(`Username: ${document.querySelector<HTMLInputElement>('input[name="username"]').value}\n
                 Password: ${document.querySelector<HTMLInputElement>('input[name="password"]').value}`);
    window.location.href = `./?
    username=${document.querySelector<HTMLInputElement>('input[name="username"]').value}&
    password=${document.querySelector<HTMLInputElement>('input[name="password"]').value}`;
}