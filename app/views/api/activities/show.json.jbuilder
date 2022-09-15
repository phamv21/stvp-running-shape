json.set! @activity.id do
        json.extract! @activity, :id, :title, :note, :distance, :privacy, :starting_time, :route_id, :user_id
        json.thumb url_for(@activity.route.thumb) if !@activity.route.nil? && @activity.route.thumb.attached?
        json.comment_count  @comment_count[@activity.id]
        json.like_count  @like_count[@activity.id]
        json.author @activity.user.username
        json.duration @activity.duration_text
    end