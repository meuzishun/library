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

function appendChildren(container, childrenArray) {
    childrenArray.forEach(child => {
        container.appendChild(child);
    });
}

// for adding books to HTML
function displayBooks() {
    visualLibrary.textContent = '';

    library.forEach(book => {
        const bookInfo = createCustomElement('div', 'book-info');
        const bookTitle = createCustomElement('p', 'title', book.title);
        const bookAuthor = createCustomElement('p', 'author', book.author);
        const bookPages = createCustomElement('p', 'pages', book.pages);
        appendChildren(bookInfo, [bookTitle, bookAuthor, bookPages]);
        
        const btnContainer = createCustomElement('div', 'btn-container');
        const statusBtn = createCustomElement('button', 'status', 'Mark as Read', 'click', handleStatusBtn);
        const removeBtn = createCustomElement('button', 'remove', 'Remove', 'click', handleRemoveBtn);
        appendChildren(btnContainer, [statusBtn, removeBtn]);
        
        const bookContainer = createCustomElement('div', 'book-container');
        appendChildren(bookContainer, [bookInfo, btnContainer]);

        visualLibrary.appendChild(bookContainer);
    });
}

function handleAddBook() {
    modal.classList.remove('hidden');
}

function handleCloseForm() {
    modal.classList.add('hidden');
}

function handleStatusBtn(evt) {}

function handleRemoveBtn(evt) {
    console.log(evt);
}

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