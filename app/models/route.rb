class Route < ApplicationRecord
    Route::PRIVACY = ['Friend','Public','Private']
    Route::ACTIVITIES = ['Run','Walk']

    validates :name, presence: true
    validates :privacy, inclusion: PRIVACY
    validates :activity, inclusion: ACTIVITIES
    validate :should_have_more_than_two_points

    belongs_to :user 
    has_many   :pins, dependent: :destroy, inverse_of: :route
    has_many :activities
    has_one_attached :thumb
    #func to validate the visibility of a map - whether it can be seen by others
    def can_show?(user_id)
        if self.privacy == 'Public'
            return true
        elsif self.privacy == 'Private' && self.user_id == user_id
            return true
        elsif self.privacy == 'Friend' 
            # friends = User.find_by(id:user_id).friend_ids
            # if friends.include?(self.user_id)
                # return true
            # else
                # return false
            # end
            return true #fix later when add friend table
        else
            return false
        end
        
    end
    #use this func to crete pin during the creatation of a map
    def pin_infos=(infos) #infors is the array of infor
        result = []
        infos.each do |info|
            #info is object have lat lng and desc
            els = self.pins.where('lat = ?',info[:lat].to_f).where('lng = ?',info[:lng].to_f)
            if els.empty?
                result << Pin.new(lat:info[:lat].to_f,lng:info[:lng].to_f,description:info[:description])
            else
                els.first.update(description:info[:description]) if info[:description] != '' && info[:description] != nil && els.first.description != info[:description]
                result << els.first
            end
        end
        self.pins = result
    end
    private
    #to validate the route with more than two point (start-midways-finish)
    def should_have_more_than_two_points
        unless self.pins.length > 1
            errors.add(:points,'You should have at least two points to have a route! ') 
        end
    end

end
