class Pin < ApplicationRecord
    validates :lat, presence: true
    validates :lng, presence: true

    belongs_to :route
end
