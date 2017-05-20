// TODO:
        // [x] SWITCH BETWEEN ºF and ºC
        // [x] CHANGE BACKGROUND COLOR DEPENDING ON WEATHER
        // [] CHANGE ICONS DEPENDING ON DAY OR NIGHT
        // [x] CHANGE BACKBROUND COLOR DEPENDING ON TIME
        // [] MAKE PAGE REFRESH EVERY 10 MIN 
        // [x] ADD STAND IN TABLE TO LOADS MORE SMOOTHLY
        // [] ADD SEARCH SO CAN GET CURRENT WEATHER IN OTHER LOCATIONS
        //


//var apiKey = "199bc837ab6787c238c84c4168582e41";
var wundergroundKey = "74f55ad8f8ecebb4";

// COLOR DATA
var timeColor = {
    "dawn": "#FFECC2",
    "morning": "#8A9493",
    "day": "#004890",
    "magic hour": "#D09F68",
    "sunset": "#951401",
    "dusk": "#4656CE",
    "night": "#040C1F",
};

function dayPartition(time, sunrise, sunset) {
    if(time >= sunrise - 1 && time < sunrise + 2) {
        return "dawn";
    } else if (time >= sunrise + 2 && time < 11) {
        return "morning";
    } else if (time >= 11 && time < sunset - 3) {
        return "day";
    } else if (time >= sunset -3 && time < sunset) {
        return "magic hour";
    } else if (time >= sunset && time < sunset + 2) {
        return "sunset";
    } else if (time >= sunset + 2 && sunset + 3) {
        return "dusk";
    } else {
        return "night";
    } 
}

function timeWeatherGradient(time, weather, wp) {
    var tc = timeColor[time];
    var wc = weatherColor[weather];
    console.log(tc);
    console.log(wc);
    
    var tp = 100-wp;
    console.log("Clouds:", wp);
    
    var fade = " , " + wc + " " + tp + "%";

//    $("body").css("color", );
    
    $("body").css("background-color", tc);
//    $("body").css("background-image", "-webkit-gradient(linear, left top, left bottom, from(" + tc + "), to(" + wc + "))");
    $("body").css("background-image", "-webkit-linear-gradient(bottom, " + tc + fade + " , " + wc + ")");
    $("body").css("background-image", "-moz-linear-gradient(bottom, " + tc + fade + " , " + wc + ")");
    $("body").css("background-image", "-o-linear-gradient(bottom, " + tc + fade + " , " + wc + ")");
    $("body").css("background-image", "linear-gradient(to top, " + tc + fade + " , " + wc + ")");
    
    console.log($("body"));

    //    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f85032', endColorstr='#e73827', GradientType=1 );
}

var weatherColor = {
    "few clouds": "#F8F5EB",
    "scattered clouds": "#F8F5EB",
    "broken clouds": "#676268",
    "shower rain": "#F8F5EB",
    "rain": "#6B605C",
    "thunderstorm": "#433F60",
    "snow": "#DEDEE0",
    "heavy snow": "#B5C5EC",
    "mist": "#C2C4C8",
    "heavy thunderstorm": "#282542"
}

// METEOCONS DATA
var daySymbol = {
    "clear sky": "B",
    "few clouds": "H",
    "scattered clouds": "N",
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
    // CLEAR SKY
    "clear sky": "clear sky",
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




navigator.geolocation.getCurrentPosition(function(location) {
    var lat = location.coords.latitude;
    var lon = location.coords.longitude;
    var acc = location.coords.accuracy;
    console.log(lat);
    console.log(lon);
    console.log(acc);
    
    
    
    var address = "https://api.wunderground.com/api/" + wundergroundKey + "/conditions/forecast/astronomy/q/" + lat + "," + lon + ".json";

    console.log(address);
    
//    window.location = address;

    $.ajax({
        url: address, 
        dataType: "json",
        complete: function(d) {
            var response = jQuery.parseJSON(JSON.stringify(d));
            var data = response.responseJSON;
            console.log(data);
            var city = data.current_observation.display_location.full;
            console.log(city);
            var description = data.current_observation.weather;
            var main = translate[description];
            console.log(main);
            var icon = "<a href='' class='icon' data-icon=" + daySymbol[main]  + "></a>";
            console.log(icon);
            var tempF = data.current_observation.temp_f + "ºF ";
            var tempC = data.current_observation.temp_c  + "ºC ";
            var visibility = data.current_observation.visibility_mi;
            var humidity = data.current_observation.relative_humidity;
            console.log(humidity);
            var pressure = data.current_observation.pressure_in;
            var wind = data.current_observation.wind_string;
            var sunriseHour = data.sun_phase.sunrise.hour;
//            var sunriseFormat = new Date(sunrise);
            var sunsetHour = data.sun_phase.sunset.hour;
//            var sunsetFormat = new Date(sunset);
//            console.log(sunriseFormat);
//            console.log(sunsetFormat);

//            var d = new Date();
//            console.log(d);
//            var time = d.getHours();
//            console.log(time);
//
//            var whatTimeIsIt = dayPartition(time, sunriseFormat.getHours(), sunsetFormat.getHours());
//
//            timeWeatherGradient(whatTimeIsIt, main, cloudCover);


            // MAIN WEATHER PANEL
            $city.text(city);
            $symbol.html(icon);
            $descirption.text(description).css("text-transform", "capitalize").addClass("lead");
            $temp.text(tempF);
            $humidity.text(humidity);
            $pressure.text(pressure);
            $windSpeed.text(wind);

            $('#tempToggle').change(function(){
                 if(this.checked) {
                     $temp.text(tempF);
                 } else {
                     $temp.text(tempC);
                }
            });
            
        
        },
        error: function(err, status, textThrown) {
            console.log("Error:");
            console.log(err);
            console.log("Status:", status);
            console.log("Thrown:", textThrown);
        },
        cache: false   
    });

    
});



