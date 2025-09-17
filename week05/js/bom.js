const button = document.querySelector('button');
const input = document.querySelector('#favchap');
const list = document.querySelector('ul');

function getChapterList() {
    const raw = localStorage.getItem('myFavBOMList');
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}


function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function displayList(item) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteButton = document.createElement('button');

    span.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');

    li.append(span, deleteButton);
    list.append(li);
}

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => displayList(chapter));

button.addEventListener('click', function (e) {
    const val = input.value.trim();
    if (val !== '') {
        chaptersArray.push(val);
        setChapterList();
        displayList(val);
        input.value = '';
        input.focus();
    } else {
        alert('Please enter a book and chapter.');
        input.focus();
    }
});


list.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        const li = e.target.parentNode;
        const name = li.querySelector('span').textContent;
        chaptersArray = chaptersArray.filter(item => item !== name);
        setChapterList();
        list.removeChild(li);
        input.focus();
    }
});



