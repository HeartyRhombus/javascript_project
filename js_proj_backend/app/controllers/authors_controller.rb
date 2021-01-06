class AuthorsController < ApplicationController

    def index
        authors = Author.all
        render json: authors
    end

    def show
        author = Author.find_by(id: params[:id])
        render json: author
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
