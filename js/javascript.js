const container = document.createElement('div');
const form = document.createElement('form')
const input = document.createElement('input');
form.appendChild(input);
container.appendChild(form);

let myLibrary = [
  {
    title: "Harry Potter",
    author: "J.K Rowling",
    pages: "400",
    read: "already read"
  },
  {
    title: "Pokemon",
    author: "Ash",
    pages: "200",
    read: "not yet read"
  },
  {
    title: "Digimon",
    author: "Taichi",
    pages: "100",
    read: "already read"
  }
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
    return this.title + ' ' + this.author + ' ' + this.pages + ' ' + this.read; 
  }

const newBook = new Book('test', 'dog', '400', 'read');

function addBookToLibrary(book) {
    myLibrary.push({...book});
}

addBookToLibrary(newBook);

function render() {}

let test = newBook.info()
console.log(test);

const oldBook = new Book('oldtest', 'olddog', '400', 'read');

addBookToLibrary(oldBook);

console.log(oldBook.info());


console.table(myLibrary);
