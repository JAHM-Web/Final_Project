class Api::ReviewsController < ApplicationController

  def index
    render json: Review.all
  end

  def create
    review = Review.new(review_params)

    if review.save
      render json: review, status: :created
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(
      :location_name,
      :location_type,
      :crowd_rating,
      :noise_rating,
      :wifi_rating,
      :poster_name,
      :content,
      :latitude,
      :longitude
    )
  end
end