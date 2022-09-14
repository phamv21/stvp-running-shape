@routes.each do |route|
    json.set! route.id do
        json.extract! route, :id, :name,:area_name, :description, :user_id, :privacy, :activity,:distance,:created_at
        json.thumb url_for(route.thumb)
        json.total_result @total_result
        json.pins do 
            json.array! route.pins, :id, :lat, :lng, :description
        end
    end
end