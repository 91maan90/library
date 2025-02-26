const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
};

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function toggleBookRead(index) {
    myLibrary[index].toggleRead();
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    displayBooks();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks() {
    const booksElement = document.querySelector('#books');
    booksElement.innerHTML = ''; // Clear the current content

    myLibrary.forEach((book, index) => {
        // Create card element
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Create title element
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = book.title;

        // Create author element
        const cardSubtitle = document.createElement('h6');
        cardSubtitle.classList.add('card-subtitle', 'mb-2', 'text-body-secondary');
        cardSubtitle.textContent = book.author;

        // Create pages element
        const pages = document.createElement('p');
        pages.classList.add('card-text');
        pages.textContent = `${book.pages} pages`;

        // Create read status checkbox
        const readCheckboxDiv = document.createElement('div');
        readCheckboxDiv.classList.add('form-check');

        const readCheckbox = document.createElement('input');
        readCheckbox.type = 'checkbox';
        readCheckbox.classList.add('form-check-input');
        readCheckbox.id = `read-${book.title.replace(/\s+/g, '-')}`;
        readCheckbox.checked = book.read;
        readCheckbox.onclick = () => toggleBookRead(index);

        const readLabel = document.createElement('label');
        readLabel.classList.add('form-check-label');
        readLabel.setAttribute('for', readCheckbox.id);
        readLabel.textContent = 'Read';

        readCheckboxDiv.appendChild(readCheckbox);
        readCheckboxDiv.appendChild(readLabel);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'mt-3');
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = () => removeBookFromLibrary(index);

        // Append elements to card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardSubtitle);
        cardBody.appendChild(pages);
        cardBody.appendChild(readCheckboxDiv);
        cardBody.appendChild(deleteButton);

        // Append card body to card
        card.appendChild(cardBody);

        // Append card to books element
        booksElement.appendChild(card);
    });
}

// Example usage
addBookToLibrary('The Bible', 'many people', 999, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Moby Dick", "Herman Melville", 585, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);

displayBooks();

// Handle form submission
document.getElementById('newBookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    // Add book to library
    addBookToLibrary(title, author, pages, read);

    // Clear form
    document.getElementById('newBookForm').reset();
});
