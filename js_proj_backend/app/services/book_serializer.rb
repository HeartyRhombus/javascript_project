class BookSerializer

    def initialize(book_object)
        @book = book_object
    end

    def to_serialized_json
        @book.to_json(:include => {
            author: {only: [:id, :first_name, :last_name]}
        },
        only: [:id, :title, :genre, :pub_date, :summary]
    )
    end

end