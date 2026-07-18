class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.uuid = crypto.randomUUID();
    }

    toggleStatus() {
        this.status = this.status === "Read" ? "Unread" : "Read";
    }
}

class Library {
    constructor(tbody) {
        this.books = [];
        this.tbody = tbody;

        this.tbody.addEventListener("click", (e) => this.handleTableClick(e));
    }

    addBook(title, author, pages, status) {
        this.books.push(new Book(title, author, pages, status));
        this.render();
    }

    removeBook(uuid) {
        this.books = this.books.filter(book => book.uuid !== uuid);
        this.render();
    }

    toggleBookStatus(uuid) {
        const book = this.books.find(book => book.uuid === uuid);
        if (!book) return;

        book.toggleStatus();
        this.render();
    }

    handleTableClick(e) {
        const uuid = e.target.dataset.uuid;
        if (!uuid) return;

        if (e.target.classList.contains("remove-btn")) {
            this.removeBook(uuid);
        } else if (e.target.classList.contains("status-btn")) {
            this.toggleBookStatus(uuid);
        }
    }

    render() {
        this.tbody.innerHTML = "";
        for (const book of this.books) {
            this.tbody.appendChild(this.createRow(book));
        }
    }

    createRow(book) {
        const tr = document.createElement("tr");

        const titleTd = document.createElement("td");
        titleTd.textContent = book.title;

        const authorTd = document.createElement("td");
        authorTd.textContent = book.author;

        const pagesTd = document.createElement("td");
        pagesTd.textContent = book.pages;

        const statusTd = document.createElement("td");
        const statusBtn = document.createElement("button");
        statusBtn.classList.add("status-btn");
        statusBtn.dataset.uuid = book.uuid;
        statusBtn.textContent = book.status;
        statusTd.appendChild(statusBtn);

        const removeTd = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.dataset.uuid = book.uuid;
        removeBtn.textContent = "Remove";
        removeTd.appendChild(removeBtn);

        tr.append(titleTd, authorTd, pagesTd, statusTd, removeTd);

        return tr;
    }
}

const library = new Library(document.querySelector("tbody"));

const addDialog = document.getElementById("add-dialog");
const form = document.querySelector("form");
const cancelBtn = document.getElementById("cancel-btn");

cancelBtn.addEventListener("click", () => {
    addDialog.close();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    library.addBook(data.title, data.author, data.pages, data.status);

    form.reset();
    addDialog.close();
});