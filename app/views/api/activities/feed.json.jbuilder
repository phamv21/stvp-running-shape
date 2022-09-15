
json.activities do
    @activity_feed.each do |activity|
    json.set! activity.id do
        json.extract! activity, :id, :title,:note, :distance, :privacy, :starting_time, :starting_time_text,:route_id, :user_id
        #we will build the func to parse second to time later
        json.thumb url_for(activity.route.thumb) if !activity.route.nil? && activity.route.thumb.attached?
        json.duration activity.duration_text
        json.comment_count  @comment_count[activity.id]
        json.like_count  @like_count[activity.id]
        json.author activity.user.username
    end
    end
end
json.comments do
    if @comments.empty? 
        {}
    else
        @comments.each do |act_id,recent_comments| 
           json.set! act_id do
               recent_comments.each do |comment|
                   json.set! comment['id'] do
                       json.extract! comment, "id", "content", "activity_id", "user_id", "created_at"
                       json.author comment["username"]
                   end
               end
           end
        end
    end

end

json.likes do
    if @likes.empty?
        {}
    else
        @likes.each do |like|
            json.set! like.activity_id do
                json.extract! like, :id, :user_id, :activity_id
            end
        end
    end

end