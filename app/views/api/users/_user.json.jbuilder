json.set! user.id do
    json.extract! user, :id, :username, :email, :gender, :age, :last_route_location
    json.avatar url_for(user.avatar) unless user.avatar.length.nil?
end