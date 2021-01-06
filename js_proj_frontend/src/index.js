const BASE_URL = 'http://localhost:3000';

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('books-form').addEventListener('click', createBookForm)
    document.getElementById('books-home').addEventListener('click', getBooks)
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

// book create route
function createBookForm(){
    let formDiv = document.getElementById("new-book-form")
    let html = `
        Add A New Book
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
            <input type="date" id="pub_date"/>
            <br>
            <label>Summary: </label>
            <input type="textarea" id="summary"/>
            <br>
            <input type="submit"/>
        </form>
        <br>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createBook)
}

// create route
function createBook(e){
    e.preventDefault()
    // console.log(e)
    let book = {
        title: e.target.querySelector("#title").value,
        author: {
            first_name: e.target.querySelector("#author").value.split(" ")[0],
            last_name: e.target.querySelector("#author").value.split(" ")[1],
        },
        genre: e.target.querySelector("#genre").value,
        pub_date: e.target.querySelector("#pub_date").value,
        summary: e.target.querySelector("#summary").value
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(book)
    }
    
    fetch(BASE_URL + '/books', configObj)
        .then(resp => resp.json())
        .then(book => {
            let main = document.getElementById('main')
            main.innerHTML += `
            <li>
                <a href="#" data-id="#{book.id}">${book.title}</a>
            </li>
            `
            addClicksToLinks()
            clearForm()
        })
}

function clearForm(){
    let formDiv = document.getElementById("new-book-form")
    formDiv.innerHTML = ""
}