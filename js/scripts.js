(function () {
    getWeatherInfo();
    geocode();
})();

function getWeatherInfo() {

    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + "37.8267,-122.4233", { dataType: "jsonp"})

    .done(function(data){
        console.log(data);
    })
    .fail(function(error){
        console.log(error);
    })
    .always(function(){
        console.log("Weather call complete!");
    })

}

function geocode() {
    $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=Washington,DC")
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