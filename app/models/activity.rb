class Activity < ApplicationRecord
    #use it to record the activity of user
    validates :title, presence: true
    validates :starting_time, presence: true
    validates :duration, presence: true

    belongs_to :user
    belongs_to :route

end
