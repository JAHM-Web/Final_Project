class CleanUpReviewsTable < ActiveRecord::Migration[8.1]
  def change
    remove_foreign_key :reviews, :locations
    remove_column :reviews, :location_id, :integer
  end
end