# **MapNRun**
----
[MapNRun](https://mapnrun.heroku.com) is a web application inspired by MapMyRun, a social fitness website that allows users to create the running route. Users can log workout details, including duration, distance, and the map of their route. They can also see the activities of their friends. The app was created with React.js and Redux on the frontend and Ruby on Rails/PostgreSQL on the backend.

The project was designed and built in a week, adding some additional improvements later.
---
# **Hightlights**
---
* Integrates Google Maps API to create run routes, generate a static thumbnail, manage the route details and enable distance tracking based on geolocation
* Using Amazon Simple Storage Service to storage map thumbnails 
* Adheres to React and ES6 best practices to generate a true single-page reactive web app experience
* Developed a fluid UI to mimic the original website using HTML5
Implemented user authentication with BCrypt password encryption

![alt text][homeimg]

# **Features**
---
## **Route creation**
![alt text][createrouteimg]

### - **Using Google Maps API to render route and calculate the distance**
### - **Using Google Maps API to manage the pins' note(description)**
<details>
<summary>Show the Code</summary>

```javascript
renderRoute(){
        let customIcon ={
            path: "M 0 -2 C -2 -2 -2 1 0 1 S 2 -2 0 -2",
            fillColor: "blue",
            strokeWeight: 0,
            fillOpacity: 0.8,
            scale: 3,
            
        };
        let customIconRed ={
            path: "M 0 -2 C -2 -2 -2 1 0 1 S 2 -2 0 -2",
            fillColor: 'red',
            strokeWeight: 0,
            fillOpacity: 0.8,
            scale: 3,
        };
        // put the pin for the first marker
        if(this.nodes.length < 2){
            this.start_point = new google.maps.Marker({
                position: this.nodes[0].location,
                icon: customIcon,
                map: this.map,
            })
            
        }
        else{
            //now we can draw map with these data
            if(this.start_point != null){
                this.start_point.setMap(null);
            }
            const nodesLength = this.nodes.length
            const headTail = [{location:this.nodes[0].location},{location:this.nodes[nodesLength-1].location}]
            let tmp = this.nodes.slice(1,-1)
            const betweens = tmp.map(el => { return {
                location:el.location,
                stopover:true,
            };});
            return this.directionsService
            .route({
                origin: headTail[0],
                destination: headTail[1],
                waypoints: betweens,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.WALKING,
            }).then(
                response =>{
                    this.directionsRenderer.setOptions({
                        directions:response,
                        suppressMarkers: true,
                        
                    });
                    
                    this.route_steps = response.routes[0].legs;
                    this.response = response;
                    this.nodes.forEach((el,idx)=>{
                        if(idx == 0 || idx == nodesLength -1){
                            this.createMarker(el.location,customIconRed,'headTail',idx,el.description);
                        }else{
                            this.createMarker(el.location,customIcon,'between',idx,el.description);
                        }
                    })
                    
                },  
                errors => {
                    console.log('render map errors',errors)
                }
            )

        }
        if(this.callFormListener == false){
            // add listening for description
            $('#map-container').on('submit','.info-description-form',(e)=>{
                e.preventDefault(); 
                let currentForm = e.currentTarget;
                let formData = new FormData(currentForm);
                let nId = parseInt(currentForm.id.slice(9));
                this.nodes[nId]['description'] = formData.get('description');
            });

            //add the delete handler
            $('#map-container').on('submit','.info-delete-form',(e)=>{
                e.preventDefault(); 
                let currentForm = e.currentTarget;
                let nId = parseInt(currentForm.id.slice(16))
                this.currentInfoWindow.close();
                this.infoNodes.forEach(el => {
                    google.maps.event.clearInstanceListeners(el);
                    el.setMap(null)
                })
                this.infoNodes = [];
                this.nodes.splice(nId,1);
                this.renderRoute();

            });
            this.callFormListener = true
        }
    }
```

</details>


### - **Using Google Maps Static API to generate the static thumbnail for the route**
![alt text][staticimg]
<details>
<summary>Show the Code</summary>

``` javascript
getPreviewURL(){
        if (this.response != null){
        let encodedPath = this.response.routes[0].overview_polyline
        let url = `https://maps.googleapis.com/maps/api/staticmap?size=200x200&path=weight:3%7Ccolor:red%7Cenc:${encodedPath}&key=${keys.map}&v=beta&callback=initMap`
        return url;
        }else{
            return null;
        }
        

    }
```
</details>

### - **Using Amazon Simple Storage Service to store the static thumbnails**
----
## **User's Activities**
<details>
<summary><b>Show the personal summary and all of the activities has created by the user.</b></summary>

![alt text][activitiesimg]
</details>
 
---
## **Activity Feed**
<details>

<summary><b>The Feed showing friend's activities with like and comment fuctions.</b></summary>

![alt text][feedimg]
</details>

---

## **Activity Creation**
<details>

<summary><b>Users can create the activity from the list of their created routes.</b></summary>

![alt text][addactivityimg]
</details>

---

## **Friending** 

<details>

<summary><b>User can search friends, send friends' requests, unfriend.</b></summary>

![alt text][friendsimg]
</details>

---

# **Additional Resources**

---

* [**MVP**][mvp]
* [**Schema**][schema]
* [**Sample State**][state]
* [**Frontend Routes**][front-end]
* [**Backend Routes**][back-end]


[homeimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/Home.png?raw=true "Home"

[activitiesimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/activities.png?raw=true "Activities"

[addactivityimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/add%20activity.png?raw=true "Add Activity"

[createrouteimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/create%20route.png?raw=true "Create New Route"

[feedimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/feed.png?raw=true "Feed"

[friendsimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/friends.png?raw=true "Friends"

[routesimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/routes.png?raw=true "Routes"

[searchroutesimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/search%20routes.png?raw=true "Search"

[showroutesearch]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/show%20route%20search.png?raw=true "Search Show"

[showroute]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/show%20route.png?raw=true "Show Route"

[staticimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/staticmap.png?raw=true "Static Image"

[mvp]: https://github.com/phamv21/stvp-running-shape/blob/main/app_docs/mvp.md
[schema]: https://github.com/phamv21/stvp-running-shape/blob/main/app_docs/schema.md
[back-end]: https://github.com/phamv21/stvp-running-shape/blob/main/app_docs/back_end_route.md
[front-end]: https://github.com/phamv21/stvp-running-shape/blob/main/app_docs/front_end_routes.md
[state]: https://github.com/phamv21/stvp-running-shape/blob/main/app_docs/state_sample.md

