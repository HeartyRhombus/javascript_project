class BooksController < ApplicationController

    def index
        books = Book.all
        render json: books
    end

    def show
        book = Book.find_by(id: params[:id])
        render json: book
    end

    def create
        @book = Book.new(book_params)
    
        if @book.save
          render json: @book, status: :created, location: @book
        else
          render json: @book.errors, status: :unprocessable_entity
        end
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_book
        @book = Book.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def book_params
        params.require(:book).permit(:title, :author_id, :genre, :pub_date, :summary)
      end
end
