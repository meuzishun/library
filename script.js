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

function createBookContainer() {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');
    return bookContainer;
}

function createBtnContainer() {
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    return btnContainer;
}

function createBookInfo() {
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    return bookInfo;
}

function createBookTitle(text) {
    const bookTitle = document.createElement('p');
    bookTitle.classList.add('title');
    bookTitle.textContent = text;
    return bookTitle;
}

function createBookAuthor(text) {
    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = `Author: ${text}`;
    return bookAuthor;
}

function createBookPages(text) {
    const bookPages = document.createElement('p');
    bookPages.classList.add('pages');
    bookPages.textContent = `Length: ${text} pages`;
    return bookPages;
}

function createStatusBtn() {
    const statusBtn = document.createElement('button');
    statusBtn.classList.add('status');
    statusBtn.textContent = `Mark as Read`;
    statusBtn.addEventListener('click', handleStatusBtn);
    return statusBtn;
}

function createRemoveBtn() {
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.textContent = `Remove`;
    removeBtn.addEventListener('click', handleRemoveBtn);
    return removeBtn;
}

function createCustomElement(elem, cl, txt, evt, cb) {
    const markup = document.createElement(elem);
    markup.classList.add(cl);
    if (txt) {
        markup.textContent = txt;
    }
    if (evt && cb) {
        markup.addEventListener(evt, cb);
    }
    return markup;
}

// for adding books to HTML
function displayBooks() {
    visualLibrary.textContent = '';

    library.forEach(book => {
        // const bookContainer = createBookContainer();
        const bookContainer = createCustomElement('div', 'book-container');
        // const bookInfo = createBookInfo();
        const bookInfo = createCustomElement('div', 'book-info');
        const btnContainer = createCustomElement('div', 'btn-container');
        
        // const bookTitle = createBookTitle(book.title);
        const bookTitle = createCustomElement('p', 'title', book.title);
        // const bookAuthor = createBookAuthor(book.author);
        const bookAuthor = createCustomElement('p', 'author', book.author);
        // const bookPages = createBookPages(book.pages);
        const bookPages = createCustomElement('p', 'pages', book.pages);

        // const statusBtn = createStatusBtn();
        const statusBtn = createCustomElement('button', 'status', 'Mark as Read', handleStatusBtn);
        // const removeBtn = createRemoveBtn();
        const removeBtn = createCustomElement('button', 'remove', 'Remove', handleRemoveBtn);

        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);

        btnContainer.appendChild(statusBtn);
        btnContainer.appendChild(removeBtn);

        bookContainer.appendChild(bookInfo);
        bookContainer.appendChild(btnContainer);

        visualLibrary.appendChild(bookContainer);
    });
}

function handleAddBook() {
    modal.classList.remove('hidden');
}

function handleCloseForm() {
    modal.classList.add('hidden');
}

function handleStatusBtn() {}

function handleRemoveBtn() {}

function handleBookSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const elements = [...form.elements].filter(elem => elem.type !== "submit");
    console.log(elements);

    const [title, author, pages, read] = elements.map(elem => {
        if (elem.type === "text" || elem.type === "number") {
            if (elem.value) return elem.value;
        }
        if (elem.type === "checkbox") {
            return elem.checked;
        }
    });

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