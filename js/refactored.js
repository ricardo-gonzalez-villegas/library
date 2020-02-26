"use strict";
const container = document.querySelector(".card-container");
const bookForm = document.getElementById("book-form");

let myLibrary = [
  {
    title: "The Promised Neverland Vol. 1",
    author: "Shirai Kaiu",
    pages: "200",
    read: "Read"
  },
  {
    title: "One Punch Man Vol. 1",
    author: "ONE",
    pages: "201",
    read: "Read"
  },
  {
    title: "Naruto Vol. 42",
    author: "Kishimoto Masashi",
    pages: "187",
    read: "Unread"
  },
  {
    title: "Bleach Vol. 34",
    author: "Kubotite",
    pages: "190",
    read: "Read"
  },
  {
    title: "My Hero Academia Vol. 1",
    author: "Kohei Horikoshi",
    pages: "192",
    read: "Unread"
  }
];

render(myLibrary);

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
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
  if (title == "" || author == "" || pages == "" || read == null) {
    return;
  }
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
      book.id = id;
      card.dataset.value = id;
      container.appendChild(card);
      const deleteBtn = document.createElement("div");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = "x";
      card.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", () => {
        deleteCard(event.target.parentNode);
      });
      const cardTitleDiv = document.createElement("div");
      cardTitleDiv.classList.add("title");
      const cardTitle = document.createElement("p");
      cardTitle.innerHTML = `${book.title}`;
      cardTitleDiv.appendChild(cardTitle);
      const cardAuthorDiv = document.createElement("div");
      cardAuthorDiv.classList.add("author");
      const cardAuthor = document.createElement("p");
      cardAuthor.innerHTML = `${book.author}`;
      cardAuthorDiv.appendChild(cardAuthor);
      const cardPagesDiv = document.createElement("div");
      cardPagesDiv.classList.add("pages");
      const cardPages = document.createElement("p");
      cardPages.innerHTML = `${book.pages}`;
      cardPagesDiv.appendChild(cardPages);
      card.appendChild(cardTitleDiv);
      card.appendChild(cardAuthorDiv);
      card.appendChild(cardPagesDiv);
      book.read == "Read"
        ? card.classList.add("read")
        : card.classList.add("not-read");
      const readBtn = document.createElement("button");
      const readBtnDec = document.createElement("div");
      readBtnDec.classList.add("dec");
      card.appendChild(readBtnDec);
      readBtn.classList.add("read-btn");
      book.read == "Read"
        ? (readBtn.innerHTML = "Read")
        : (readBtn.innerHTML = "Unread");
      card.appendChild(readBtn);
      readBtn.addEventListener("click", () => {
        changeStatus(event.target.parentNode);
      });
    }
  });
}

function deleteCard(card) {
  container.removeChild(card);
  myLibrary.forEach(function(book, index) {
    if (book.id == card.dataset.value) {
      myLibrary.splice(index, 1);
    }
  });
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
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const accordion = document.getElementById("accordion");

accordion.addEventListener("click", function() {
  const panel = this.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
});
