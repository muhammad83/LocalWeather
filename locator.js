var googleApiKey = "AIzaSyD7a6SZiDVeiksRF9hwc7-2A2JY5HF5KWI";
$( document ).ready(
    function(){
         var output = document.getElementById("out");

        if (!navigator.geolocation){
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }

        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;
            getCurrentWeather(latitude, longitude);
        }

        function error() {
            output.innerHTML = "Unable to retrieve your location";
        }

        output.innerHTML = "<p>Locating...</p>";

        navigator.geolocation.getCurrentPosition(success, error);
    }
); 

function getCurrentWeather(lat, long){
    var url = getWeatherApiURL(lat, long);
    console.log("complete url", url);

    $.getJSON(
        url,
        function(data){
            populateOutput(data);
            
        }
    );

    getLocationName(lat,long);
}

function getWeatherApiURL(lat, long){
    var urlArgs=[
        "key=" + "0326246174cb4404b38115224171803",
        "q=" +  lat + "," + long
    ]
    return "http://api.apixu.com/v1/current.json?" + urlArgs.join("&");
}

function populateOutput(data){
    var location = data.current;
    var temp = location.temp_c;
    var icon = location.condition.icon.replace("//", "http://");
    var condition = location.condition.text;

    console.log("address ", icon, "icon ", location.condition.icon);
    console.log("temp in centi", temp, "remaining temp data", data);

    $("#header").html("<h1>" + data.location.name + "</h1>" +
        "<h6 class=sm>" + condition + "</h6>"
    );
    $("#out").html(
        "<p><img src=\"" + icon + "\" alt=\"" + condition + "\"> </p>" +
        "<h2>" + location.temp_c + "&deg;C </h2>" +
        "<p>Feels like = " + location.feelslike_c + "&deg;C </p>" +
        "<p>Humidity = " + location.humidity + "%</p>" +
        "<p>Wind speed = " + location.wind_mph + "mph </p>" 
        );
}

function getLocationName(lat, long){
    var urlArgs = [
        "latlng=" + lat + "," + long,
        "key=" + googleApiKey
    ];
    var url = "https://maps.googleapis.com/maps/api/geocode/json?" + urlArgs.join("&");
    console.log("complete url", url);

    $.getJSON(
        url,
        function(data){
            var address = data.results[0].formatted_address;
            console.log("google reverse geolocation!", address, data);
            $("#address").html("Your approximate address"+ "<p>" + address + "</p>");
        }
    );
}