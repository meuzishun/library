const visualLibrary = document.querySelector('.visual-library');
const addBookBtn = document.querySelector('.add-book-btn');
const modal = document.querySelector('.new-book-form');
const modalCloseBtn = document.querySelector('.close-btn');
const submitBtn = document.querySelector('.submit-btn');
const submissionForm = document.querySelector('form');
let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? `read` : `not read yet`}`;
    }
}

function addBookToLibrary(book) {
    library.push(book);
}

// for adding books to HTML
function displayBooks() {
    visualLibrary.textContent = '';

    library.forEach(book => {
        const bookContainer = document.createElement('div');
        const bookInfo = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        const statusButton = document.createElement('button');

        bookContainer.classList.add('book-container');
        bookInfo.classList.add('book-info');
        bookTitle.classList.add('title');
        bookAuthor.classList.add('author');
        bookPages.classList.add('pages');
        statusButton.classList.add('status');

        bookTitle.textContent = book.title;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Length: ${book.pages} pages`;
        statusButton.textContent = `Mark as Read`;

        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);

        bookContainer.appendChild(bookInfo);
        bookContainer.appendChild(statusButton);

        visualLibrary.appendChild(bookContainer);
    });
}

function handleAddBook() {
    modal.classList.remove('hidden');
}

function handleCloseForm() {
    modal.classList.add('hidden');
}

function handleBookSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const elements = [...form.elements].filter(elem => elem.type !== "submit");
    console.log(elements);

    const values = elements.map(elem => {
        if (elem.type === "text" || elem.type === "number") {
            if (elem.value) return elem.value;
        }
        if (elem.type === "checkbox") {
            return elem.checked;
        }
    });
    console.log(values);

    const [title, author, pages, read] = values;

    if (!title || !author || !pages) {
        alert('Please enter all fields');
    } else {
        const bookToBeAdded = new Book(title, author, pages, read);
        addBookToLibrary(bookToBeAdded);
        displayBooks();
        modal.classList.add('hidden');
        elements.forEach(elem => {
            if (elem.type === 'text' || elem.type === 'number') {
                elem.value = '';
            }
            if (elem.type === 'checkbox') {
                elem.checked = false;
            }
        });
    }
}

addBookBtn.addEventListener('click', handleAddBook);
modalCloseBtn.addEventListener('click', handleCloseForm);
submissionForm.addEventListener('submit', handleBookSubmit);


function test() {
    const hp1 = new Book('Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', 223, false);
    addBookToLibrary(hp1);
    const hp2 = new Book('Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 251, false);
    addBookToLibrary(hp2);
    const hp3 = new Book('Harry Potter and the Prisoner of Azkaban', 'J. K. Rowling', 317, false);
    addBookToLibrary(hp3);
    displayBooks();
}

test();