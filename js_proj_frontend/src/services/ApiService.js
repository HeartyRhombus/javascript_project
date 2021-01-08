class ApiService {
    constructor() {
        this.baseURL = "http://localhost:3000"
    }

    async fetchBooks(){
        let resp = await fetch(this.baseURL + '/books')
        let data = await resp.json()
        return data
    }

    async fetchBook(id){
        let resp = await fetch(this.baseURL + `/books/${id}`)
        let book = await resp.json()
        return book
    }

}