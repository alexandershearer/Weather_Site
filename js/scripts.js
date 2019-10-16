(function () {
    //Submit button event handler
    $("#submit").click(function(){
        //Get the value the user has entered in the search bar and store it
        const searchLocation = $("#searchBar").val();
        //Call the geocode function and pass in the value
        geocode(searchLocation);
        //Clear out the search bar
        $("#searchBar").val("");
    })
})();

function getWeatherInfo(ladtitude, longitude, city, state) {

    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + "37.8267,-122.4233", { dataType: "jsonp"})

    .done(function(data){
        console.log(data);
        let locations = data.results[0].locations[0];

        let lat = locations.latLng.lat;
        let lng = locations.latLng.lng;

        let city = locations.adminArea5;
        let state = locations.adminArea3;

        console.log(lat);
        console.log(lng);

        console.log(city);
        console.log(state);

        getWeatherInfo(lat, lng, city, state)
    })
    .fail(function(error){
        console.log(error);
    })
    .always(function(){
        console.log("Weather call complete!");
    })

}

function geocode(location) {
    $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + location)
    .done(function(data){
        console.log(data);
    })
    .fail(function(error){
        console.log(error);
    })
    .always(function() {
        console.log("Geociding call complete");
    })
}

(function () {
    $("#submit").click(function() {
        console.log("Submit button clicked");
    }) 
})();

