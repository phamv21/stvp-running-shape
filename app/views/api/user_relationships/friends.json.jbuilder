@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username, :email
         json.avatar user.avatar.url || ''
    end
end