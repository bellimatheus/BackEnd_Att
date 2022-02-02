const view = document.querySelector("#alerts")
const TB = document.querySelector('tbody');

function load() {
    carregarAlertas();
    carregarMeusAlertas();
    
}

function carregarMeusAlertas(){
    let idUser = JSON.parse(localStorage.getItem('userdata')).id;
    console.log(idUser)

    fetch("http://localhost:3000/local?id_user="+ idUser)

    .then(resp => {return resp.json()})
    .then (data => {
        data.forEach(local => {
            let tr = document.createElement("tr");
            let tdId = document.createElement("td");
            let tdCoord = document.createElement("td");
            let tdTipo = document.createElement("td");

            tdId.innerHTML = local.id;
            tdCoord.innerHTML = local.coordenadas;
            tdTipo.innerHTML = local.alertum.tipo;

            tdId.innerHTML = local.id;
            tdId.innerHTML = local.coordenadas;
            tdId.style.maxWidth = "250px";
            tdId.style.overflow = "word-break";
            tdId.innerHTML = local.alertum.tipo;
            
            tr.appendChild(tdId)
            tr.appendChild(tdCoord)
            tr.appendChild(tdTipo)

            TB.appendChild(tr)
        })
    })
}

function carregarAlertas(){
    fetch("http://localhost:3000/alerta")
    
    
    .then(resp => {return resp.json()})
    .then(data => {
        data.forEach(e => {
            let label = document.createElement("label");
            let checkbox = document.createElement("input");
            let alerta = document.createElement("div")
            
            label.innerHTML = e.tipo;
            label.for = e.id;

            checkbox.type = "checkbox"
            checkbox.name = e.id;
            checkbox.checked = true;

            alerta.appendChild(checkbox);
            alerta.appendChild(label);
            view.appendChild(alerta);
        });
    })
}

function mostrarMeusAlertas(e){
    e.classList.toggle("up");
    e.parentNode.parentNode.classList.toggle("show");
    
}