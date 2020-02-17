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

render(myLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

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
  myLibrary.forEach(book => {
    if (!book.id) {
      let id = uuidv4();
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("on-display");
      book.id = id;
      card.dataset.value = id;
      container.appendChild(card);
      const cardTitleDiv = document.createElement('div');
      cardTitleDiv.classList.add('title');
      const cardTitle = document.createElement("p");
      cardTitle.innerHTML = `Book: ${book.title}`;
      cardTitleDiv.appendChild(cardTitle);
      const cardAuthorDiv = document.createElement("div");
      cardAuthorDiv.classList.add('author');
      const cardAuthor = document.createElement("p");
      cardAuthor.innerHTML = `Author: ${book.author}`;
      cardAuthorDiv.appendChild(cardAuthor);
      const cardPagesDiv = document.createElement("div");
      cardPagesDiv.classList.add('pages');
      const cardPages = document.createElement("p");
      cardPages.innerHTML = `Pages: ${book.pages}`;
      cardPagesDiv.appendChild(cardPages);
      card.appendChild(cardTitleDiv);
      card.appendChild(cardAuthorDiv);
      card.appendChild(cardPagesDiv);
      book.read == "Read"
        ? card.classList.add("read")
        : card.classList.add("not-read");
      const readBtnDiv = document.createElement("div");
      readBtnDiv.classList.add('read-btn')
      const readBtn = document.createElement("button");
      book.read == "Read"
        ? (readBtn.innerHTML = "Read")
        : (readBtn.innerHTML = "Unread");
      readBtnDiv.appendChild(readBtn)
      card.appendChild(readBtnDiv);
      readBtn.addEventListener("click", () => {
        changeStatus(event.target.parentNode);
      });
      const deleteBtnDiv = document.createElement("div");
      const deleteBtn = document.createElement("button");
      deleteBtnDiv.appendChild(deleteBtn)
      card.appendChild(deleteBtnDiv);
      deleteBtn.innerHTML = "x";
      deleteBtnDiv.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", () => {
        deleteCard(event.target.parentNode);
      });
    }
  });
  console.table(myLibrary);

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
      myLibrary.splice(index, 1);
    }
  });
  console.table(myLibrary);
}

function getIndex(card) {
  let indexValue = 0;
  myLibrary.forEach(function(book, index) {
    if (book.id == card.dataset.value) {
      indexValue = index;
    }
  });
  return indexValue;
}

function changeStatus(card) {
  const index = getIndex(card);
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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
