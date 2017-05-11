// TODO:
        // [] SWITCH BETWEEN ºF and ºC
        // [] CHANGE BACKGROUND COLOR DEPENDING ON WEATHER
        // [] CHANGE ICONS DEPENDING ON DAY OR NIGHT
        // [] CHANGE BACKBROUND COLOR DEPENDING ON TIME
        //

// METEOCONS DATA
var daySymbol = {
    "clear sky": "B",
    "few clouds": "H",
    "scatterd clouds": "N",
    "broken clouds": "Y",
    "shower rain": "Q",
    "rain": "R",
    "thunderstorm": "O",
    "snow": "U",
    "heavy snow": "W",
    "mist": "M",
    "heavy thunderstorm": "Z"
};

var nightSymbol = {
    "clear sky": "2",
    "few clouds": "4",
    "scatterd clouds": "5",
    "broken clouds": "%",
    "shower rain": "7",
    "rain": "8",
    "thunderstorm": "6",
    "snow": "\"",
    "heavy snow": "#",
    "mist": "M",
    "heavy thunderstorm": "&"
};

var translate = {
    // THUNDERSTORMS
    "thunderstorm with light rain": "thunderstorm",
    "thunderstorm with rain": "thunderstorm",
    "thunderstorm with heavy rain": "thunderstorm",
    "light thunderstorm": "thunderstorm",
    "thunderstorm": "thunderstorm",
    "heavy thunderstorm": "heavy thunderstorm",
    "ragged thunderstorm": "thunderstorm",
    "thunderstorm with light drizzle": "thunderstorm",
    "thunderstorm with drizzle": "thunderstorm",
    "thunderstorm with heavy drizzle": "thunderstorm",
    // DRIZZLE
    "light intensity drizzle": "shower rain",
    "drizzle": "shower rain",
    "heavy intensity drizzle": "shower rain",
    "light intensity drizzle rain": "shower rain",
    "drizzle rain": "shower rain",
    "heavy intensity drizzle rain": "shower rain",
    "shower rain and drizzle": "shower rain",
    "heavy shower rain and drizzle": "shower rain",
    "shower drizzle": "shower rain",
    // RAIN
    "light rain": "rain",
    "moderate rain": "rain",
    "heavy intensity rain": "rain",
    "very heavy rain": "rain",
    "extreme rain": "rain",
    "freezing rain": "snow",
    "light intensity shower rain": "shower rain",
    "shower rain": "shower rain",
    "heavy intensity shower rain": "shower rain",
    "ragged shower rain": "shower rain",
    // SNOW
    "light snow": "snow",
    "snow": "snow",
    "heavy snow": "snow",
    "sleet": "snow",
    "shower sleet": "snow",
    "light rain and snow": "snow",
    "rain and snow": "snow",
    "light shower snow": "snow",
    "shower snow": "snow",
    "heavy shower snow": "snow",
    // ATMOSPHERE
    
    // CLOUDS
    "few clouds": "few clouds",
    "scattered clouds": "scattered clouds",
    "broken clouds": "broken clouds",
    "overcast clouds": "broken clouds"
}


// $ HANDLES
var $weatherPanel = $("#weather");
var $city = $("#city");
var $symbol = $("#symbol");
var $descirption = $("#descirption");
var $temp = $("#temp");
var $humidity = $("#humidity");
var $pressure = $("#pressure");
var $windSpeed = $("#windSpeed");
var $windDirection = $("#windDirection");



var apiKey = "199bc837ab6787c238c84c4168582e41";

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
        var city = data.name;
        var description = data.weather[0].description;
        var main = translate[description];
        var icon = "<a href='' class='icon' data-icon=" + daySymbol[main]  + "></a>";
        var tempK = data.main.temp;
        var tempF = Math.round(tempK * (9.0/5.0) - 459.67) + "ºF ";
        var tempC = Math.round(tempK - 273.15)  + "ºC ";
        var tempF_span = tempF + "ºF ";
        var tempC_span = tempC + "ºC ";
        var humidity = "Humidity: " + data.main.humidity  + "%";
        var pressure = "Pressure: " + data.main.pressure;
        var windSpeed = "Wind Speed: " + data.wind.speed;
        var windDirection = "Wind Direction: " + data.wind.deg;
        var sunrise = data.sys.sunrise;
        var sunset = data.sys.sunset;
        

        // MAIN WEATHER PANEL
        $city.text(city);
        $symbol.html(icon);
        $descirption.text(description).css("text-transform", "capitalize").addClass("lead");
        $temp.text(tempF);
        $humidity.text(humidity);
        $pressure.text(pressure);
        $windSpeed.text(windSpeed);
        $windDirection.text(windDirection);
        
        
        
        
    });
    
    
});


