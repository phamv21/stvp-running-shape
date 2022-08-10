@routes.each do |route|
    json.set! route.id do
        json.extract! route, :id, :name,:area_name, :description, :user_id, :privacy, :activity,:distance,:created_at
        json.thumb route.thumb.url
    end
end