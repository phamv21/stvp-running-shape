pins = route.pins
json.set! route.id do
    json.extract! route, :id, :name, :description, :user_id, :privacy, :activity, :distance, :area_name, :created_at
    json.pins do 
        json.array! pins, :id, :lat, :lng, :description
    end
end