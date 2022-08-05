export default class AutoCompleteSearch{
    constructor(map){
        this.map = map;
    }

    renderSearchBox(){
        const input = document.getElementById('auto-complete-search');
        const searchBox = new google.maps.places.SearchBox(input);
         this.map.addListener("bounds_changed", () => {
        searchBox.setBounds(this.map.getBounds());
        });

        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
                }
                if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
                } else {
                bounds.extend(place.geometry.location);
                }
            });
            this.map.fitBounds(bounds);
        })
    }
        
}