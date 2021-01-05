class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :pub_date, :summary
  belongs_to :author
end
