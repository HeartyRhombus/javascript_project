class Book < ApplicationRecord
    belongs_to :author
    accepts_nested_attributes_for :author, reject_if: :all_blank
end
