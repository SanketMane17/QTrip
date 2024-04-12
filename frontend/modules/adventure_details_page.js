import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  let adventureId = search.split("=")[1];

  if (adventureId !== null) return adventureId;

  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  try {
    const responseObj = await fetch(
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
    );
    const data = await responseObj.json();
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  const advName = document.getElementById("adventure-name");
  advName.innerHTML = adventure.name;

  const advSub = document.getElementById("adventure-subtitle");
  advSub.innerHTML = adventure.subtitle;

  adventure.images.forEach((image, id) => {
    const advImage = document.createElement("div");
    advImage.innerHTML = `
      <img src="${image}" class="activity-card-image" alt="image-${id}"/>
    `;

    document.getElementById("photo-gallery").append(advImage);
  });

  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  document.getElementById("photo-gallery").innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" id="carouseInner">
      
    </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;

  const carouselInner = document.getElementById("carouseInner");

  images.forEach((link, idx) => {
    const divElem = document.createElement("div");

    idx === 0
      ? divElem.classList.add("carousel-item", "peopleCarouselImg", "active")
      : divElem.classList.add("carousel-item", "peopleCarouselImg");

    divElem.innerHTML = `
      <img src="${link}" class="slideImage w-100" alt="img-${idx}">
    `;

    carouselInner.append(divElem);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  if (adventure.available === true) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";

    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  let total = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  let formElem = document.getElementById("myForm");
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = formElem.elements["name"].value;
    let date = formElem.elements["date"].value;
    let person = formElem.elements["person"].value;
    let adventureId = adventure.id;

    const bodyObj = {
      name: name,
      date: date,
      person: person,
      adventure: adventureId,
    };

    let url = config.backendEndpoint + "/reservations/new";

    try {
      (async function () {
        let res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(bodyObj),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          alert("Success!");
          window.location.reload();
        } else {
          let data = await res.json();
          alert("Failed - " + data.message);
        }
      })();
    } catch (e) {
      console.log(e);
      alert("Failed - Fetched call resulted anderror!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
