const button = document.querySelector('button');
const input = document.querySelector('#favchap');
const list = document.querySelector('ul');



button.addEventListener('click', function (e) {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');


        li.textContent = input.value;
        deleteButton.textContent = '❌';

        li.append(deleteButton);
        list.append(li);


        input.value = '';
        input.focus();
    } else {
        alert('Please enter a book and chapter.');
        input.focus();
    }

});

list.addEventListener('click', function (e) {
    if (e.target.textContent === '❌') {
        list.removeChild(e.target.parentNode);
        input.focus();
    }
});

