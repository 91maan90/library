function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
    };
}

const book = new Book('The Bible', 'many people', 999, false);

console.log(book.info());
console.log(Object.getPrototypeOf(book) === Book.prototype);