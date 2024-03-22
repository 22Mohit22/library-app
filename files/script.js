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


let library = {
    mylibrary: [
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
    ]
}


class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }

    check_checkBox() {
        return true ? checkboxEl.checked : false;
    }

    createBook() {
        const book = new Book(titleEl.value, authorEl.value, pagesEl.value, mybook.check_checkBox(), library.mylibrary.length+ 1);
        return book;
    }

    addBookTolibrary() {
        library.mylibrary.push(this.createBook());
    }

    

    appendBookToDisplay() {
        this.addBookTolibrary();
        addBookToDisplay(library.mylibrary[library.mylibrary.length - 1]);
    }

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

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(titleEl.value.trim() != '' 
    && authorEl.value.trim() != '' 
    && pagesEl.value.trim() != '') {
        mybook.appendBookToDisplay();
        titleEl.value = '';
        authorEl.value = '';
        pagesEl.value = '';
        checkboxEl.checked = false;
        dialog.close()
    } else {
        alert('please fill all the required elements');
    }
})

addNewBookBtn.addEventListener('click', () => {
    dialog.showModal();
})

closeBtn.addEventListener('click', () => {
    dialog.close();
})

booksContainer.addEventListener('click', (e) => {
    const bookCard = e.target.closest('.book-card');
    const displayid = bookCard.getAttribute('data');
    const indexOfBook = library.mylibrary.findIndex(book => book.id == displayid);
    const book = library.mylibrary[indexOfBook];
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
            library.mylibrary.splice(indexOfBook, 1);
            bookCard.remove();
        }
    }
})

let mybook = new Book();
library.mylibrary.forEach(book => {
    addBookToDisplay(book);
})