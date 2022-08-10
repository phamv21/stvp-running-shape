class Following < ApplicationRecord
    validates :friend_id, uniqueness: {scope: :user_id,message:'can only follow one time'}
    belongs_to :user 
    belongs_to :friend, class_name: 'User', foreign_key: 'friend_id'   
end
