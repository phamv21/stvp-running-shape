class UserRelationship < ApplicationRecord
    UserRelationship::RELATIONSHIP_TYPES = ['Pending','Friend','Block']
    validates :other_user_id, uniqueness: {scope: :user_id,message:'can only follow one time'}
    validates :relationship_type, presence: true
    validates :relationship_type, inclusion:RELATIONSHIP_TYPES

    belongs_to :user 
    belongs_to :other_user, class_name: 'User', foreign_key: 'other_user_id'   
    #approve or block the pepple that requesting friend 

    def approve_request
        if self[:relationship_type] == 'Pending'
            self[:relationship_type] = 'Friend'
            self.save
        end
    end

    def deny_request
        if self[:relationship_type] == 'Pending'
            self[:relationship_type] = 'Block'
            self.save
        end
    end
end
