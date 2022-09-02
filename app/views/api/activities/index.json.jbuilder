@activities.each do |activity|
    json.set! activity.id do
        json.extract! activity, :id, :title,:note, :distance, :privacy, :starting_time,:route_id, :user_id
        #we will build the func to parse second to time later
        json.duration activity.duration_text
    end
end

