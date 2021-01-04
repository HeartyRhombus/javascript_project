class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.integer :author_id
      t.string :genre
      t.date :pub_date
      t.text :summary

      t.timestamps
    end
  end
end
