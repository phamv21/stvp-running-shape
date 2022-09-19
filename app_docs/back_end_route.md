# **Backend Routes**
----

## **HTML**
---
* `GET /` - `StaticPagesController#root`
---
## **API Endpoints**
---
### **users**
* `GET /api/users/:id` - returns the user information 
* `POST /api/users` - sign up
* `UPDATE /api/users/:id`  -update user information
### **session**
* `POST /api/session` - log in
* `DELETE /api/session` - log out
### **routes**
* `GET /api/routes` - returns current user’s created routes
* `POST /api/routes/search` – return relevant routes (filtered by data/ params)
* `GET /api/chirps/:id` - returns route
* `POST /api/chirps` - creates a route (with relevant pins)
### **Activities**
* `GET /api/activities` – return current user’s activity
* `GET /api/activities/:id` – return an activity
* `DELETE /api/activities/:id` – delete an activity
* `POST /api/activities` – create an activity
* `GET /api/activities_feed` -  return current user’s feed
* `GET /api/profile/:id/feed` – return a public activity of a user	
### **likes**
* `POST /api/likes` - like an activity
* `DELETE /api/likes/:id` - unlike an activity
Note: likes does not include a GET route because we will have these routes render the api/activities/show.json.jbuilder view.  
### **comments**
* `GET /api/comments` – show all comments on an activity
* `POST /api/comments/` - create a comment
### **user_relationships**
* `POST /api/user_relationships/find` – return all available users with filtered (data/params)
* `GET /api/user_relationships/friends` – return all friends
* `GET /api/user_relationships/requested_friends` – return all people that current user has send request
* `GET /api/user_relationships/pending_requests` – return all friend requests from other user
* `DELETE /api/user_relationships/:id` – unfriend or cancel a friend request
* `POST /api/user_relationships` – make a friend request
* `POST /api/user_relationships/respond` – accept or reject a request that has identify with a params
	




