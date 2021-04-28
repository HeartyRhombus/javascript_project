class Author{

    constructor(data){
        this.id = data.id
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.books = data.books
    }

    renderAuthor(){
        return `
        <li>
            <a href="#" class="authors" data-id="${this.id}">
                ${this.last_name}, ${this.first_name}
            </a>
        </li>
        `
    }

    displayAuthor(){
        const sortedBooks = this.books.sort((a, b) => {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            if (a < b){
                return -1;
            }else if (a > b){
                return 1;
            }else {
                return 0;
            }
        })

        const books = sortedBooks.map(book => {
            return `
            <li>
                <a href="#" class="books" data-id="${book.id}">${book.title}</a>
            </li>
            `
        }).join('')
        
        return `
        <h3>${this.first_name} ${this.last_name}</h3>
        Published: ${this.books.length} books in the library!
        <hr>
        Books:
        <ul>
            ${books}
        </ul>
        `
    }
    
    authorSelectOptions(){
        return `
            <option value="${this.id}">
                ${this.first_name} ${this.last_name}
            </option>
        `
    }
}