class Api::PostsController < ApplicationController
  def index
    posts = [
      { id: 1, title: "Hello" },
      { id: 2, title: "World" }
    ]

    render json: posts
  end
end
