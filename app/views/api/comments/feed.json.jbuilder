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