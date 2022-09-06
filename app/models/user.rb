class User < ApplicationRecord
    User::GENDERS = ['None','Male','Female']

    validates :username, presence: true
    validates :username, uniqueness: true
    validates :birthday, presence: {message:'bad birthday\'s format'}
    validates :password_digest, presence:{message: 'password can not be blank'}
    validates :email, presence: true
    validates :password, length:{minimum: 6}, allow_blank: true
    attr_reader :password
    validates :gender, inclusion: {in:GENDERS, message:'Only None, Male or Female'}
    validate :should_older_than_fourteen
    after_initialize :ensure_session_token
    

    has_many :routes, dependent: :destroy, inverse_of: :user
    has_many :pins, through: :routes
    has_many :user_relationships, dependent: :destroy
    has_many :other_users, through: :user_relationships
    has_many :activities, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    #show the people who we are requesting friend and not yet accept
    def requested_friends
        self.other_users.where('user_relationships.relationship_type=?','Pending')
    end

    #show the people that are friend 
    def friends
        User.where.not(id:self.id)
        .where('EXISTS (:u1) OR EXISTS (:u2)',u1:UserRelationship.where('users.id = user_relationships.other_user_id')
        .where('user_relationships.user_id=?',self.id)
        .where('user_relationships.relationship_type =?','Friend'),u2:UserRelationship.where('users.id = user_relationships.user_id')
        .where('user_relationships.other_user_id = ?',self.id)
        .where('user_relationships.relationship_type=?','Friend'))

    end
    #show user who make pending requests from other user
    def pending_requests
    #    requests =  UserRelationship.where(other_user_id:self.id).where('user_relationships.relationship_type=?','Pending').includes(:user)
        User.joins('INNER JOIN user_relationships ON users.id = user_relationships.user_id').where('user_relationships.relationship_type = ?','Pending').where('user_relationships.other_user_id =?',self.id)
    end
    #show available poeple who not yet have the request
    def available_people(query)
        User.where('users.username LIKE ?',query + '%')
        .where.not(id:self.id)
        .where('NOT EXISTS (:u1) AND NOT EXISTS (:u2)',u1:UserRelationship
        .where('user_relationships.user_id=?',self.id)
        .where('users.id = user_relationships.other_user_id'),u2:UserRelationship
        .where('user_relationships.other_user_id = ?',self.id)
        .where('users.id = user_relationships.user_id'))

        # .where('user_relationships.relationship_type=?','Friend'))
        

    end

    #feed is the activities of the friend in public or friend mode    
    def feed
        my_activities = Activity.includes(:user, route:[thumb_attachment: :blob]).where(user_id:self.id)
        friend_activities = Activity.includes(:user, route:[thumb_attachment: :blob]).where.not('activities.privacy =?','Private')
        .where('EXISTS (:u)',u:User.where('EXISTS (:u1) OR EXISTS (:u2)',u1:UserRelationship.where('users.id = user_relationships.other_user_id')
        .where('user_relationships.user_id=?',self.id)
        .where('user_relationships.relationship_type =?','Friend'),u2:UserRelationship.where('users.id = user_relationships.user_id')
        .where('user_relationships.other_user_id = ?',self.id)
        .where('user_relationships.relationship_type=?','Friend')).where('users.id = activities.user_id'))
        
        return my_activities + friend_activities

    end
    #feed ids- use to feed only activity ids
    def feed_ids
        my_activities = Activity.select(:id).where(user_id:self.id)
        friend_activities = Activity.select(:id).where.not('activities.privacy =?','Private')
        .where('EXISTS (:u)',u:User.where('EXISTS (:u1) OR EXISTS (:u2)',u1:UserRelationship.where('users.id = user_relationships.other_user_id')
        .where('user_relationships.user_id=?',self.id)
        .where('user_relationships.relationship_type =?','Friend'),u2:UserRelationship.where('users.id = user_relationships.user_id')
        .where('user_relationships.other_user_id = ?',self.id)
        .where('user_relationships.relationship_type=?','Friend')).where('users.id = activities.user_id'))
        
        return my_activities + friend_activities

    end
    #the personal feed activity ids
    def personal_feed(other_user_id)
        if self.id == other_user_id
            return Activity.includes(:user, route:[thumb_attachment: :blob]).where(user_id:self.id)
        elsif UserRelationship.friend?(self.id,other_user_id)
            return Activity.includes(:user, route:[thumb_attachment: :blob]).where(user_id:self.id).where.not('activities.privacy =?','Private')
        else
            return Activity.includes(:user, route:[thumb_attachment: :blob]).where(user_id:self.id).where('activities.privacy =?','Public')
        end

    end


    #use to render the map to the last place that a user create -
    def last_route_location
        location = self.pins.last
        unless location.nil?
            return {lat:location.lat,lng:location.lng};
        end
        #return the location of SF if there is no last location
            return { lat: 37.7758, lng: -122.435 }
    end

    def self.login_by_credentials(user,pass)
        find_user = User.find_by(username:user)
        if find_user != nil
            return find_user if find_user.is_password?(pass)
            nil
        end
        nil
    end

    def is_password?(pass)
        password = BCrypt::Password.new(self.password_digest)
        password == pass
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save
        self.session_token
    end
    def birthday=(data)
        if data.is_a?(Date)
            self[:birthday] = data
        elsif data =~ /\d+\/\d+\/\d+/
            self[:birthday] = Date.strptime(data, "%d/%m/%y")
        elsif data =~ /\d+\-\d+\-\d+/
            self[:birthday] = Date.strptime(data, "%d/%m/%y")
        else
            tmp = Date.try(:parse,data.to_s)
            self[:birthday] = tmp if tmp != nil
        end
    end
    def age
        time_now = Date.parse(Time.now.to_s)
        age = ((time_now - self[:birthday])/365.0).ceil
    end


    private
    def generate_session_token
        SecureRandom.urlsafe_base64(16)
    end
    def ensure_session_token
        self.session_token ||= generate_session_token
    end
    # add the validation of age
    def should_older_than_fourteen
        unless self.age > 14  
            errors.add(:too_young, 'Only for people over 14')
        end
    end

end