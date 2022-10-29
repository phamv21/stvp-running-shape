class RakeTest < ApplicationRecord
  def self.generate_random_name
    rand_name = SecureRandom.urlsafe_base64(16)
    RakeTest.create(name:rand_name)
  end
end
