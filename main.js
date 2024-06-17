function addToLibrary(book) {
	myLibrary.push(book);
}
class Book {
	constructor(title, author, pages, read) {
		(this.title = title), (this.author = author), (this.pages = pages);
		this.read = read;
	}

	info() {
		if (this.read) {
			this.read = "read";
		} else this.read = "not read";
		return `
            ${this.title} by ${this.author}, ${this.pages}, ${this.read}
        `;
	}
}
const myLibrary = [];
const body = document.querySelector("body");
console.log(body);
const mainElement = document.getElementById("main");
displayBooks();

function displayBooks() {
	const bookContainerPrevious = document.querySelector(".bookContainer");
	if (bookContainerPrevious) {
		bookContainerPrevious.remove();
	}

	const bookContainer = document.createElement("div");
	bookContainer.classList.add("bookContainer");
	mainElement.appendChild(bookContainer);
	myLibrary.forEach((book) => {
		const card = document.createElement("div");
		bookContainer.appendChild(card);
		card.classList.add("card", `${book.title}`);
		card.innerText = `
            title = ${book.title}
            author = ${book.author}
            pages = ${book.pages}
        `;
		const readStatus = document.createElement("p");
		readStatus.innerText = `read = ${book.read}`;

		card.appendChild(readStatus);
		const changeReadStatusButton = document.createElement("button");
		changeReadStatusButton.innerText = "change read status!";

		changeReadStatusButton.addEventListener("click", (e) => {
			e.preventDefault();
			book.read = !book.read;
			readStatus.innerText = `read = ${book.read}`;
		});
		card.appendChild(changeReadStatusButton);
		const removeSelfButton = document.createElement("button");
		removeSelfButton.innerText = `remove ${book.title} from collection`;

		removeSelfButton.addEventListener("click", (e) => {
			e.preventDefault();
			const divBookIndex = myLibrary.indexOf((el) => (el.title = book.title));
			myLibrary.splice(divBookIndex, 1);

			const bookToRemove = document.querySelector(`.${book.title}`);
			bookToRemove.remove();
		});
		card.appendChild(removeSelfButton);
	});
}

const newBookButton = document.createElement("button");
newBookButton.classList.add("newBookButton");
newBookButton.innerText = "Add new book!";
body.appendChild(newBookButton);

const newBookClickHandler = (e) => {
	e.preventDefault();
	const formPrevious = document.querySelector(".formContainer");
	if (formPrevious) {
		formPrevious.remove();
	}
	const form = document.createElement("form");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let authorDom = document.getElementById("author");
		let titleDom = document.getElementById("title");
		let pagesDom = document.getElementById("pages");
		let readDom = document.getElementById("read");
		let notReadDom = document.getElementById("notRead");
		let author = authorDom.value;
		let title = titleDom.value;
		let pages = pagesDom.value;
		let read = readDom.checked;

		form.remove();

		const newBook = new Book(author, title, pages, read);
		addToLibrary(newBook);
		console.log(myLibrary);
		displayBooks();
	});
	form.classList.add("formContainer");
	mainElement.appendChild(form);
	for (let index = 0; index <= 4; index++) {
		const formInputContainer = document.createElement("div");
		formInputContainer.classList.add("inputContainer");
		form.appendChild(formInputContainer);
		const input = document.createElement("input");
		input.classList.add(`input${index}`);

		if (index === 0) {
			input.setAttribute("type", "text");
			input.setAttribute("name", "title");
			input.setAttribute("id", "title");

			input.required = true;
			const label = document.createElement("label");
			label.innerText = "Enter book's title: ";
			label.setAttribute("for", "title");
			formInputContainer.appendChild(label);
			formInputContainer.appendChild(input);
		} else if (index === 1) {
			const errorBox = document.createElement("span");
			input.setAttribute("type", "text");
			input.minLength = 2;
			input.setAttribute("name", "author");
			input.setAttribute("id", "author");
			input.required = true;
			input.addEventListener("input", (e) => {
				input.setCustomValidity(" ");
				if (input.validity.tooShort) {
					input.validity = false;
					errorBox.textContent = "NAH TROLLEASTE TF TENES Q PONER MAS TEXTO PA";
					errorBox.className = "error";
					formInputContainer.appendChild(errorBox);
					e.preventDefault();
				} else {
					errorBox.textContent = "";
					errorBox.className = "";
				}
			});
			const label = document.createElement("label");
			label.innerText = "Enter book's author: ";
			label.setAttribute("for", "author");
			formInputContainer.appendChild(label);
			formInputContainer.appendChild(input);
		} else if (index === 2) {
			input.setAttribute("type", "number");
			input.setAttribute("name", "pages");
			input.setAttribute("id", "pages");
			input.max = 9999;
			input.addEventListener("input", (event) => {
				if (input.validity.rangeOverflow) {
					input.setCustomValidity("che tantas páginas iba a tener tu libro?");
				} else {
					input.setCustomValidity("");
				}
				event.preventDefault();
			});
			const label = document.createElement("label");
			label.innerText = "Enter book's number of pages: ";
			label.setAttribute("for", "pages");
			formInputContainer.appendChild(label);
			formInputContainer.appendChild(input);
		} else if (index === 3) {
			const optionContainer = document.createElement("div");
			input.setAttribute("type", "radio");
			input.setAttribute("id", "read");
			input.setAttribute("name", "readStatus");

			const label = document.createElement("label");
			label.innerText = "read";
			label.setAttribute("for", "read");
			optionContainer.appendChild(label);
			optionContainer.appendChild(input);

			const optionContainerTwo = document.createElement("div");
			const labelFalse = document.createElement("label");
			labelFalse.innerText = "not read";
			labelFalse.setAttribute("for", "notRead");
			const inputFalse = document.createElement("input");
			inputFalse.setAttribute("type", "radio");
			inputFalse.setAttribute("id", "notRead");
			inputFalse.setAttribute("name", "readStatus");
			optionContainerTwo.appendChild(labelFalse);
			optionContainerTwo.appendChild(inputFalse);

			formInputContainer.appendChild(optionContainer);
			formInputContainer.appendChild(optionContainerTwo);
		} else {
			input.setAttribute("type", "submit");
			input.innerText = "Submit book :3";
			formInputContainer.appendChild(input);
		}

		form.appendChild(formInputContainer);
	}
};
newBookButton.addEventListener("click", newBookClickHandler);
