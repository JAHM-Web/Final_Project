class AddFieldsToReviews < ActiveRecord::Migration[8.1]
  def change
    add_column :reviews, :location_name, :string
    add_column :reviews, :location_type, :string
    add_column :reviews, :wifi_rating, :integer
    add_column :reviews, :poster_name, :string

    # for map support 👇
    add_column :reviews, :latitude, :float
    add_column :reviews, :longitude, :float
  end
end