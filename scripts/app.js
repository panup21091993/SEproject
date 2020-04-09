const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {

  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // destructure properties
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3 city">${cityDets.EnglishName}</h5>
    <div class="my-3 weather">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span class="temperature">${weather.Temperature.Metric.Value}</span>
      <span class="units">&deg;C</span>
    </div>
  `;
  
  document.getElementsByClassName('share-bar')[0].innerHTML = "";
  
  document.getElementsByClassName('share-bar')[0].setAttribute('data-title','Its '+weather.WeatherText+' in '+cityDets.EnglishName+' and the temperature is '+weather.Temperature.Metric.Value+'°C');
  //document.getElementsByClassName('share-bar')[0].setAttribute('data-url',window.location.href);
  new ShareBar({'facebookAppId': 586264738912911});
  
  // update the night/day & icon images
  const iconsrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconsrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  // remove d-none class if present
  if ( card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

}

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };

}

cityForm.addEventListener("submit", e => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem("city", city);
});

if ( localStorage.getItem("city") ) {
  updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}