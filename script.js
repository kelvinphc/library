/* 
Click "Add New Book"
Dialog pops up
Fill in Title, Author, Pages. Tick "Have you read it?". Press Submit. Use event.preventDefault()
New Book is created. All Book objects should have a unique id, which can be generated using crypto.randomUUID()
New Book is added to Library array
Books in Library array are displayed in table
Click Read/Unread. Book status is changed to Not Unread/Read
Click Remove. Book is removed from Library array. Give data-attribute that corresponds to the unique id of the respective book object
*/

const myLibrary = [];
const tbody = document.querySelector("tbody");

function Book(title, author, pages, read, uuid) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uuid = uuid;

    this.getBookInfo = function () {
        const lastTr = document.querySelector("tbody").lastElementChild;
        const titleTd = lastTr.children[0];
        const authorTd = lastTr.children[1];
        const pagesTd = lastTr.children[2];
        const statusTd = lastTr.children[3];
        const removeTd = lastTr.children[4];
        const removeBtn = document.createElement("button");

        titleTd.textContent = this.title;
        authorTd.textContent = this.author;
        pagesTd.textContent = this.pages;
        statusTd.textContent = this.read;
        lastTr.dataset.uuid = this.uuid;

        removeBtn.classList.add("remove-btn");
        removeBtn.dataset.uuid = this.uuid;
        removeBtn.textContent = "Remove";
        removeTd.appendChild(removeBtn);
    }
}

function addBookToLibrary(title, author, pages, read) {
    const uuid = crypto.randomUUID();
    const book = new Book(title, author, pages, read, uuid);
    
    myLibrary.push(book);
}

function createNewRowInTable() {
    const tr = document.createElement("tr");

    for (let i = 0; i < 5; i++) {
        const td = document.createElement("td");
        tr.appendChild(td);
    }
    
    tbody.appendChild(tr);
}

function displayBooksInTable () {
    tbody.innerHTML = "";
    
    for (let book of myLibrary) {
    
        createNewRowInTable ();

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

    addBookToLibrary(data.title, data.author, data.pages, data.read);
    displayBooksInTable();

    form.reset();
    addDialog.close();
})

tbody.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
        const targetUuid = e.target.dataset.uuid;

        removeBookFromLibrary(targetUuid);
    }
})

function removeBookFromLibrary (targetUuid) {
    const selectedBook = myLibrary.findIndex(book => book.uuid === targetUuid);

    myLibrary.splice(selectedBook, 1);

    displayBooksInTable();
}