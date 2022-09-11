@users.each do |user|
    json.set! user.id do
        json.relationship_type 'None'
        json.extract! user, :id, :username, :email
        json.avatar user.avatar.url || ''
    end
end