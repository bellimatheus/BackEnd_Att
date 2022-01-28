
const alerta = document.querySelector("#alerta");
const cadastrar = document.querySelector("#cadastrar");
const body = document.querySelector("body");

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
    alerta.hidden = false
    cadastrar.hidden = false
  });


  navigator.geolocation.getCurrentPosition((location) => {
    console.log(location.coords.latitude, location.coords.longitude)
    let coord = {lat: location.coords.latitude, lng: location.coords.longitude}

    map.setCenter(coord);

    addMarker(coord, "Minha localização", "../assets/radar.png");

  })
}

function cadastro() {
  let data = JSON.stringify({
    "id_user" : 1,
    "id_alerta" : alerta.value,
    "coordenadas" : CidadeAlerta.lat + CidadeAlerta.lng,
    "ativo" : true
  })

  fetch("http://localhost:3000/local", {
    "method" : "POST",
    "headers" : {
      "Content-Type" : "application/json"
    },
    body: data
  })

  .then(resp => { return resp.json() })
  .then(data => { 
      if(data.id != undefined){
        let tipo = alerta.value;
        addMarker(CidadeAlerta, tipo, "../assets/radar.png");
        alerta.hidden = true;
        cadastrar.hidden = true;

      }else{
        alert("Falha encontrada em alerta")
      }
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

function iniciar(){
  CarrMarcadores();
  CadAlerta();
}



function CarrMarcadores(){
  fetch("http://localhost:3000/local")
  .then(resp => { return resp.json()})
  .then(data => {
    data.forEach(localizacao => {
      let coorden = localizacao.coordenadas.split(',');
      let coord = {lat: Number(coorden[0]), lng:  Number(coorden[1])};

      addMarker(coord, localizacao.alertum.tipo, "../assets/radar.png")
    });
  })




}

function CadAlerta(){
  fetch("http://localhost:3000/alerta")

  .then(resp => {
    return resp.json();
  })
  .then(data => {
    data.forEach(alert => {
      let op = document.createElement("option");
      op.value = alert.id;
      op.innerHTML = alert.tipo;

      alerta.appendChild(op);
    });
  })
}