json.set! @comment.activity_id do
    json.set! @comment.id do
        json.extract! @comment, :id, :content, :user_id, :activity_id, :created_at
        json.author @comment.user.username
    end
end