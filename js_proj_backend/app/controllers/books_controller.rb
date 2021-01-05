class BooksController < ApplicationController

    def index
        books = Book.all
        render json: BookSerializer.new(books).to_serialized_json
    end

end
