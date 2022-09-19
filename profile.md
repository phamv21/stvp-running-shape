# **MapNRun**
----
[MapNRun](https://mapnru.heroku.com) is a web application inspired by MapMyRun which is a social fitness website that allows for user running route creation. Users can log workout details, including duration, distance, and the map of their route, they can also see the activities of their friends.The app was created with React.js and Redux on the frontend, and Ruby on Rails/PostgreSQL on the backend.

The project was designed and built in a week, with some additional improvements added later on.
---
# **Hightlights**
---
* Integrates Google Maps API to create run routes, generate static thumbnail, mangage the route details and enable distance tracking based on geolocation
* Using Amazon Cloud Service to storage map thumbnails 
* Adheres to React and ES6 best practices to generate a true single page reactive web app experience
* Developed a fluid UI to mimic the original website using SASS and HTML5
Implemented user authentication with BCrypt password encryption


![alt text][homeimg]

# **Features**
---
## **Route creation**
![alt text][createrouteimg]
### - **Using Google Maps API to render route and caculate the distance**
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

### - **Using Amazon Could Service to storage the static thubnails**
----
## **Activity Feed**
## **Activity Creation**
[picture]
* 

## **Friending** 



[homeimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/Home.png?raw=true "Home"

[activitiesimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/activities.png "Activities"

[addactivityimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/add%20activity.png "Add Activity"

[createrouteimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/create%20route.png "Create New Route"

[feedimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/feed.png "Feed"

[friendsimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/friends.png "Friends"

[routeimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/routes.png "Routes"

[searchroutesimg]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/search%20routes.png "Search"

[showroutesearch]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/show%20route%20search.png "Search Show"

[showroute]: https://github.com/phamv21/stvp-running-shape/blob/main/app/assets/screenshots/show%20route.png "Show Route"


