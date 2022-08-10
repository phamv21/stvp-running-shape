@users.each do |user|
    json.set! user.id do
        json.relationship_type 'None'
        json.partial! 'api/user_relationships/relationship', user:user 
    end
end