export default class MarkerManager{
    constructor(map,directionsService,directionsRenderer){
        this.map = map;
        this.directionsService = directionsService;
        this.directionsRenderer = directionsRenderer;
        this.headTail = [];
        this.betweens = [];
        this.start_point = null;
        this.route_steps = [];
        this.currentInfoWindow = null;
        this.callFormListener = false;

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
    createMarker(latlng,icon,idx){
    let contentString = `<form class='infowindow-form' id='form-${idx}'><input type='text' value='ploom'/> <input type='submit'/></form>`;
    const infowindow = new google.maps.InfoWindow({
        content:contentString
    });
    let marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      icon: icon,
    
    });
    marker.addListener('click',()=> {
        if(this.currentInfoWindow != null){
            this.currentInfoWindow.close();
        }

        infowindow.open({
          map:this.map,
          anchor: marker,
        });
        this.currentInfoWindow = infowindow;
        
        // let xx = $('#form-2').serializeArray();
        // console.log(xx)
    });
    }

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
        if(this.headTail.length < 2){
            this.start_point = new google.maps.Marker({
                position: this.headTail[0].location,
                icon: customIcon,
                map: this.map,
            })
        }
        else{
            const infoString = "<input type='text' id='stv'>"+"</div>"+"<button>Remove</button>"
            //now we can draw map with these data
            if(this.start_point != null){
                this.start_point.setMap(null);
            }
            this.directionsService
            .route({
                origin: this.headTail[0],
                destination: this.headTail[1],
                waypoints: this.betweens,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.WALKING,
            }).then(
                response =>{
                    window.stvp = response;
                    this.directionsRenderer.setOptions({
                        directions:response,
                        suppressMarkers: true,
                        
                    });
                    
                    const legs = response.routes[0].legs
                    this.headTail.forEach((el,idx) => this.createMarker(el.location,customIcon,idx))
                    this.betweens.forEach((el,idx) => this.createMarker(el.location,customIconRed,idx + 5))
                    
                    // this.directionsRenderer.setDirections(response);
                    // let steps = response.routes
                    // console.log('map respond',response.routes)
                    
                },  
                errors => {
                    console.log('errors',errors)
                }

            )


        }
        if(this.callFormListener == false){
            $('#map-container').on('submit','form',(e)=>{e.preventDefault(); console.log(e.currentTarget)});
            this.callFormListener = true
        }
    }
    


}