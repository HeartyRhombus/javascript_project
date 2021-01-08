class Book{

    constructor(data){
        this.id = data.id
        this.title = data.title
        this.genre = data.genre
        this.pub_date = data.pub_date
        this.summary = data.summary
        this.author = data.author
    }

    renderBook(){
        return `
        <li>
            <a href="#" data-id="${this.id}">${this.title}</a>
        </li>
        `
    }

    displayBook(){
        return `
        <h3>${this.title}</h3>
        By: ${this.author.first_name} ${this.author.last_name}
        <hr>
        Publication Date: ${this.pub_date}
        <br/>
        Genre: ${this.genre}
        <br/>
        Summary:
        <br/>
        ${this.summary}
        <br/>
        <hr>
        <button id="edit_book" data-id="${this.id}">Edit</button>
        <button id="delete_book" data-id="${this.id}">Delete</button>
        `
    }

}