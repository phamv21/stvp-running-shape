class Activity < ApplicationRecord
    #use it to record the activity of user
    validates :title, presence: true
    validates :starting_time, presence: true
    validates :duration, presence: true

    belongs_to :user
    belongs_to :route

    #get the infomation of the route
    def distance
        @route ||= self.route
        @route.distance
    end
    def thumb
        @route ||= self.route
        @route.thumb.url
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
            time_string += parts[0][1].to_s + ' ' + parts[0][0].to_s.capitalize
            time_string += parts[1][1].to_s + ' ' + parts[1][0].to_s.capitalize
        else
            time_string += parts[0][1].to_s + ' ' + parts[0][0].to_s.capitalize
        end
        time_string
    end
end
