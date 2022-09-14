class Activity < ApplicationRecord
    #use it to record the activity of user
    Activity::FEEDPERPAGE = 5
    validates :title, presence: true
    validates :starting_time, presence: true
    validates :duration, presence: true

    belongs_to :user
    belongs_to :route

    has_many :comments, dependent: :destroy
    has_many :recent_comments, -> {order('created_at desc').limit(2)}, class_name: 'Comment'
    has_many :likes, dependent: :destroy
    
    # check showability of a activity
    def can_show?(user_id)
        return true if self.privacy == 'Public'
        return true if self.user_id == user_id
        if self.privacy == 'Private'
            return false
        elsif UserRelationship.friend?(self.user_id, user_id)
            return true
        else
            return false
        end        

    end
    #comments count
    def self.comment_count(activity_ids)
        q = Activity.select('activities.id, COUNT(comments.*) AS cc').joins('LEFT OUTER JOIN comments ON activities.id = comments.activity_id').group('activities.id').where('activities.id IN (?)',activity_ids)
        result = {}
        q.each do |el|
            result[el.id] = el.cc
        end
        result
    end
    #likes count
    def self.like_count(activity_ids)
        q = Activity.select('activities.id, COUNT(likes.*) AS lc').joins('LEFT OUTER JOIN likes ON activities.id = likes.activity_id').group('activities.id').where('activities.id IN (?)',activity_ids)
        result = {}
        q.each do |el|
            result[el.id] = el.lc
        end
        result
    end
    
    #check the the comment 
    def allow_to_comment?(other_user_id)
        return true if self.privacy == 'Private' && other_user_id == self.id
        return true if UserRelationship.friend?(self.user_id,other_user_id) && self.privacy != 'Private'
        return true if self.privacy == 'Public'
        false
    end

    

    #get the infomation of the route
    def distance
        @route ||= self.route
        @route.distance
    end
    def thumb
        @route ||= self.route
        url_for(@route.thumb)
    end
    def duration_text
        parts = ActiveSupport::Duration.build(self[:duration].to_i).parts
        h_p = parts[:hours] || 0
        m_p = parts[:minutes] || 0
        s_p = parts[:seconds] || 0
        time_string = [h_p,' Hours, ',m_p,' Minutes, ',s_p,' Seconds']
        time_string.join('')
    end
    def starting_time_text
        diff_seconds = Time.now  - Time.parse(self[:starting_time].to_s)
        parts = ActiveSupport::Duration.build(diff_seconds).parts.to_a[0,2]
        time_string = ''
        if parts.length > 1 
            time_string += parts[0][1].to_s + ' ' + parts[0][0].to_s.capitalize + ' '
            time_string += parts[1][1].to_s + ' ' + parts[1][0].to_s.capitalize
        else
            time_string += parts[0][1].to_s + ' ' + parts[0][0].to_s.capitalize
        end
        time_string
    end
end
