export default class MarkerManager{
    constructor(map,directionsService,directionsRenderer,isShowOnly=true){
        this.map = map;
        this.directionsService = directionsService;
        this.directionsRenderer = directionsRenderer;
        // this.headTail = [];
        // this.betweens = [];
        this.nodes =[];
        this.infoNodes =[]
        this.start_point = null;
        this.route_steps = [];
        this.currentInfoWindow = null;
        this.callFormListener = false;
        this.isShowOnly = isShowOnly;
        this.response = null;
        this.staticUrl = null;
    }

    updateMarker(coords,desc =''){
        // if (this.headTail.length < 2){
        //     this.headTail.push({
        //     location: coords,
        // })        
        // }else{
        //     let tmp = this.headTail.pop();
        //     tmp['stopover'] = true
        //     this.headTail.push({
        //     location: coords,
        //     });
        //     this.betweens.push(tmp);
        // }
        this.nodes.push({
            location:coords,
            description: desc||'No description'
        })
        
    }
    removeMarker(coords){

    }
    getPreviewURL(){
        if (this.response != null){
        let path = this.response.routes[0].overview_path;
        let encodedPath = google.maps.geometry.encoding.encodePath(path);
        let url = `https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:3%7Ccolor:red%7Cenc:${encodedPath}&key=${keys.map}`
        this.staticUrl = url;
        }
        
    }
    createMarker(latlng,icon,htb,idx,desc){
    let contentString = '';
        if(this.isShowOnly){
            contentString = `<span>${desc}</span>`
        }else{
            if(htb = "betweens"){
                contentString = `<form class='info-description-form' id='betweens-${idx}'><input type='text' name='description' value='${desc}'/> <input type='submit' value='Save' /></form>`
                + `<form class='info-delete-form' id='delete-betweens-${idx}'> <input type='submit' value='Delete'/></form>`;
            }{
                contentString = `<form class='info-description-form' id='headtail-${idx}'><input type='text' name='description' value='${desc}'/> <input type='submit' value='Save'/></form>`
                + `<form class='info-delete-form' id='delete-headtail-${idx}'><input type='submit' value='Delete'/></form>`;
            }
        }


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
    this.infoNodes.push(marker)
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
        if(this.nodes.length < 2){//this.headTail.length < 2){
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
            this.directionsService
            .route({
                origin: headTail[0],
                destination: headTail[1],
                waypoints: betweens,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.WALKING,
            }).then(
                response =>{
                    window.stvp = response;
                    this.directionsRenderer.setOptions({
                        directions:response,
                        suppressMarkers: true,
                        
                    });
                    
                     this.route_steps = response.routes[0].legs
                     this.response = response
                    // headTail.forEach((el,idx) => this.createMarker(el.location,customIcon,`ht-${idx}`))
                    // betweens.forEach((el,idx) => this.createMarker(el.location,customIconRed,`b-${idx}`))
                    this.nodes.forEach((el,idx)=>{
                        if(idx == 0 || idx == nodesLength -1){
                            this.createMarker(el.location,customIconRed,'headTail',idx,el.description);
                        }else{
                            this.createMarker(el.location,customIcon,'between',idx,el.description);
                        }
                    })
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
    
    

}