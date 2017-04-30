var daySymbol = {
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
    "heavy thunderstorm": "Z"
};

var translate = {
    // THUNDERSTORMS
    "thunderstorm with light rain": "thunderstorm",
    "thunderstorm with rain": "thunderstorm",
    "thunderstorm with heavy rain": "thunderstorm",
    "light thunderstorm": "thunderstorm",
    "thunderstorm": "thunderstorm",
    "heavy thunderstorm": "thunderstorm",
    "ragged thunderstorm": "thunderstorm",
    "thunderstorm with light drizzle": "thunderstorm",
    "thunderstorm with drizzle": "thunderstorm",
    "thunderstorm with heavy drizzle": "thunderstorm",
    // DRIZZLE
    // RAIN
    // SNOW
    // CLOUDS
    "few clouds": "few clouds",
    "scattered clouds": "scattered clouds",
    "broken clouds": "broken clouds",
    "overcast clouds": "broken clouds"
}

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
        var description = data.weather[0].description;
        var main = translate[description];
        var icon = daySymbol[main];
//        var icon = data.weather[0].icon;
        var tempK = data.main.temp;
        var tempF = Math.round(tempK * (9.0/5.0) - 459.67);
        var tempC = Math.round(tempK - 273.15);
        var humidity = data.main.humidity;
        var pressure = data.main.pressure;
        var windSpeed = data.wind.speed;
        var windDeg = data.wind.deg;
        
//        weatherPanel.text(todaysWeather);
        weatherPanel.append("<h3>" + data.name + "</h3>");
        weatherPanel.append("<p><a href='' class='icon' data-icon=" + icon + "></a></p>");
        weatherPanel.append("<p class='text-capitalize lead'>" + description + "</p>");
        console.log(icon);
//        weatherPanel.append("<i class='owf owf-" + icon + "'></i>");
        weatherPanel.append("<p>" + tempF + " " + tempC + "</p>");
        weatherPanel.append("<p>Humidity: " + humidity + "%</p>");
        weatherPanel.append("<p>Pressure: " + pressure + "</p>");
        weatherPanel.append("<p>Wind Speed: " + windSpeed + "</p>");
        weatherPanel.append("<p>Wind Direction: " + windDeg + "</p>");
        weatherPanel.append("<p>" + "</p>");
        
        
    });
    
    
});


