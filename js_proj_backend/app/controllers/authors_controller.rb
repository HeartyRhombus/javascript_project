class AuthorsController < ApplicationController

    def index
        authors = Author.all
        render json: authors, only: [:id, :first_name, :last_name]
    end
end
