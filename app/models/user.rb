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
    # add the validation of age
    

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
    def should_older_than_fourteen
        unless self.age > 14  
            errors.add(:birthday, 'Only for people over 14')
        end
    end

end
