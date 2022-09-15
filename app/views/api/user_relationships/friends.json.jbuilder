@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username, :email
        json.avatar url_for(user.avatar) if user.avatar.attached?
    end
end