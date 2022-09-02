@activity_feed.each do |activity|
    json.set! activity.id do
        json.extract! activity, :id, :title,:note, :distance, :thumb, :privacy, :starting_time, :starting_time_text,:route_id, :user_id
        #we will build the func to parse second to time later
        json.duration activity.duration_text
        json.comment_count  @comment_count[activity.id]
        json.author activity.user.username
    end
end