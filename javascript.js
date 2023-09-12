// book class 

class Book {

    constructor(title, author, isbn ,price) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price ;
    }

}
// Ui class

class UI {

    //function for displaying books

    static displayBooks() {

        const storedbooks = [{
                title: 'abc',
                author: 'xyz',
                isbn: '1234'
            },
            {
                title: 'abcd',
                author: 'xyzhg',
                isbn: '173234'
            },
            {
                title: 'abcef',
                author: 'xyzwz',
                isbn: '123894'
            }
        ]

        //const books = storedbooks;
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));


    }


    // function to ad books in given table

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = '<td>' + book.title + '</td><td>' + book.author + '</td><td>' + book.isbn + '</td><td>'+book.price+'</td><td><a href="#" class="btn btn-danger btn-sm delete" >X</a></td>';
        list.appendChild(row);

    }


    // function to delete book from Store or table

    static deleteBook(book_del_btn) {

        if (book_del_btn.classList.contains('delete')) {
            book_del_btn.parentElement.parentElement.remove();
        }

    }


    static showAlert(msg, type) {

        const div = document.createElement('div');

        div.className = 'alert alert-' + type;

        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');


        container.insertBefore(div, form);


        setTimeout(() => document.querySelector('.alert').remove(), 500);


    }


    static clearForm() {

        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
        document.querySelector('#price').value = '';



    }


    // function to find a book

    static findBook() {

        var input, filter, table, tr, td, i, txtValue;

        input = document.getElementById('search');

        filter = input.value.toUpperCase();

        table = document.getElementById('table');

        tr = table.getElementsByTagName('tr');

        for (i = 0; i < tr.length; i++) {

            td = tr[i].getElementsByTagName('td')[0]; // Use [0] for the first column (Title)

            if (td) {

                txtValue = td.textContent || td.innerText;

                if (txtValue.toUpperCase().indexOf(filter) > -1) {

                    tr[i].style.display = "";

                } else {

                    tr[i].style.display = "none";
                }
            }
        }
    }


}


//Store class

class Store {

    static getBooks() {

        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        } else {

            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }


    static addBook(book) {

        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }



    static removeBook(isbn) {

        const books = Store.getBooks();
        books.forEach((book, index) => {

            if (book.isbn === isbn) {
                books.splice(index, 1);

            }
        });


        localStorage.setItem('books', JSON.stringify(books));


    }



}



//Even: display book

document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Even: add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {

    // prevent default event of submit

    e.preventDefault();

    //collecting data from form

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
   const price = document.querySelector('#price').value;

    //creating new book with the help of form parameter
    if (title === '' || author === '' || isbn === '' || price ==='' ) {

        UI.showAlert(" Please Fill all fileds ", "danger");

    } else {


        const book = new Book(title, author, isbn , price);

        // adding book 2 below table

        UI.addBookToList(book);

        Store.addBook(book);

        UI.showAlert(" book added successfully !", "success");

        // clear all form parameters

        UI.clearForm();

    }

});



//Even: remove book

document.querySelector('#book-list').addEventListener('click', (e) => {

    UI.deleteBook(e.target);
    UI.showAlert(" book deleted successfully ! ", "danger");


    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});


// Attach the filter function to the input element's 'input' event
document.getElementById('search').addEventListener("input", UI.findBook);