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

        titleTd.textContent = this.title;
        authorTd.textContent = this.author;
        pagesTd.textContent = this.pages;
        statusTd.textContent = this.read;
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
    
    const tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
}

function displayBooksInTable () {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    
    for (let book of myLibrary) {
    
        createNewRowInTable ();

        const lastTr = document.querySelector("tbody").lastElementChild;
        const removeTd = lastTr.children[4];

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove");
        removeBtn.textContent = "Remove";
        removeTd.appendChild(removeBtn);

        book.getBookInfo();
    }
}

const newBtn = document.querySelector(".add");
newBtn.addEventListener("click", function () {
    alert("Hello");
});

const removeBtn = document.querySelector(".remove");
removeBtn.addEventListener("click", function () {
    alert("Bye");
});