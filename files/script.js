let myLibrary = [
    {
        id: 0,
        title: 'Ashtavakra Geeta',
        author: 'Ashtavakra',
        pages: 120,
        read: false
    },
    {
        id: 1,
        title: 'Bhagwat Geeta',
        author: 'Krishna Dwaipan',
        pages: 840,
        read: true
    },
    {
        id: 2,
        title: 'Ram Charit Manas ',
        author: 'Tulisdas',
        pages: 4560,
        read: false
    },
    {
        id: 3,
        title: 'Mahabharat',
        author: 'Krishna Dwaipan',
        pages: 15000,
        read: false
    },
];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // true or false
    this.id = id;
}


const formEl = document.querySelector('form');
const titleEl = document.getElementById('book-title');
const authorEl = document.getElementById('book-author');
const pagesEl = document.getElementById('book-pages');
const checkboxEl = document.getElementById('book-read');
const submitBtn = document.getElementById('form-btn');

const booksContainer = document.querySelector('.books');

const addNewBookBtn = document.getElementById('addNewBook');
const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('#close-btn');



function check_checkbox() {
    return true ? checkboxEl.checked : false;
}


function createBook() {
    const book = new Book(titleEl.value, authorEl.value, pagesEl.value, check_checkbox(), myLibrary.length+ 1);
    return book;
}

function addBookToLibrary() {
    myLibrary.push(createBook());
}

function addBookToDisplay(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data', book.id);

    const nameContainer = document.createElement('div');
    nameContainer.className = 'name-container';

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = `${book.title}`;

    const bookAuthor = document.createElement('p');
    bookAuthor.className = 'author';
    bookAuthor.textContent = `-${book.author}`;

    const btnContainer = document.createElement('div');
    btnContainer.className = 'btns-container';

    const readBtn = document.createElement('button');
    readBtn.className = 'mark-read';
    readBtn.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.innerHTML = 'Delete';


    bookCard.appendChild(nameContainer);
    bookCard.appendChild(btnContainer);
    nameContainer.appendChild(bookTitle);
    nameContainer.appendChild(bookAuthor);
    btnContainer.appendChild(readBtn);
    btnContainer.appendChild(delBtn);
    booksContainer.appendChild(bookCard);
}

function appendBookToDisplay() {
    addBookToLibrary();
    addBookToDisplay(myLibrary[myLibrary.length - 1]);
}


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(titleEl.value.trim() != '' 
    && authorEl.value.trim() != '' 
    && pagesEl.value.trim() != '') {
        appendBookToDisplay();
        dialog.close()
    } else {
        console.log('please fill all the required elements');
    }
})


addNewBookBtn.addEventListener('click', () => {
    dialog.showModal();
})

closeBtn.addEventListener('click', () => {
    dialog.close();
})



myLibrary.forEach(book => {
    addBookToDisplay(book);
})

booksContainer.addEventListener('click', (e) => {
    const bookCard = e.target.closest('.book-card');
    const displayid = bookCard.getAttribute('data');
    const indexOfBook = myLibrary.findIndex(book => book.id == displayid);
    const book = myLibrary[indexOfBook];
    const readStatus = book.read;

    if(e.target.classList.contains('mark-read')) {
        book.read = !readStatus;

        if(book.read){
            e.target.textContent = 'Mark as Unread';
        } else {
            e.target.textContent = 'Mark as Read';
        }
        
    } else if(e.target.classList.contains('del-btn')) {
        
        if(indexOfBook != -1) {
            myLibrary.splice(indexOfBook, 1);
            bookCard.remove();
        }
    }
})

