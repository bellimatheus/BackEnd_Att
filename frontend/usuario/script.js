const view = document.querySelector(".vizu")
const TB = document.querySelector('tbody');

function load() {
    carregarAlertas();
}

function carregarMeusAlertas(){
    let idUser = JSON.parse(localStorage.getItem('userdate').id)
    fetch("http://localhost:3000/local?id_user="+ idUser)
    .then(resp => {return resp.json()})
    .then (data => {
        data.forEach(local => {
            let td = document.createElement("td");
            let tdId = document.createElement("tr");
            let tdCoord = document.createElement("tr");
            let tdTipo = document.createElement("tr");

            tdId.innerHTML = local.id;
            tdCoord.innerHTML = local.coordenadas;
            tdTipo.innerHTML = local.alertum.tipo;

            tdId.innerHTML = local.id;
            tdId.innerHTML = local.coordenadas;
            tdId.style.maxWidth = "250px";
            tdId.style.overflow = "break-word";
            tdId.innerHTML = local.alertum.tipo;
            
            td.appendChild(tdId)
            td.appendChild(tdCoord)
            td.appendChild(tdTipo)

            TB.appendChild(td)
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
            label.innerHTML = e.tipo;
            label.for = e.id;

            checkbox.type = "checkbox"
            checkbox.name = e.id;
            checkbox.checked = true;

            view.appendChild(checkbox);
            view.appendChild(label);
        });
    })
}