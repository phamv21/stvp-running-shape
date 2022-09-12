class Route < ApplicationRecord
    Route::PRIVACY = ['Friend','Public','Private']
    Route::ACTIVITIES = ['Run','Walk']
    Route::ROUTEPERPAGE = 2
    validates :name, presence: true
    validates :privacy, inclusion: PRIVACY
    validates :activity, inclusion: ACTIVITIES
    validate :should_have_more_than_two_points

    belongs_to :user 
    has_many   :pins, dependent: :destroy, inverse_of: :route
    has_many :activities
    has_one_attached :thumb, dependent: :destroy
    #show the route that in the, at up now using bounds in filters first
    def self.with_filters(filters,user_id)
         # google map bounds will be in the following format:
        # {
        #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
        #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
        # }
        #... query logic goes here
        lat_range = (filters['bounds']['southWest']["lat"].to_r..filters['bounds']['northEast']["lat"].to_r)
        lng_range = (filters['bounds']['southWest']["lng"].to_r..filters['bounds']['northEast']["lng"].to_r)
        Route.includes(:pins).where('EXISTS (:p)',p:Pin.where(lat:lat_range)
        .where(lng:lng_range)
        .where('pins.route_id = routes.id'))
        .where('routes.privacy = (:p) OR EXISTS (:r)',p:'Public',r:UserRelationship.where('EXISTS (:u1) OR EXISTS (:u2)',u1:UserRelationship.where(user_id:user_id)
        .where('routes.user_id = user_relationships.other_user_id').where('routes.privacy=?','Friend').where('user_relationships.relationship_type= ?','Friend'),u2:UserRelationship.where('routes.user_id = user_relationships.user_id')
        .where(other_user_id:user_id).where('routes.privacy=?','Friend').where('user_relationships.relationship_type= ?','Friend')))

        


    end
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
