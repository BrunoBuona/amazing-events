let onlycard2 = document.getElementById("cardCjs")

function idPrinter(i, container) {
  container.innerHTML +=
    `
        <article class="only_card" >
        <img
          src="${i.image}"
          class="card-img2"
          alt="${i.name}"
        />
        <div class="card-body2">
            <h5 class="card-title2">${i.name}</h5>
            <p class="card-text2">
            Date: ${i.date}
            </p>
            <p class="card-text2">
            Place: ${i.place}
            </p>
            <p class="card-text2">
            Category: ${i.category}
            </p>
            <p class="card-text2">
            Category: ${i.capacity}
            </p>
            <p class="card-text2">
            Assistance: ${i.assistance}
            </p>
          <div class="buttons-cardsx">
          <button class="btn btn-dark">U$D${i.price}</button>
          <a href="#" class="btn btn-danger">Buy</a>
        </div>
        </div>
      </article>
        `
}

function idPrinter2(i, container) {
  container.innerHTML +=
    `
        <article class="only_card" >
        <img
          src="${i.image}"
          class="card-img2"
          alt="${i.name}"
        />
        <div class="card-body2">
            <h5 class="card-title2">${i.name}</h5>
            <p class="card-text2">
            Date: ${i.date}
            </p>
            <p class="card-text2">
            Place: ${i.place}
            </p>
            <p class="card-text2">
            Category: ${i.category}
            </p>
            <p class="card-text2">
            Category: ${i.capacity}
            </p>
            <p class="card-text2" id="hideDiv">
            Estimate: ${i.estimate}
            </p>
          <div class="buttons-cardsx">
          <button class="btn btn-dark">U$D${i.price}</button>
          <a href="#" class="btn btn-danger">Buy</a>
        </div>
        </div>
      </article>
        `
}

let eventos;
fetch('https://amazing-events.herokuapp.com/api/events')
  .then(data => data.json())
  .then(data => {
    fecha = data.currentDate
    eventos = data.events;
    printid()
  })
  .catch(error => console.log(error));
function printid() {
  let filtro = []
  let theId = location.search.slice(4)
  filtro = eventos.find(e => e._id === theId)
  if (filtro.date < fecha) {
    idPrinter(filtro, onlycard2)
  }
  else {
    idPrinter2(filtro, onlycard2)
  }
}



