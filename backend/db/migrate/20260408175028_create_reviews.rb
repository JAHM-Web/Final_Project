class CreateReviews < ActiveRecord::Migration[8.1]
  def change
    create_table :reviews do |t|
      t.text :content
      t.integer :noise_rating
      t.integer :crowd_rating
      t.integer :outlet_rating
      t.references :location, null: false, foreign_key: true

      t.timestamps
    end
  end
end
