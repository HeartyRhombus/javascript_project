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
        return `
        <h3>${this.first_name} ${this.last_name}</h3>
        Published: ${this.books.length} books in the library!
        <hr>
        Books:
        <hr>
        
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