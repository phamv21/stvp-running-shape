json.set! @activity.id do
        json.extract! @activity, :id, :title, :note, :distance, :thumb, :duration, :privacy, :starting_time, :route_id, :user_id
        json.comment_count  @comment_count[@activity.id]
        json.like_count  @like_count[@activity.id]
        json.author @activity.user.username
    end