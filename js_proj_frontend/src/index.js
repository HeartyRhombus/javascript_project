const apiService = new ApiService()
let main = document.getElementById('main')

const init = () => {
    addEventListeners()
    renderBooks()
}

function addEventListeners(){
    document.getElementById('books-form').addEventListener('click', createBookForm)
    document.getElementById('books-home').addEventListener('click', renderBooks)
}

async function renderBooks(){
    const books = await apiService.fetchBooks()
    main.innerHTML = ""
    books.map(book => {
        const newBook = new Book(book)
        main.innerHTML += newBook.renderBook()
    })
    addClicksToLinks()

}

function addClicksToLinks() {
    let books = document.querySelectorAll("li a")
    books.forEach(book => {
        book.addEventListener('click', showBook)
    })
}


async function showBook(e){
    let id = e.target.dataset.id
    main.innerHTML = ""
    const book = await apiService.fetchBook(id)
    const viewBook = new Book(book)
    main.innerHTML = viewBook.displayBook()
    document.getElementById('edit_book').addEventListener('click', editBookForm)
    document.getElementById('delete_book').addEventListener('click', deleteBook)
}

async function createBookForm(){
    let formDiv = document.getElementById("new-book-form")
    let html = `
    <button id="cancel_add_book">Cancel</button>
    <br/> <br/>
        Add A New Book
        <form>
            <label>Title: </label>
            <input type="text" id="title"/>
            <br/>
            <label>Author: </label>
            <select name="authors" id="author">
                <option value="">--Please Select an Author--</option>
                <option value="new_author">Add an Author</option>
            </select>
            <input type="text" id="new_author" placeholder="New Author"/>
            <br/>
            <label>Genre: </label>
            <input type="text" id="genre"/>
            <br/>
            <label>Publication Date: </label>
            <input type="date" id="pub_date"/>
            <br/>
            <label>Summary: </label>
            <br/>
            <textarea id="summary" rows="8" cols="50"></textarea>
            <br/>
            <input type="submit"/>
        </form>
        <br/>

    `
    formDiv.innerHTML = html
    let formSelectOptions = document.querySelector('form select')
    const authors = await apiService.fetchAllAuthors()
    authors.forEach( author => {
        const newAuthor = new Author(author)
        formSelectOptions.innerHTML += newAuthor.authorSelectOptions()
    })

    document.querySelector('form').addEventListener('submit', createBook)
    document.getElementById('cancel_add_book').addEventListener('click', clearForm)
}

async function createBook(e){
    e.preventDefault()
    
    let book = {
        title: e.target.querySelector("#title").value,
        genre: e.target.querySelector("#genre").value,
        pub_date: e.target.querySelector("#pub_date").value,
        summary: e.target.querySelector("#summary").value
    }

    if (e.target.querySelector("#author").value === "new_author"){
        book.author_attributes = {
            first_name: e.target.querySelector("#new_author").value.split(" ")[0],
            last_name: e.target.querySelector("#new_author").value.split(" ")[1],
            }
    } else {
        book.author_id = e.target.querySelector("#author").value
    }

    let data = await apiService.postBook(book)
    let newBook = new Book(data)
    main.innerHTML += newBook.renderBook()
    addClicksToLinks()
    clearForm()
}

function clearForm(){
    let formDiv = document.getElementById("new-book-form")
    formDiv.innerHTML = ""
}

async function deleteBook(e){
    let id = e.target.dataset.id
    await apiService.deleteBook(id)
    renderBooks()
}

async function editBookForm(e){
    let id = e.target.dataset.id
    main.innerHtml = ""
    const book = await apiService.fetchBook(id)
    const editBook = new Book(book)
    main.innerHTML = editBook.renderEditBookForm()
    let formSelectOptions = document.querySelector('form select')
    const authors = await apiService.fetchAllAuthors()
    authors.forEach( author => {
        const newAuthor = new Author(author)
        formSelectOptions.innerHTML += newAuthor.authorSelectOptions()
            })
    let sel = document.querySelector('form select')
    let opts = sel.options
    for (let opt, i = 0; opt = opts[i]; i++){
        if (opt.id == book.author.id){
            sel.selectedIndex = i
            }
        }
    document.querySelector('form').addEventListener('submit', updateBook)
}

function updateBook(e){
    e.preventDefault()
    let id = e.target.querySelector('form input').id
    let main = document.getElementById('main')
    let book = {
        title: e.target.querySelector("#title").value,
        genre: e.target.querySelector("#genre").value,
        pub_date: e.target.querySelector("#pub_date").value,
        summary: e.target.querySelector("#summary").value
    }

    if (e.target.querySelector("#author").value === "new_author"){
        book.author_attributes = {
            first_name: e.target.querySelector("#new_author").value.split(" ")[0],
            last_name: e.target.querySelector("#new_author").value.split(" ")[1],
            }
    } else {
        book.author_id = e.target.querySelector("#author").value
    }

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(book)
    }
    
    fetch(BASE_URL + `/books/${id}`, configObj)
        .then(resp => resp.json())
        .then(getBooks())
}


init()