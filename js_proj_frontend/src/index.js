const BASE_URL = 'http://localhost:3000';

window.addEventListener("DOMContentLoaded", () => {
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

