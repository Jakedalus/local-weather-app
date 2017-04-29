var day = {
    "clear sky": "B",
    "few clouds": "H",
    "scatterd clouds": "N",
    "broken clouds": "Y",
    "shower rain": "Q",
    "rain": "R",
    "thunderstorm": "Z",
    "snow": "U",
    "heavy snow": "W",
    "mist": "M",
    "heavy thunderstorm": "Z",
    
};

var apiKey = "199bc837ab6787c238c84c4168582e41";

var weatherPanel = $("#weather");

navigator.geolocation.getCurrentPosition(function(location) {
    var lat = location.coords.latitude;
    var lon = location.coords.longitude;
    var acc = location.coords.accuracy;
    console.log(lat);
    console.log(lon);
    console.log(acc);
    
    var address = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
    console.log(address);
//    window.location = address;
    
    $.getJSON(address, function(data) {
        console.log(data);
        var todaysWeather = data.weather[0].description;
        var icon = day[todaysWeather];
        var tempK = data.main.temp;
        var tempF = Math.round(tempK * (9.0/5.0) - 459.67);
        var tempC = Math.round(tempK - 273.15);
        var humidity = data.main.humidity;
        var pressure = data.main.pressure;
        var windSpeed = data.wind.speed;
        var windDeg = data.wind.deg;
        
//        weatherPanel.text(todaysWeather);
        
        weatherPanel.append("<p><a href='' class='icon' data-icon=" + icon + "></a></p>");
        weatherPanel.append("<p>" + tempF + " " + tempC + "</p>");
        weatherPanel.append("<p>Humidity: " + humidity + "%</p>");
        weatherPanel.append("<p>Pressure: " + pressure + "</p>");
        weatherPanel.append("<p>Wind Speed: " + windSpeed + "</p>");
        weatherPanel.append("<p>Wind Direction: " + windDeg + "</p>");
        weatherPanel.append("<p>" + "</p>");
        
        
    });
    
    
});


