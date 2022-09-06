if @likes.empty?
    {}
else
    @likes.each do |like|
        json.set! like.activity_id do
            json.extract! like, :id, :user_id, :activity_id
        end
    end
end
