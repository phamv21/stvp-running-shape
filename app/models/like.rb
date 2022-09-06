class Like < ApplicationRecord
    validates :activity_id, uniqueness:{scope: :user_id, message:'Can only like once'}

    belongs_to :user
    belongs_to :activity


    def self.like_index(activity_ids,user_id)
        Like.where('likes.activity_id IN (?)',activity_ids).where('likes.user_id = ?',user_id)        
    end
end
