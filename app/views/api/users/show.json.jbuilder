# json.extract! @user, :id, :username, :email, :gender, :age
json.partial! 'api/users/user', user:@user