class BooksController < ApplicationController

    def index
        books = Book.all
        render json: books, only: [:id, :title, :genre, :pub_date, :summary], include: [:author]
    end

end
