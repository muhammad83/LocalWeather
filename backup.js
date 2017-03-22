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
    // getLocationName(latitude, longitude);
    getCurrentWeather(latitude, longitude);
    // testWeather(latitude, longitude);

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

function getLocationName(lat, long){
    console.log("location this and that!");
    var url = 'http://locationiq.org/v1/reverse.php?format=json&key=a70dcc8547c530a5fb71&lat='+lat+'&lon='+long+'&zoom=16';
    //var url2 = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=" + googleApiKey
    
    var urlArgs = [
        "latlng=" + lat + "," + long,
        "key=" + googleApiKey
    ];
    var url = "https://maps.googleapis.com/maps/api/geocode/json?" + urlArgs.join("&");
    console.log("complete url", url);

    $.getJSON(
        url,
        function(data){
            // console.log("fuck me!", data.display_name, data.address);
            var address = data.results[0].formatted_address;
            console.log("google reverse geolocation!", address);
            $("#test").html("hello "+ address);
        }
    );
}

// function getLocationName(lat, long){
//      $.ajax({
//           url: 'https://maps.googleapis.com/maps/api/geocode/json?',
//           data: 'latlng='
//           type: 'GET',
//           dataType: 'json',
//           success: function(data) { 
//               alert('hello!'); 
//               var address = data.results[0].formatted_address;
//             console.log("google reverse geolocation!", address);
//             $("#test").html("hello "+ address);
//             },
//           error: function() { alert('boo!'); },
//           beforeSend: function (xhr) {
//         xhr.setRequestHeader('key', 'AIzaSyD7a6SZiDVeiksRF9hwc7-2A2JY5HF5KWI');
//         xhr.setRequestHeader('latlng', lat+long);
//       }
//         });
      
// }

function getCurrentWeather(lat, long){
    console.log("and the weather is!");

    var urlArgs=[
        "key=" + "0326246174cb4404b38115224171803",
        "q=" +  lat + "," + long
    ]
    var url = "http://api.apixu.com/v1/current.json?" + urlArgs.join("&");
    console.log("complete url", url);

    // var url2Args=[
    //     "lat=" + lat,
    //     "lon=" + long,
    //     "APPID=" +  "88bee0fe4ab82031f27c900e8199348d"
    // ]
    // var url2 = "http://api.openweathermap.org/data/2.5/weather?" + url2Args.join("&");
    // console.log("complete url", url2);

    $.getJSON({
        url,
        function(data){
            alert("here i am this is me!")
            console.log("where am i!");
            var temp = data.temp_c;
            // var temp = data.name;
            console.log("temp in centi", temp, "remaining temp data", data);
            $("#test").html("hello "+ temp);
        }
    }).done({
        function(data){
         console.log("where am i!");
            var temp = data.temp_c;
            // var temp = data.name;
            console.log("temp in centi", temp, "remaining temp data", data);
            $("#test").html("hello "+ temp);   
        }
    })
    .fail({
        function(data){
            console.log("the request failed with the reason ", data);
        }
    });
}

function testWeather(lat, long){

var urlArgs=[
        "key=" + "0326246174cb4404b38115224171803",
        "q=" +  lat + "," + long
    ]
    var url = "http://api.apixu.com/v1/current.json?" + urlArgs.join("&");
    console.log("complete url", url);

 $.getJSON( url, 
        function(data){
            console.log("where am i!");
            var temp = data.feelslike_c;
            // var temp = data.name;
            console.log("temp in centi", temp, "remaining temp data", data);
            $("#test").html("hello "+ temp);   
        }
);
//   .done(function(data){
//          console.log("where am i!");
//             var temp = data.temp_c;
//             // var temp = data.name;
//             console.log("temp in centi", temp, "remaining temp data", data);
//             $("#test").html("hello "+ temp);   
//         })
//   .fail(function() {
//     console.log( "error" );
//   })
//   .always(function() {
//     console.log( "complete" );
//   });
}