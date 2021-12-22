document.getElementById('start-btn').addEventListener('click', start);
function start(param) {
    console.log(`Username: ${document.querySelector('input[name="username"]').value}\n
                 Password: ${document.querySelector('input[name="password"]').value}`);
    window.location.href = `./?
    username=${document.querySelector('input[name="username"]').value}&
    password=${document.querySelector('input[name="password"]').value}`;
}
//# sourceMappingURL=Start.js.map