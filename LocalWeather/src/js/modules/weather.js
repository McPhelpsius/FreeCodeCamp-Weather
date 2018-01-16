function validateJSONResponse(response) {
  let jsonType = response.headers
    .get('content-type')
    .includes('application/json');
  if (jsonType) return response.json();
}

function setLocalDateTime(ts) {
  let tsArray = ts.split(' ');
  let tsWords = tsArray.slice(0, 4);
  let tsTimeArray = tsArray[4].split(':');
  let time;
  if (parseInt(tsTimeArray[0]) > 12) {
    tsTimeArray[0] = parseInt(tsTimeArray[0]) - 12;
    time = tsTimeArray.splice(0, 2).join(':') + 'pm';
  } else {
    time = tsTimeArray.splice(0, 2).join(':') + 'am';
  }
  return {
    date: tsWords.join(' '),
    time
  };
}

function placeDataOnWebpage(obsData, date) {
  document.getElementById('location').innerText = `${
    obsData.display_location.full
  }`;
  document.getElementById('weather').innerText = obsData.weather;
  document.getElementById('temperature').innerText = `${obsData.temp_f}˚F/${
    obsData.temp_c
  }˚C`;
  document.getElementById('feelslike').innerText = `${obsData.feelslike_f}˚F/${
    obsData.feelslike_c
  }˚C`;
  document.getElementById('date').innerText = date.date;
  document.getElementById('time').innerText = date.time;
  document.querySelector('img').src = obsData.icon_url;
}

function GetGeolocations() {
  if (navigator.geolocation.getCurrentPosition) {
    navigator.geolocation.getCurrentPosition(geo => {
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

              const nowDate = setLocalDateTime(currentData.local_time_rfc822);
              placeDataOnWebpage(currentData, nowDate);
            });
        });
    });
  }
}

export { GetGeolocations };
