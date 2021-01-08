class Book{

    constructor(data){
        this.id = data.id
        this.title = data.title
        this.genre = data.genre
        this.pub_date = data.pub_date
        this.author = data.author
    }

    renderBook(){
        return `
        <li>
            <a href="#" data-id="${this.id}">${this.title}</a>
        </li>
        `
    }

}