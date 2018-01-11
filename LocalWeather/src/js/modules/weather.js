function validateJSONResponse(response) {
  let jsonType = response.headers
    .get('content-type')
    .includes('application/json');
  if (jsonType) return response.json();
}

function GetGeolocations() {
  if (navigator.geolocation.getCurrentPosition) {
    navigator.geolocation.getCurrentPosition(geo => {
      //use google api to get zipcode
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          geo.coords.latitude
        },${geo.coords.longitude}`,
        { 'content-type': 'application/json' }
      )
        .then(response => {
          return validateJSONResponse(response);
        })
        .then(data => {
          fetch(
            `http://api.wunderground.com/api/12449b9ce63b889e/conditions/q/${
              data['results'][0]['address_components'][7]['long_name']
            }.json`,
            { 'content-type': 'application/json' }
          )
            .then(response => {
              return validateJSONResponse(response);
            })
            .then(data => {
              const currentData = data.current_observation;
              document.getElementById('location').innerText = `${
                currentData.display_location.full
              }`;
              document.getElementById('temperature').innerText = `${
                currentData.temp_f
              }˚F/${currentData.temp_c}˚C`;
              document.querySelector('img').src = currentData.icon_url;
            });
        });
    });
  }
}

export { GetGeolocations };
