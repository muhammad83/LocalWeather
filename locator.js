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
    var url = getWeatherApiURL(lat, long, "current");
    // console.log("complete url", url);

    $.getJSON(
        url,
        function(data){
            populateOutput(data);
            
        }
    );

    getLocationName(lat,long);
    getExtendedWeather(lat,long);
}

function getWeatherApiURL(lat, long, weatherType){
    var urlArgs=[
        "key=" + "0326246174cb4404b38115224171803",
        "q=" +  lat + "," + long
    ]
    return "https://api.apixu.com/v1/" + weatherType + ".json?" + urlArgs.join("&");
}

function populateOutput(data){
    var location = data.current;
    var temp = location.temp_c;
    var icon = location.condition.icon.replace("//", "https://");
    var condition = location.condition.text;

    // console.log("address ", icon, "icon ", location.condition.icon);
    // console.log("temp in centi", temp, "remaining temp data", data);

    $("#header").html("<h1>" + data.location.name + "</h1>" +
        "<h2 class=sm> Now </h2>" +
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
    // console.log("complete url", url);

    $.getJSON(
        url,
        function(data){
            var address = data.results[0].formatted_address;
            // console.log("google reverse geolocation!", address, data);
            // $("#address").html("Your approximate address"+ "<p>" + address + "</p>");
        }
    );
}

function getExtendedWeather(lat, long){
    var url = getWeatherApiURL(lat, long, "forecast") + "&days=10";

    // console.log("complete url", url);

    $.getJSON(
        url,
        function(data){
            // console.log("this is the extended forcast",data);
            extendedWeatherTable(data);
        }
    );
}

function extendedWeatherTable(data){
    var daysDetail = data.forecast.forecastday;
    

  var dataHolder = [];
  var dataPropertyHolder = [];

  var apiProp = Object.keys(daysDetail[0].hour[0]);

  for(index in apiProp){
              dataPropertyHolder.push(apiProp[index]);
            //   console.log(`props ${apiProp[index]}`);
          }


  for(i in daysDetail){
      console.log(daysDetail[i]);
    //   for(hour in daysDetail[i].hour){
    //       var hourProp = daysDetail[i].hour[hour];
    //       console.log("hour breaks: " + hourProp);
    //     //   dataHolder.push("<div>");
    //     //   var props = Object.keys(hourProp);
    //     //   dataHolder.push(props);
    //     //   dataHolder.push(hourProp.props);
    //     //   dataHolder.push("</div>");

    //     //   console.log("properties", hourProp, props, hourProp[hour]);

          
    //   }
      dataHolder.push("<div>") 
      dataHolder.push("<h2>" + moment(daysDetail[i].date).format("ddd Do MMM YY")+"</h2>");
      var icon = daysDetail[i].day.condition.icon.replace("//", "https://");
      var condition = daysDetail[i].day.condition.text;
      dataHolder.push("<h6>" + condition + "</h6>");
      dataHolder.push("<p><img src=\"" + icon + "\" alt=\"" + condition + "\"> </p>");
      dataHolder.push("<h2>" + daysDetail[i].day.avgtemp_c + "&deg;C </h2>");
      dataHolder.push("<p> Max temp: " + daysDetail[i].day.maxtemp_c + "&deg;C </p>");
      dataHolder.push("<p> Min temp: " + daysDetail[i].day.mintemp_c + "&deg;C </p>");
      dataHolder.push("<p> Average humidity: " + daysDetail[i].day.avghumidity + "%</p>");
      dataHolder.push("<p> Sunrise: " + daysDetail[i].astro.sunrise + "</p>");
      dataHolder.push("<p> Sunset: " + daysDetail[i].astro.sunset + "</p");
      dataHolder.push("</div>");
  
}
//   document.getElementById("extended").innerHTML = dataHolder;

var result="";
for(i= dataHolder.length-1; i>=0;i--){
    result=dataHolder[i]+result;
}

document.getElementById("extended").innerHTML=result;
}