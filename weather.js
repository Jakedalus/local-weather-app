    // TODO:": "",
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
    "dawn": "rgb(255,236,194)",
    "morning": "rgb(138,148,147)",
    "day": "rgb(0,72,144)",
    "magic hour": "rgb(208,159,104)",
    "sunset": "rgb(149,20,1)",
    "dusk": "rgb(70,86,206)",
    "night": "rgb(4,12,31)",
};

var weatherColor = {
    "few clouds": "rgb(248,245,235)",
    "overcast": "rgb(248,245,235)",
    "scattered clouds": "rgb(248,245,235)",
    "broken clouds": "rgb(103,98,104)",
    "shower rain": "rgb(248,245,235)",
    "rain": "rgb(107,96,92)",
    "thunderstorm": "rgb(67,63,96)",
    "snow": "rgb(222,222,224)",
    "snowflake": "rgb(222,222,224)",
    "blowing snow": "rgb(222,222,224)",
    "blowing haze": "rgb(194,196,200)",
    "heavy snow": "rgb(181,197,236)",
    "light mist": "rgb(220,222,226)",
    "mist": "rgb(194,196,200)",
    "gust": "rgb(211,211,211)",
    "hail": "rgb(181,197,236)",
    "heavy thunderstorm": "rgb(40,37,66)"
}

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
    var rgb = wc.match(/\d+/g);
    var rgb_c = [];
    var rgb_s = [];
    for(var i = 0; i < rgb.length; i++) {
        var c = Math.abs(rgb[i] - 160);
        var c2 = Math.abs(rgb[i] - 80);
        rgb_c.push(c);
        rgb_s.push(c2);
    }
    var cc = "rgb(" + rgb_c[0] + "," + rgb_c[1] + "," + rgb_c[2] + ")";
    var ccs = "rgb(" + rgb_s[0] + "," + rgb_s[1] + "," + rgb_s[2] + ")";
    console.log(tc);
    console.log(wc);
    console.log(rgb_c);
    console.log(cc);
    console.log(ccs);
    
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
    
    $("body").css("color", cc);
    $(".icon").css("color", cc);
    $("body").css("text-shadow", "1px 1px " + ccs);
    $(".icon").css("text-shadow", "1px 1px " + ccs);
    
    console.log($("body").css("text-shadow"));

    //    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f85032', endColorstr='#e73827', GradientType=1 );
}

function cloudCover(weather) {
    var words = weather.split(" ");
    if(words[0] == "Clear") {
        return 0;
    }else if(words[0] == "Light") {
        return 30;
    } else if (words[0] == "Heavy" || words[0] == "Overcast") {
        return 90;
    } else {
        return 50;
    }
}


// METEOCONS DATA
var daySymbol = {
    "clear sky": "B",
    "overcast": "E",
    "few clouds": "H",
    "scattered clouds": "N",
    "broken clouds": "Y",
    "shower rain": "Q",
    "rain": "R",
    "thunderstorm": "O",
    "snow": "U",
    "heavy snow": "W",
    "light mist": "J",
    "mist": "M",
    "heavy thunderstorm": "Z",
    "hail": "X",
    "gust": "F",
    "snowflake": "G",
    "blowing snow": "F G",
    "blowing haze": "F M"
};

var nightSymbol = {
    "clear sky": "2",
    "overcast": "E",
    "few clouds": "4",
    "scatterd clouds": "5",
    "broken clouds": "%",
    "shower rain": "7",
    "rain": "8",
    "thunderstorm": "6",
    "snow": "\"",
    "heavy snow": "#",
    "light mist": "K",
    "mist": "M",
    "heavy thunderstorm": "&", 
    "hail": "$",
    "gust": "F",
    "snowflake": "G",
    "blowing snow": "F G",
    
};

var translate = {
    "Drizzle": "shower rain",
    "Light Drizzle": "shower rain",
    "Heavy Drizzle": "shower rain",
    "Rain": "rain",
    "Light Rain": "shower rain",
    "Heavy Rain": "rain",
    "Snow": "snow",
    "Light Snow": "snow",
    "Heavy Snow": "heavy snow",
    "Snow Grains": "snow",
    "Light Snow Grains": "snow",
    "Heavy Snow Grains": "heavy snow",
    "Ice Crystals": "snow",
    "Light Ice Crystals": "snow",
    "Heavy Ice Crystals": "heavy snow",
    "Ice Pellets": "hail",
    "Light Ice Pellets": "hail",
    "Heavy Ice Pellets": "hail",
    "Hail": "hail",
    "Light Hail": "hail",
    "Heavy Hail": "hail",
    "Mist": "mist",
    "Light Mist": "light mist",
    "Heavy Mist": "mist",
    "Fog": "mist",
    "Light Fog": "light mist",
    "Heavy Fog": "mist",
    "Fog Patches": "light mist",
    "Light Fog Patches": "light mist",
    "Heavy Fog Patches": "mist",
    "Smoke": "mist",
    "Light Smoke": "light mist",
    "Heavy Smoke": "mist",
    "Volcanic Ash": "mist",
    "Light Volcanic Ash": "light mist",
    "Heavy Volcanic Ash": "mist",
    "Widespread Dust": "mist",
    "Light Widespread Dust": "light mist",
    "Heavy Widespread Dust": "mist",
    "Sand": "mist",
    "Light Sand": "light mist",
    "Heavy Sand": "mist",
    "Haze": "mist",
    "Light Haze": "light mist",
    "Heavy Haze": "mist",
    "Spray": "gust",
    "Light Spray": "gust",
    "Heavy Spray": "gust",
    "Dust Whirls": "blowing haze",
    "Light Dust Whirls": "blowing haze",
    "Heavy Dust Whirls": "blowing haze",
    "Sandstorm": "blowing haze",
    "Light Sandstorm": "blowing haze",
    "Heavy Sandstorm": "blowing haze",
    "Low Drifting Snow": "snowflake",
    "Light Low Drifting Snow": "snowflake",
    "Heavy Low Drifting Snow": "snowflake",
    "Low Drifting Widespread Dust": "gust",
    "Light Low Drifting Widespread Dust": "gust",
    "Heavy Low Drifting Widespread Dust": "gust",
    "Low Drifting Sand": "gust",
    "Light Low Drifting Sand": "gust",
    "Heavy Low Drifting Sand": "gust",
    "Blowing Snow": "blowing snow",
    "Light Blowing Snow": "blowing snow",
    "Heavy Blowing Snow": "blowing snow",
    "Blowing Widespread Dust": "blowing haze",
    "Light Blowing Widespread Dust": "blowing haze",
    "Heavy Blowing Widespread Dust": "blowing haze",
    "Blowing Sand": "blowing haze",
    "Light Blowing Sand": "blowing haze",
    "Heavy Blowing Sand": "blowing haze",
    "Rain Mist": "shower rain",
    "Light Rain Mist": "shower rain",
    "Heavy Rain Mist": "shower rain",
    "Rain Showers": "shower rain",
    "Light Rain Showers": "shower rain",
    "Heavy Rain Showers": "shower rain",
    "Snow Showers": "snow",
    "Light Snow Showers": "snow",
    "Heavy Snow Showers": "snow",
    "Snow Blowing Snow Mist": "snow",
    "Light Snow Blowing Snow Mist": "snow",
    "Heavy Snow Blowing Snow Mist": "snow",
    "Ice Pellet Showers": "snow",
    "Light Ice Pellet Showers": "snow",
    "Heavy Ice Pellet Showers": "snow",
    "Hail Showers": "hail",
    "Light Hail Showers": "hail",
    "Heavy Hail Showers": "hail",
    "Small Hail Showers": "hail",
    "Light Small Hail Showers": "hail",
    "Heavy Small Hail Showers": "hail",
    "Thunderstorm": "thunderstorm",
    "Light Thunderstorm": "thunderstorm",
    "Heavy Thunderstorm": "heavy thunderstorm",
    "Thunderstorms and Rain": "thunderstorm",
    "Light Thunderstorms and Rain": "thunderstorm",
    "Heavy Thunderstorms and Rain": "heavy thunderstorm",
    "Thunderstorms and Snow": "thunderstorm",
    "Light Thunderstorms and Snow": "thunderstorm",
    "Heavy Thunderstorms and Snow": "heavy thunderstorm",
    "Thunderstorms and Ice Pellets": "thunderstorm",
    "Light Thunderstorms and Ice Pellets": "thunderstorm",
    "Heavy Thunderstorms and Ice Pellets": "",
    "Thunderstorms with Hail": "thunderstorm",
    "Light Thunderstorms with Hail": "thunderstorm",
    "Heavy Thunderstorms with Hail": "heavy thunderstorm",
    "Thunderstorms with Small Hail": "thunderstorm",
    "Light Thunderstorms with Small Hail": "thunderstorm",
    "Heavy Thunderstorms with Small Hail": "heavy thunderstorm",
    "Freezing Drizzle": "shower rain",
    "Light Freezing Drizzle": "shower rain",
    "Heavy Freezing Drizzle": "shower rain",
    "Freezing Rain": "rain",
    "Light Freezing Rain": "shower rain",
    "Heavy Freezing Rain": "rain",
    "Freezing Fog": "mist",
    "Light Freezing Fog": "mist",
    "Heavy Freezing Fog": "mist",
    "Patches of Fog": "light mist",
    "Shallow Fog": "light mist",
    "Partial Fog": "light mist",
    "Overcast": "overcast",
    "Clear": "clear sky",
    "Partly Cloudy": "few clouds",
    "Mostly Cloudy": "scattered clouds",
    "Scattered Clouds": "scattered clouds",
    "Small Hail": "hail",
    "Squalls": "gust",
    "Funnel Cloud": "",
    "Unknown Precipitation": "",
    "Unknown": ""
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
            var sunriseMin = data.sun_phase.sunrise.minute;
            var sunrise = new Date();
            sunrise.setHours(sunriseHour);
            sunrise.setMinutes(sunriseMin);
            var sunsetHour = data.sun_phase.sunset.hour;
            var sunsetMin = data.sun_phase.sunset.minute;
            var sunset = new Date();
            sunset.setHours(sunsetHour);
            sunset.setMinutes(sunsetMin);
            console.log(sunrise);
            console.log(sunset);

            var d = new Date();
            console.log(d);
            var time = d.getHours();
            console.log(time);
            var whatTimeIsIt = dayPartition(time, sunrise.getHours(), sunset.getHours());
            var clouds = cloudCover(description);


            // MAIN WEATHER PANEL
            $city.text(city);
            $symbol.html(icon);
            $descirption.text(description).css("text-transform", "capitalize").addClass("lead");
            $temp.text(tempF);
            $humidity.text(humidity);
            $pressure.text(pressure);
            $windSpeed.text(wind);
            
            timeWeatherGradient(whatTimeIsIt, main, clouds);

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



