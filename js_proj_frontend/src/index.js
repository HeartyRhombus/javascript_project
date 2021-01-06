const BASE_URL = 'http://localhost:3000';

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('books-form').addEventListener('click', createBookForm)
    // document.getElementById('books-home').addEventListener('click', getBooks)
    getBooks()
})

// books index view
function getBooks(){
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + '/books')
        .then (resp => resp.json())
        .then (books => {
            books.map(book => {
                main.innerHTML += `
                <li>
                    <a href="#" data-id="${book.id}">${book.title}</a>
                </li>
                `
            })
            addClicksToLinks()
        })
}

function addClicksToLinks() {
    let books = document.querySelectorAll("li a")
    books.forEach(book => {
        book.addEventListener('click', showBook)
    })
}

// book show view
function showBook(e){
    let id = e.target.dataset.id
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetch(BASE_URL + `/books/${id}`)
        .then(resp => resp.json())
        .then(book => {
            main.innerHTML = `
            <h3>${book.title}</h3>
            By: ${book.author.first_name} ${book.author.last_name}
            <hr>
            Publication Date: ${book.pub_date}
            <br>
            Genre: ${book.genre}
            <br>
            Summary:
            <br>
            ${book.summary}            
            `
        })

}

// book create view
function createBookForm(){
    let formDiv = document.getElementById("new-book-form")
    let html = `
        <form>
            <label>Title: </label>
            <input type="text" id="title"/>
            <br>
            <label>Author: </label>
            <input type="text" id="author"/>
            <br>
            <label>Genre: </label>
            <input type="text" id="genre"/>
            <br>
            <label>Publication Date: </label>
            <input type="text" id="pub_date"/>
            <br>
            <label>Summary: </label>
            <input type="text" id="summary"/>
            <br>
            <input type="submit"/>
        </form>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createBook)
}

function createBook(e){
    e.preventDefault()
}

function clearForm(){
    let formDiv = document.getElementById("new-book-form")
    formDiv.innerHTML = ""
}