import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  try {
    const responseObj = await fetch(config.backendEndpoint + "/cities");
    const data = await responseObj.json();
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  const container = document.createElement("div");
  container.className = "col-12 col-sm-6 col-lg-3 mb-4";

  container.innerHTML = `
    <a href="pages/adventures/?city=${id}" id=${id}>
          <div class="tile">
            <img src="${image}" />
            <div class="tile-text text-center">
              <h5>${city}</h5>
              <p>${description}</p>
            </div>
          </div>
        </a>
  `;

  document.getElementById("data").append(container);
}

export { init, fetchCities, addCityToDOM };
