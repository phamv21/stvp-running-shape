class UserRelationship < ApplicationRecord
    UserRelationship::RELATIONSHIP_TYPES = ['Pending','Friend','Block']
    validates :other_user_id, uniqueness: {scope: :user_id,message:'can only follow one time'}
    validates :relationship_type, presence: true
    validates :relationship_type, inclusion:RELATIONSHIP_TYPES

    belongs_to :user 
    belongs_to :other_user, class_name: 'User', foreign_key: 'other_user_id'   
    #approve or block the pepple that requesting friend 
    #Use to check friendship between 2 users
    def self.friend?(uid1,uid2)
        check = UserRelationship.select(:id)
        .where('EXISTS (:u1) OR EXISTS (:u2)',u1:UserRelationship.where(user_id:uid1)
        .where(other_user_id:uid2),u2:UserRelationship.where(user_id:uid2)
        .where(other_user_id:uid1))
        check.length != 0
    end

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
