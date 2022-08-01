export default class MarkerManager{
    constructor(map,directionsService,directionsRenderer){
        this.map = map;
        this.directionsService = directionsService;
        this.directionsRenderer = directionsRenderer;
        this.headTail = [];
        this.betweens = [];
        this.start_point = null;
        this.route_steps = [];

    }

    updateMarker(coords){
        if (this.headTail.length < 2){
            this.headTail.push({
            location: coords,
        })        
        }else{
            let tmp = this.headTail.pop();
            tmp['stopover'] = true
            this.headTail.push({
            location: coords,
            });
            this.betweens.push(tmp);
        }
        
    }
    removeMarker(coords){

    }
    renderRoute(){
        let customIcon ={
            path: "M -6 0 C -6 -9 -1 -7 6 0 Q -26 7 -6 0 T 6 0",
            fillColor: "blue",
            strokeWeight: 0,
            fillOpacity: 0.6,
            scale: 2,
            
        };
        let customIconRed ={
            path: "M -6 0 C -6 -9 -1 -7 6 0 Q -26 7 -6 0 T 6 0",
            fillColor: 'red',
            strokeWeight: 0,
            fillOpacity: 0.6,
            scale: 2,
        };
        // put the pin for the first marker
        if(this.headTail.length < 2){
            this.start_point = new google.maps.Marker({
                position: this.headTail[0].location,
                icon: customIcon,
                map: this.map,
            })
        }
        else{

            //now we can draw map with these data
            this.start_point.setMap(null);
            this.directionsService
            .route({
                origin: this.headTail[0],
                destination: this.headTail[1],
                waypoints: this.betweens,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.WALKING,
            }).then(
                response =>{
                    this.directionsRenderer.setOptions({
                        directions:response,
                        markerOptions:{
                            icon:customIconRed,
                        },
                    });
                    // this.directionsRenderer.setDirections(response);
                    // let steps = response.routes
                    // console.log('map respond',response.routes)
                    this.route_steps = response.routes[0].legs;
                    console.log('steps-as',this.route_steps );
                },
                errors => {
                    console.log('errors',errors)
                }

            )


        }
    }
    


}