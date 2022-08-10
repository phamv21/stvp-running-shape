@users.each do |user|
    json.set! user.id do
        json.partial! 'api/user_relationships/relationship', user:user 
    end
end