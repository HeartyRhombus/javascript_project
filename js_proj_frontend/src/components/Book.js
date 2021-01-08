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

    renderEditBookForm(){
        return `
        Edit ${this.title}:
        <br/>
        <form>
            <input type="hidden" id="${this.id}">
            <label>Title: </label>
            <input type="text" id="title" value="${this.title}"/>
            <br/>
            <label>Author: </label>
            <select name="authors" id="author">
                <option value="">--Please Select an Author--</option>
                <option value="new_author">Add an Author</option>
            </select>
            <input type="text" id="new_author" placeholder="New Author"/>
            <br/>
            <label>Genre: </label>
            <input type="text" id="genre" value="${this.genre}"/>
            <br/>
            <label>Publication Date: </label>
            <input type="date" id="pub_date" value="${this.pub_date}"/>
            <br/>
            <label>Summary: </label>
            <br/>
            <textarea id="summary" rows="8" cols="50">${this.summary}</textarea>
            <br/>
            <input type="submit"/>
        </form>
    `
    }

}