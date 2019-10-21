(function () {
    //Submit button event handler
    $("#submit").click(function () {
        //Get the value the user has entered in the search bar and store it
        const searchLocation = $("#searchBar").val();
        //Call the geocode function and pass in the value
        geocode(searchLocation);
        //Clear out the search bar
        $("#searchBar").val("");
    });

    //When a button is clicked with the ID of remove in the document, call the function
    $(document).on("click", "button#remove", function () {
        //Get parent element of the button
        let parentDiv = $(this).parent(); //This refers to the element that triggered the event handler (in this case the button that was clicked)
        //Get the parent of the div containing the button
        let weatherCardContainer = parentDiv.parent();
        //Remove the container and all of its contents
        weatherCardContainer.remove();
    });
})();

function getWeatherInfo(latitude, longitude, city, state) {

    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," + longitude, { dataType: "jsonp" })

        .done(function (data) {
            //Get the HTML from the div with the ID template
            let templateHTML = $("#template").html();

            //We need to get the temperature from the Dark Sky data
            let temperature = data.currently.temperature;
            let conditions = data.currently.summary;
            let weatherIcon = data.currently.icon;

            let currentDayInfo = data.daily.data[0];
            let highTemp = currentDayInfo.temperatureHigh;
            let lowTemp = currentDayInfo.temperatureLow;
            let precipChance = currentDayInfo.precipProbability * 100;


            //Get city state from data

            //Replace  the string "@@city@@" with the city we pass into this function in the html
            templateHTML = templateHTML.replace("@@city@@", city);

            //Replace the string @@currentTemp@@ with the temp we pass into this function
            templateHTML = templateHTML.replace("@@currentTemp@@", Math.round(temperature));
            //Replacing the string @@citystate@@ with city and state we pass
            templateHTML = templateHTML.replace("@@cityState@@", city + ", " + state);

            templateHTML = templateHTML.replace("@@conditions@@", conditions);

            templateHTML = templateHTML.replace("@@high@@", Math.round(highTemp));
            templateHTML = templateHTML.replace("@@low@@", Math.round(lowTemp));
            templateHTML = templateHTML.replace("@@precipitation@@", Math.round(precipChance));

            templateHTML = templateHTML.replace("@@imageURL@@", getBackgroundPath(weatherIcon));


            for (var i = 0; i < 5; i++) {
                //Set the date for each day
                if (i > 0) {
                    //Get current date, and add i days to it
                    let date = new Date();
                    date.setDate(date.getDate() + i);

                    //Get the month (0-11) from the date and add 1 to it for accuracy
                    let month = date.getMonth() + 1;
                    //Get dat from the date
                    let day = date.getDate();

                    //Replace the placeholder text in the template for date i
                    templateHTML = templateHTML.replace("@@date" + i + "@@", month + "/" + day);
                }

                //Get weather data for the day based on i
                let currentDayWeatherData = data.daily.data[i];

                templateHTML = templateHTML.replace("@@max" + i + "@@", Math.round(currentDayWeatherData.temperatureMax));
                templateHTML = templateHTML.replace("@@low" + i + "@@", Math.round(currentDayWeatherData.temperatureMin));
                templateHTML = templateHTML.replace("@@precip" + i + "@@", Math.round(currentDayWeatherData.precipProbability * 100));
                

            }

            //Add the configured template HTML to our row in the card container
            $(".row").append(templateHTML);

        })
        .fail(function (error) {
            console.log(error);
        })
        .always(function () {
            console.log("Weather call complete!");
        })

}

function geocode(location) {
    $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + location)
        .done(function (data) {
            let locations = data.results[0].locations[0];

            let lat = locations.latLng.lat;
            let lng = locations.latLng.lng;

            let city = locations.adminArea5;
            let state = locations.adminArea3;


            getWeatherInfo(lat, lng, city, state)
        })
        .fail(function (error) {
            console.log(error);
        })
        .always(function () {
            console.log("Geociding call complete");
        })
}

function getBackgroundPath(iconString) {
    switch (iconString) {
 
        case "clear-day":
            return "..//img/clear-day.jpg";
        case "clear-night":
            return "..//img/clear-night.jpg";
        case "cloudy":
            return "..//img/cloudy.jpg";
        case "fog":
            return "..//img/fog.jpg";
        case "partly-cloudy-day":
            return "..//img/partly-cloudy-day.jpg";
        case "partly-cloudy-night":
            return "..//img/partly-cloudy-night.jpg";
        case "rain":
            return "..//img/rain.jpg";
        case "sleet":
            return "..//img/sleet.jpg";
        case "snow":
            return "..//img/snow.jpg";
        case "wind":
            return "..//img/wind.jpg";
        default:
            return "..//img/clear-day.jpg";

    }
}


    (function () {
        $("#submit").click(function () {
            console.log("Submit button clicked");
        })
    })();

