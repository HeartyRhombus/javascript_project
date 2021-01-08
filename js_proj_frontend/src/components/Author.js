class Author{
    constructor(data){
        this.first_name = data.first_name
        this.last_name = data.last_name
    }

    authorSelectOptions(){
        return `
            <option value="${this.id}">
                ${this.first_name} ${this.last_name}
            </option>
        `
    }
}