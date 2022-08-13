@users.each do |user|
    json.set! user.id do
        json.relationship_type 'Pending'
        json.extract! user, :id, :username, :email
    end
end