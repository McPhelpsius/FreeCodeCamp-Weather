function GetGeolocations() {
  if (navigator.geolocation.getCurrentPosition) {
    navigator.geolocation.getCurrentPosition(geo => {
      fetch(
        `https://fcc-weather-api.glitch.me/api/current?lon=${
          geo.coords.longitude
        }&lat=${geo.coords.latitude}`,
        { 'content-type': 'application/json' }
      )
        .then(response => {
          let jsonType = response.headers
            .get('content-type')
            .includes('application/json');

          if (jsonType) return response.json();
        })
        .then(data => {
          document.getElementById('location').innerText = data.name;
          document.getElementById('temperature').innerText = data.main.temp;
          document.querySelector('img').src = data.weather[0].icon;
        });
    });
  }
}

export { GetGeolocations };
