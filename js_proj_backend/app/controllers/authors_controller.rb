class AuthorsController < ApplicationController
    

    def index
        authors = Author.all
        render json: authors
    end

    def show
        author = Author.find_by(id: params[:id])
        render json: author
    end

      # POST /authors
    def create
        @author = Author.create_or_find_by(author_params)

        if @author.save
        render json: @author, status: :created, location: @author
        else
        render json: @author.errors, status: :unprocessable_entity
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_author
      @author = Author.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def author_params
      params.require(:author).permit(:first_name, :last_name)
    end
end
