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
    const elements = [...form.elements];
    const values = elements.map(elem => elem.value);
    console.log(values);
}

addBookBtn.addEventListener('click', handleAddBook);
modalCloseBtn.addEventListener('click', handleCloseForm);
// submitBtn.addEventListener('click', handleBookSubmit);
submissionForm.addEventListener('submit', handleBookSubmit);
console.log(submissionForm);
