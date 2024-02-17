const mode = document.querySelector('#mode-icon');
const login = document.querySelector('#loginButton');

mode.addEventListener('click', () => {
    const form = document.querySelector('#login-form');
    if (mode.classList.contains('fa-moon')) {
        mode.classList.remove('fa-moon');
        mode.classList.add('fa-sun');
        form.classList.add('dark');
        return;
    }
    mode.classList.add('fa-moon');
    mode.classList.remove('fa-sun');
    form.classList.remove('dark');
});

login.addEventListener('click', (event) => {
    event.preventDefault();
    let user = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#senha').value;

    if (user === "felipe" && email === "felipe@gmail.com" && password === "felipe10") {
        alert('Sucesso!');
        location.href = "income.html";
    } else {
        alert('Digite as informações corretas!!!');
    }
});
