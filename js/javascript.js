"use strict"
const container = document.querySelector(".container");
const bookForm = document.getElementById("book-form");
const addBtn = document.getElementById("add-book");

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
    read: "Unread"
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
  render(myLibrary);
  bookForm.reset();
});

function render(myLibrary) {
  myLibrary.forEach(function(book, index) {
    const cardExists = document.querySelector(`div[data-value="${index}"]`);
    if (!cardExists) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("on-display");
      book.id = index;
      card.dataset.value = index;
      container.appendChild(card);
      const cardTitle = document.createElement("p");
      cardTitle.innerHTML = `Book: ${book.title}`;
      card.appendChild(cardTitle);
      const cardAuthor = document.createElement("p");
      cardAuthor.innerHTML = `Author: ${book.author}`;
      card.appendChild(cardAuthor);
      const cardPages = document.createElement("p");
      cardPages.innerHTML = `Pages: ${book.pages}`;
      card.appendChild(cardPages);
      book.read == "Read"
        ? card.classList.add("read")
        : card.classList.add("not-read");
      const readBtn = document.createElement("button");
      book.read == "Read"
        ? (readBtn.innerHTML = "Read")
        : (readBtn.innerHTML = "Unread");
      card.appendChild(readBtn);
      readBtn.addEventListener("click", () => {
        changeStatus(event.target.parentNode);
      });
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "delete";
      card.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", () => {
        deleteCard(event.target.parentNode, index);
      });
    }
    console.table(myLibrary);
  });
}

addBtn.addEventListener("click", () => {
  console.log("I was clicked");
  bookForm.style.display === "none"
    ? (bookForm.style.display = "block")
    : (bookForm.style.display = "none");
});

function deleteCard(card) {
  container.removeChild(card);
  myLibrary.forEach(function(book, index) {
    if (book.id == card.dataset.value) {
      console.log(index);
      myLibrary.splice(index, 1);
    }
  });
  console.table(myLibrary);
}

function getId(card) {
  let indexValue = 0;
  myLibrary.forEach(function(book, index) {
    if (book.id == card.dataset.value) {
      indexValue = index;
    }
  });
  return indexValue;
}

function changeStatus(card) {
  const index = getId(card);
  if (card.classList.contains("read")) {
    card.classList.remove("read");
    card.classList.add("not-read");
    myLibrary[index]["read"] = "Unread";
    event.target.innerHTML = "Unread";
  } else {
    card.classList.remove("not-read");
    card.classList.add("read");
    myLibrary[index]["read"] = "Read";
    event.target.innerHTML = "Read";
  }
  console.table(myLibrary);
}
