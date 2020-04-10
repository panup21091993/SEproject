const APIKey = "00f5749c2c4343394a15035095737e46";

//set default current data
var default_city = "raleigh";
fetch(
  `http://api.openweathermap.org/data/2.5/weather?q=${default_city}&appid=${APIKey}&units=metric`
)
  .then((res) => {
    return res.json();
  })
  .then(function (res) {
    var tempElement = document.getElementById("temp");
    var city_nameElement = document.getElementById("city_name");
    var weather_conditionElement = document.getElementById("weather_condition");
    var iconElement = document.getElementById("icon");
    var time_imgElement = document.getElementById("time_img");

    tempElement.innerHTML = res.main.temp;
    city_nameElement.innerHTML = res.name;
    weather_conditionElement.innerHTML = res.weather[0].main;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
    );
    if (document.getElementById("icon").src.substring(35, 36) == "d") {
      time_imgElement.setAttribute("src", "img/day.svg");
    } else {
      time_imgElement.setAttribute("src", "img/night.svg");
    }
  });

//set default forecast data
fetch(
  `http://api.openweathermap.org/data/2.5/forecast?q=${default_city}&appid=${APIKey}&units=metric`
)
  .then((res) => {
    return res.json();
  })
  .then(function (res) {
    var date1Element = document.getElementById("date1");
    var temp1Element = document.getElementById("temp1");

    var date2Element = document.getElementById("date2");
    var temp2Element = document.getElementById("temp2");

    var date3Element = document.getElementById("date3");
    var temp3Element = document.getElementById("temp3");

    var date4Element = document.getElementById("date4");
    var temp4Element = document.getElementById("temp4");

    var date5Element = document.getElementById("date5");
    var temp5Element = document.getElementById("temp5");

    var date1 = res.list[4].dt_txt;
    date1Element.innerHTML = date1.substring(6, 10);
    temp1Element.innerHTML = res.list[4].main.temp;

    var date2 = res.list[12].dt_txt;
    date2Element.innerHTML = date2.substring(6, 10);
    temp2Element.innerHTML = res.list[12].main.temp;

    var date3 = res.list[20].dt_txt;
    date3Element.innerHTML = date3.substring(6, 10);
    temp3Element.innerHTML = res.list[20].main.temp;

    var date4 = res.list[28].dt_txt;
    date4Element.innerHTML = date4.substring(6, 10);
    temp4Element.innerHTML = res.list[28].main.temp;

    var date5 = res.list[36].dt_txt;
    date5Element.innerHTML = date5.substring(6, 10);
    temp5Element.innerHTML = res.list[36].main.temp;
  });

//Fetch current weather data
function searchWeather(searchTerm) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${APIKey}&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => init_current(res));
}

//fetch forecast weather data
function searchWeather_forecast(searchTerm) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${APIKey}&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => init_forecast(res));
}

//update current weather UI
function init_current(res) {
  //get element by id
  var tempElement = document.getElementById("temp");
  var city_nameElement = document.getElementById("city_name");
  var time_imgElement = document.getElementById("time_img");
  var weather_conditionElement = document.getElementById("weather_condition");
  var iconElement = document.getElementById("icon");
  var cardElement = document.getElementById("card");

  //update temp
  tempElement.innerHTML = res.main.temp;
  //update city name
  city_nameElement.innerHTML = res.name;
  //update weather condition
  weather_conditionElement.innerHTML = res.weather[0].main;
  //update max and min temp
  document.getElementById("maxTemp").innerHTML = res.main.temp_max;
  document.getElementById("minTemp").innerHTML = res.main.temp_min;
  
  //bind social share
  bindSocialShare();
    
  //update background images based on icon index
  if (document.getElementById("icon").src.substring(35, 36) == "d") {
    time_imgElement.setAttribute("src", "img/day.svg");
  } else {
    time_imgElement.setAttribute("src", "img/night.svg");
  }

  //update icon
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
  );
  // remove d-none class if present
}
//update forecast weatherUI NEED UPDATED
function init_forecast(res) {
  var date1Element = document.getElementById("date1");
  var temp1Element = document.getElementById("temp1");

  var date2Element = document.getElementById("date2");
  var temp2Element = document.getElementById("temp2");

  var date3Element = document.getElementById("date3");
  var temp3Element = document.getElementById("temp3");

  var date4Element = document.getElementById("date4");
  var temp4Element = document.getElementById("temp4");

  var date5Element = document.getElementById("date5");
  var temp5Element = document.getElementById("temp5");

  var date1 = res.list[4].dt_txt;
  date1Element.innerHTML = date1.substring(6, 10);
  temp1Element.innerHTML = res.list[4].main.temp;

  var date2 = res.list[12].dt_txt;
  date2Element.innerHTML = date2.substring(6, 10);
  temp2Element.innerHTML = res.list[12].main.temp;

  var date3 = res.list[20].dt_txt;
  date3Element.innerHTML = date3.substring(6, 10);
  temp3Element.innerHTML = res.list[20].main.temp;

  var date4 = res.list[28].dt_txt;
  date4Element.innerHTML = date4.substring(6, 10);
  temp4Element.innerHTML = res.list[28].main.temp;

  var date5 = res.list[36].dt_txt;
  date5Element.innerHTML = date5.substring(6, 10);
  temp5Element.innerHTML = res.list[36].main.temp;
}

//add search button EventListener
document.getElementById("button").addEventListener("click", () => {
  var searchTerm = document.getElementById("input").value;
  searchWeather(searchTerm);
  searchWeather_forecast(searchTerm);
});

//add EventListener to switch button F <---> C
document.getElementById("switch").addEventListener("click", () => {
  //if current weather is in C
  var temp_C, temp_F;
  if (document.getElementById("unit").innerHTML === "°C") {
    //current temp
	temp_C = Number(document.getElementById("temp").innerHTML);
    temp_F = CelToFah(temp_C);
    document.getElementById("temp").innerHTML = temp_F;
    document.getElementById("unit").innerHTML = "°F";
	
	//max temp
	temp_C = Number(document.getElementById("maxTemp").innerHTML);
    temp_F = CelToFah(temp_C);
	document.getElementById("maxTemp").innerHTML = temp_F;
    document.getElementById("maxUnit").innerHTML = "°F";
	
	//min temp
	temp_C = Number(document.getElementById("minTemp").innerHTML);
    temp_F = CelToFah(temp_C);
	document.getElementById("minTemp").innerHTML = temp_F;
    document.getElementById("minUnit").innerHTML = "°F";

    //if current weather is in F
  } else {
	//current temp
    temp_F = Number(document.getElementById("temp").innerHTML);
    temp_C = FahToCel(temp_F);
    document.getElementById("temp").innerHTML = temp_C;
    document.getElementById("unit").innerHTML = "°C";
	
	//max temp
    temp_F = Number(document.getElementById("maxTemp").innerHTML);
    temp_C = FahToCel(temp_F);
    document.getElementById("maxTemp").innerHTML = temp_C;
    document.getElementById("maxUnit").innerHTML = "°C";
	
	//min temp
    temp_F = Number(document.getElementById("minTemp").innerHTML);
    temp_C = FahToCel(temp_F);
    document.getElementById("minTemp").innerHTML = temp_C;
    document.getElementById("minUnit").innerHTML = "°C";
  }
  
  //bind social share
  bindSocialShare();
});

function CelToFah(temp_C) {
	var temp_F = temp_C * 1.8 + 32;
    temp_F = temp_F.toFixed(2);
    return temp_F.toString(10);
}

function FahToCel(temp_F) {
	temp_C = ((temp_F - 32) * 5) / 9;
    temp_C = temp_C.toFixed(2);
    return temp_C.toString(10);
}

function bindSocialShare(){	  
	document.getElementsByClassName('share-bar')[0].innerHTML = "";

	document.getElementsByClassName('share-bar')[0].setAttribute('data-title','Its '+document.getElementById("weather_condition").innerHTML+' in '+document.getElementById("city_name").innerHTML+' and the temperature is '+document.getElementById("temp").innerHTML+document.getElementById("unit").innerHTML + '. Expect a maximum temperature of '+document.getElementById("maxTemp").innerHTML+document.getElementById("maxUnit").innerHTML + ' and a minimum temperature of '+document.getElementById("minTemp").innerHTML+document.getElementById("minUnit").innerHTML+'.');
	//document.getElementsByClassName('share-bar')[0].setAttribute('data-url',window.location.href);
	new ShareBar({'facebookAppId': 586264738912911});
}
