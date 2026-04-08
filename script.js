const myLibrary = [];
const tbody = document.querySelector("tbody");

function Book(title, author, pages, status, uuid) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.uuid = uuid;

    this.getBookInfo = function () {
        const lastTr = document.querySelector("tbody").lastElementChild;
        const titleTd = lastTr.children[0];
        const authorTd = lastTr.children[1];
        const pagesTd = lastTr.children[2];
        const statusBtn = lastTr.querySelector(".status-btn");
        const removeBtn = lastTr.querySelector(".remove-btn");

        titleTd.textContent = this.title;
        authorTd.textContent = this.author;
        pagesTd.textContent = this.pages;

        statusBtn.dataset.uuid = this.uuid;
        statusBtn.textContent = this.status;
        
        removeBtn.dataset.uuid = this.uuid;
        removeBtn.textContent = "Remove";
    }
}

function addBookToLibrary(title, author, pages, status) {
    const uuid = crypto.randomUUID();
    const book = new Book(title, author, pages, status, uuid);
    
    myLibrary.push(book);
}

function createNewRowInTable() {
    const tr = document.createElement("tr");

    for (let i = 0; i < 5; i++) {
        const td = document.createElement("td");
        tr.appendChild(td);
    }
    
    tbody.appendChild(tr);

    const statusTd = tr.children[3];
    const removeTd = tr.children[4];
    const statusBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    statusBtn.classList.add("status-btn");
    statusTd.appendChild(statusBtn);

    removeBtn.classList.add("remove-btn");
    removeTd.appendChild(removeBtn);
}

function displayBooksInTable () {
    tbody.innerHTML = "";
    
    for (let book of myLibrary) {
    
        createNewRowInTable();

        book.getBookInfo();
    }
}

const addDialog = document.getElementById("add-dialog");
const form = document.querySelector("form");
const cancelBtn = document.getElementById("cancel-btn");

cancelBtn.addEventListener("click", () => {
    addDialog.close();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    addBookToLibrary(data.title, data.author, data.pages, data.status);
    displayBooksInTable();

    form.reset();
    addDialog.close();
})

tbody.addEventListener("click", function (e) {
    const targetUuid = e.target.dataset.uuid;

    if (e.target.classList.contains("remove-btn")) {
        removeBookFromLibrary(targetUuid);
    } else if (e.target.classList.contains("status-btn")) {
        changeReadStatus(targetUuid);
    }
})

function removeBookFromLibrary (targetUuid) {
    const bookIndex = myLibrary.findIndex(book => book.uuid === targetUuid);

    myLibrary.splice(bookIndex, 1);

    displayBooksInTable();
}

function changeReadStatus (targetUuid) {
    const bookIndex = myLibrary.findIndex(book => book.uuid === targetUuid);
    const statusBtn = document.querySelector(`button[data-uuid="${targetUuid}"]`);
    const book = myLibrary[bookIndex];

    if (book.status === "Read") {
        book.status = "Unread";
    } else {
        book.status = "Read";
    }
    
    statusBtn.textContent = book.status;
}