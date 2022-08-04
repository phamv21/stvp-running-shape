@routes.each do |route|
    json.set! route.id do
        json.extract! route, :id, :name, :description, :user_id, :privacy, :activity
    end
end