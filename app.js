const currentCity = document.getElementById("city-name");
const currentTemp = document.getElementById("temperature");
const currentDesc = document.getElementById("description");
const currentFL = document.getElementById("feels-like");
const currentWS = document.getElementById("wind-speed");
const currentHumid = document.getElementById("humidity");
const currentMaxT = document.getElementById("max-temp");
const currentMinT = document.getElementById("min-temp");
const currentPres = document.getElementById("pressure");
const city1 = document.getElementById("city-1");
const city2 = document.getElementById("city-2");
const city3 = document.getElementById("city-3");
const city4 = document.getElementById("city-4");
const city5 = document.getElementById("city-5");
const celsiusButton = document.getElementById("celsius-button");
const fahrenheitButton = document.getElementById("fahrenheit-button");
var tempUnits = "metric";
var selectedCity;

celsiusButton.addEventListener("click", function () {
    celsiusButton.classList.add("button");
    fahrenheitButton.classList.remove("button");
    tempUnits = "metric";
    selectedCity = document.querySelector(".active").textContent;
    getData(selectedCity, tempUnits);
});

fahrenheitButton.addEventListener("click", function () {
    fahrenheitButton.classList.add("button");
    celsiusButton.classList.remove("button");
    tempUnits = "imperial";
    selectedCity = document.querySelector(".active").textContent;
    getData(selectedCity, tempUnits);
});

// default

getData(city1.innerHTML, tempUnits);

city1.addEventListener("click" , function () {
    city1.classList.add("active");
    city2.classList.remove("active");
    city3.classList.remove("active");
    city4.classList.remove("active");
    city5.classList.remove("active");
    getData(city1.innerHTML, tempUnits);
});


city2.addEventListener("click" , function () {
    city2.classList.add("active");
    city1.classList.remove("active");
    city3.classList.remove("active");
    city4.classList.remove("active");
    city5.classList.remove("active");
    getData(city2.innerHTML, tempUnits);
});


city3.addEventListener("click" , function () {
    city3.classList.add("active");
    city1.classList.remove("active");
    city2.classList.remove("active");
    city4.classList.remove("active");
    city5.classList.remove("active");
    getData(city3.innerHTML, tempUnits);
});

city4.addEventListener("click" , function () {
    city4.classList.add("active");
    city1.classList.remove("active");
    city2.classList.remove("active");
    city3.classList.remove("active");
    city5.classList.remove("active");
    getData(city4.innerHTML, tempUnits);
});

city5.addEventListener("click" , function () {
    city5.classList.add("active");
    city1.classList.remove("active");
    city2.classList.remove("active");
    city3.classList.remove("active");
    city4.classList.remove("active");
    getData(city5.innerHTML, tempUnits);
});

function getData (name, units) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + name +"&appid=24341efa6cf83bb9ddc95fbab31fcb9a&units=" + units).then(
    res =>(res.json()).then(data => {
        showWeatherData(data);
    })
).catch(error =>alert("Not a valid city, try again!"))}

function searchData () {
    var searchCity = document.querySelector("#search-box").value;
    var activeCity = document.querySelector(".active");
    activeCity.innerHTML = searchCity;
    getData(searchCity, tempUnits);
}

document.querySelector("#submit-button").addEventListener("click", function () {
   searchData();
});

document.querySelector("#search-box").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        searchData();
    }
 });

function showWeatherData (data) {
    let location = data.name;
    let {temp, feels_like, temp_max, temp_min, humidity, pressure} = data.main;
    let {speed} = data.wind;
    let description = data.weather[0].description;
    currentCity.innerHTML = location;
    currentTemp.innerHTML = temp + "°";
    let descWords = description.split(" ");
    var resultingDesc = descWords.map(function(descWord) {
        return descWord.replace(descWord.charAt(0), descWord.charAt(0).toUpperCase())
    })
    currentDesc.innerHTML = resultingDesc.join(" ");
    currentFL.innerHTML = "Feels Like: " + feels_like + "°";
    currentPres.innerHTML = "Pressure: " + pressure + " mb";
    currentWS.innerHTML = "Wind Speed: " + speed + " m/s";
    currentHumid.innerHTML = "Humidity: " + humidity + "%";
    currentMaxT.innerHTML = "Max Temperature: " + temp_max + "°";
    currentMinT.innerHTML = "Min Temperature: " + temp_min + "°";
};
