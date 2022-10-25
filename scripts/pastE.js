// EL NAVEGADOR LO TENES FORZADO A BLACKIE.
const $cards = document.getElementById("contenedor-js");
const $search = document.getElementById("search-js");
const $categorys = document.getElementById("category-js");
// Async
let eventos;
let fecha;
let past;
fetch('https://mh-amazing.herokuapp.com/amazing')
  .then(data => data.json())
  .then(data => {
    fecha = data.date
    eventos = data.events;
    past = eventos.filter((event) => event.date < fecha);
    crearCheckbox(past, $categorys)
    imprimirCards(past, $cards)
    $search.addEventListener('keyup', filtrar)
    $categorys.addEventListener('change', filtrar)
  })
  .catch(error => console.log(error));

// DOM | CheckBox
function crearCheckbox(eventos, contenedor) {
  let fn = eventos => eventos.category
  let categorias = new Set(eventos.filter(fn).map(fn))
  categorias.forEach(par => {
    contenedor.innerHTML += `
    <label class="form-check-label" for="${par}">
    <input class="form-check-input" value="${par}" type="checkbox" role="switch" id="${par}">${par}
    </label>
    `
  })
}

function crearCard(eventos) {
  let div = document.createElement('DIV')
  div.classList = 'class="card cardD'
  div.style = 'width: 14rem'
  div.innerHTML += `
    <img src="${eventos.image}" class="card-img-top" alt="${eventos.name}"/> 
    <div class="card-body">
    <h5 class="card-title">${eventos.name}</h5>
    <p class="card-text">${eventos.description}</p>
    <a class="btn btn-dark">U$D ${eventos.price}</a>
    <a href="./onlycard.html?id=${eventos.id}" class="btn btn-danger">See more</a>
    </div> 
    `
  return div
}
function imprimirCards(eventos, contenedor) {
  contenedor.innerHTML = ''
  if (eventos.length > 0) {
    let fragment = document.createDocumentFragment()
    eventos.forEach(eventos => fragment.appendChild(crearCard(eventos)))
    contenedor.appendChild(fragment)
  }
  else {
    contenedor.innerHTML = `<h2>Sin coincidencias...</h2>`
  }
}

function filtrar() {
  let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value)
  let filtradosPorCategoria = past.filter(eventos => checked.includes(eventos.category) || checked.length == 0)
  let filtradosPorSearch = filtradosPorCategoria.filter(value => value.name.toLowerCase().includes($search.value.toLowerCase()))
  imprimirCards(filtradosPorSearch, $cards)
}
