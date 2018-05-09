var KEY = "9e99177280206d5246b937c975ef275b";
var city = "";
$(function () {
    var city = "Chula+Vista";
    currentWeather(city);
});

$('#selectedCity').keydown(function (event) {
    if (event.which == 13) {
        city = event.target.value;
        console.log(city);
        if (city) {
            currentWeather(city);
        }
    }
});

function fivedayForecast(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&mode=json&units=imperial&APPID=" + KEY, function (json) {
        var forecast = [];

        for (var i = 0; i < json['list'].length; i++) {
            var date = new Date(json['list'][i]['dt_txt']);
            forecast[date.getDay()] = json['list'][i];
        }

        var forecastDay = 1;

        forecast.forEach(function (weather) {
            var day = new Date(weather["dt_txt"]).toDateString().split(" ");
            var temp = weather["main"]["temp"];
            var iconCode = weather["weather"][0]["icon"];
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

            $('#day' + forecastDay).text(day[0]);
            $('#temp' + forecastDay).text(temp);
            $('#img' + forecastDay).attr("src", iconUrl);
            $('#weather' + forecastDay).text(weather["weather"][0]["description"]);

            forecastDay++;
        });
    });
}

function currentWeather(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&mode=json&units=imperial&APPID=" + KEY, function (json) {
        var iconCode = json['weather'][0]["icon"]
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        $('#cityName').text(json['name']);
        $('#ambientWeather').text(json['weather'][0]['description']);
        $('#iconDay').attr("src", iconUrl);
        $('#temp').text(json["main"]["temp"]);
        fivedayForecast(city);
    });
}

function setBackgroundColor(condition) {
    var color = 'white';

    switch (true) {
        case (condition >= 200 && condition <= 299): // Group 2xx: Thunderstorm
            var img = document.createElement("img");
            img.src = "https://image.shutterstock.com/display_pic_with_logo/1638875/272185115/stock-photo-lightning-strike-on-the-dark-cloudy-sky-272185115.jpg"
            document.body.appendChild(img);
            break;
        case (condition >= 300 && condition <= 399): // Group 3xx: Drizzle
            var img = document.createElement("img");
            img.src = "https://image.shutterstock.com/display_pic_with_logo/197559662/1070071391/stock-photo-drizzling-drops-on-window-shields-1070071391.jpg"
            document.body.appendChild(img);
            break;
        case (condition >= 500 && condition <= 599): // Group 5xx: Rain
            var img = document.createElement("img");
            img.src = "https://image.shutterstock.com/display_pic_with_logo/2790574/490719547/stock-photo-falling-raindrops-footage-animation-in-slow-motion-on-dark-black-background-with-fog-lightened-490719547.jpg"
            document.body.appendChild(img);
            break;
        case (condition >= 600 && condition <= 699): // Group 6xx: Snow
            var img = document.createElement("img");
            img.src = "https://image.shutterstock.com/display_pic_with_logo/1685554/315123593/stock-photo-winter-landscape-with-falling-snow-315123593.jpg"
            document.body.appendChild(img);
            break;
        case (condition >= 700 && condition <= 799): // Group 7xx: Atmosphere
            var img = document.createElement("img");
            img.src = "https://cdn.stocksnap.io/img-thumbs/280h/ZH0QJXQOFE.jpg"
            document.body.appendChild(img);
            break;
        case (condition == 800): // Group 800: Clear
            var img = document.createElement("img");
            img.src = "https://image.shutterstock.com/display_pic_with_logo/2649928/327604049/stock-photo-fantastic-soft-white-clouds-against-blue-sky-327604049.jpg"
            document.body.appendChild(img);
            break;
        case (condition >= 801 && condition <= 899): // Group 80x: Clouds
            var img = document.createElement("img");
            img.src = "https://image.shutterstock.com/display_pic_with_logo/512149/408913795/stock-photo-dramatic-dark-cloudy-sky-over-sea-natural-photo-background-408913795.jpg"
            document.body.appendChild(img);
            break;
        default:
            color = 'white';
    }
};
