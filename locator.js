var googleApiKey = "AIzaSyD7a6SZiDVeiksRF9hwc7-2A2JY5HF5KWI";

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    getCurrentWeather(latitude, longitude);

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

function getCurrentWeather(lat, long){
    console.log("and the weather is!");

    var urlArgs=[
        "key=" + "0326246174cb4404b38115224171803",
        "q=" +  lat + "," + long
    ]
    var url = "http://api.apixu.com/v1/current.json?" + urlArgs.join("&");
    console.log("complete url", url);

    $.getJSON(
        url,
        function(data){
            alert("here i am this is me!")
            console.log("where am i!");
            var temp = data.temp_c;
            // var temp = data.name;
            console.log("temp in centi", temp, "remaining temp data", data);
            $("#test").html("hello "+ temp);
        }
    );
}