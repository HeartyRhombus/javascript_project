const BASE_URL = 'http://localhost:3000';

window.addEventListener("DOMContentLoaded", () => {
    getBooks()
})

// index view
function getBooks(){
    let main = document.getElementById('main')
    fetch(BASE_URL + '/books')
        .then (resp => resp.json())
        .then (books => {
            // do things to data here
            // console.log(books)
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

function addClicksToLinks(e) {
    console.log(e)
}