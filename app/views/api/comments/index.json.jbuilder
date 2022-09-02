json.set! @activity.id do
    @comments.each do |comment|
        json.set! comment.id do
            json.extract! comment, :id, :content, :activity_id, :user_id, :created_at
            json.author comment.user.username
        end
    end
end