@comments.each do |activity_comments| 
    unless activity_comments.empty?
        json.set! activity_comments.first.activity_id do
            activity_comments.each do |comment|
                json.set! comment.id do
                    json.extract! comment, :id, :content, :activity_id, :user_id, :created_at
                    json.author comment.user.username
                end
            end
        end
    end
end