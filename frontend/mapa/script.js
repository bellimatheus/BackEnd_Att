let map;

let CidadeAlerta;

function initMap() {
  map = new google.maps.Map(document.querySelector(".map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 17,
  });

  map.addListener("click", (data) => {
    
    let coord = {lat: data.latLng.lat(), lng: data.latLng.lng() }

    // addMarker(coord, "Teste", "../assets/radar.png");
    CidadeAlerta = coord;
  });


  navigator.geolocation.getCurrentPosition((location) => {
    console.log(location.coords.latitude, location.coords.longitude)
    let coord = {lat: location.coords.latitude, lng: location.coords.longitude}

    map.setCenter(coord);

    addMarker(coord, "Minha localização", "../assets/radar.png");

  })
}

function addMarker(coord, title, imagem){
  new google.maps.Marker({
    position: coord,
    map: map,
    title: title,
    icon: imagem
  });
  
}