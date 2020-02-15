const container = document.querySelector(".container");
const bookForm = document.getElementById("book-form");

let myLibrary = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K Rowling",
    pages: "309",
    read: "Read"
  },
  {
    title: "Yakusoku no Neverland Vol. 1",
    author: "Shirai Kaiu",
    pages: "200",
    read: "Read"
  },
  {
    title: "Naruto Vol. 42",
    author: "Kishimoto Masashi",
    pages: "187",
    read: "Not Yet"
  }
];

console.table(myLibrary);
render(myLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return this.title + " " + this.author + " " + this.pages + " " + this.read;
};

function addBookToLibrary(book) {
  myLibrary.push({ ...book });
}

bookForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const title = bookForm.querySelector('input[id="title"]').value;
  const author = bookForm.querySelector('input[id="author"]').value;
  const pages = bookForm.querySelector('input[id="pages"]').value;
  const read = bookForm.querySelector('input[type="radio"]:checked').value;
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  //console.table(myLibrary);
  render(myLibrary);
});

function render(myLibrary) {
  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);
    const cardTitle = document.createElement('p');
    cardTitle.innerHTML = `Book: ${book.title}`;
    card.appendChild(cardTitle);
    const cardAuthor = document.createElement('p');
    cardAuthor.innerHTML = `Author: ${book.author}`;
    card.appendChild(cardAuthor);
    const cardPages = document.createElement('p');
    cardPages.innerHTML = `Pages: ${book.pages}`;
    card.appendChild(cardPages);
    const cardRead = document.createElement('p');
    cardRead.innerHTML = `Read Status: ${book.read}`;
    card.appendChild(cardRead);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "delete";
    deleteBtn.addEventListener('click', function(event) {
      console.log('i was clicked');
    });
    card.appendChild(deleteBtn);
    console.log(book);
  });
}

function deleteCard(){

}
