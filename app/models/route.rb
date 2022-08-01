class Route < ApplicationRecord
    Route::PRIVACY = ['Friend','Public','Private']
    Route::ACTIVITIES = ['Run','Walk']

    validates :name, presence: true
    validates :privacy, inclusion: PRIVACY
    validates :activity, inclusion: ACTIVITIES


    belongs_to :user 
    has_many   :pins, dependent: :destroy, inverse_of: :route
    def can_show?(user_id)
        if self.privacy == 'Public'
            return true
        elsif self.privacy == 'Private' && self.user_id == user_id
            return true
        elsif self.privacy == 'Friend' 
            friends = User.find_by(id:user_id).friend_ids
            if friends.include?(self.user_id)
                return true
            else
                return false
            end
        else
            return false
        end
        
    end
end
