let form = document.querySelector('form');;
let ul = document.querySelector('ul');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let newInstruction = document.querySelector('#new-instruction').value.trim();
    if (newInstruction) {
        let li = document.createElement('li');
        li.textContent = newInstruction;
        ul.appendChild(li);
        document.querySelector('#new-instruction').value = '';
    }
});
