import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  return search.split("=")[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    const responseObj = await fetch(
      config.backendEndpoint + "/adventures/?city=" + city
    );
    return await responseObj.json();
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  adventures.forEach((adventure) => {
    const divChild = document.createElement("div");
    divChild.className = "col-6 col-lg-3 mb-3";

    divChild.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
        <div class="card activity-card" style="border-radius: 8px">
            <div class="category-banner">
              ${adventure.category}
            </div>
            <img src="${adventure.image}" class="card-img-top" alt="..." />

            <div class="card-body d-flex-column" style="font-weight: 500">
              <div class="d-flex justify-content-between align-items-center" style="padding-bottom: 3px">
                <div>${adventure.name}</div>
                <div>₹${adventure.costPerHead}</div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div>Duration</div>
                <div>${adventure.duration} Hours </div>
              </div>

            </div>
        </div>
    `;

    document.getElementById("data").append(divChild);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  return list.filter((item) => item.duration >= low && item.duration <= high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  return list.filter((item) => categoryList.includes(item.category));
}

function filterFunction(list, filters) {
  // Place holder for functionality to work in the Stubs
  let low = Number(filters.duration.split("-")[0]);
  let high = Number(filters.duration.split("-")[1]);

  let filteredList = [];

  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    filteredList = filterByCategory(list, [...filters.category]);

    filteredList = filterByDuration(filteredList, low, high);
  } else if (
    filters["duration"].length > 0 &&
    filters["category"].length == 0
  ) {
    filteredList = filterByDuration(list, low, high);
  } else if (
    filters["duration"].length == 0 &&
    filters["category"].length > 0
  ) {
    filteredList = filterByCategory(list, [...filters.category]);
  } else {
    filteredList = list;
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  let filteredObj = JSON.parse(localStorage.getItem("filters"));

  if (filteredObj !== null) return filteredObj;
  return null;
}

function generateFilterPillsAndUpdateDOM(filters) {
  if (localStorage.getItem("duration") !== null) {
    document.getElementById("duration-select").value =
      getFiltersFromLocalStorage().duration;
  } else document.getElementById("duration-select").value = filters.duration;

  // 2. Update the category pills on the DOM
  filters.category.forEach((cat) => {
    let div = document.createElement("div");
    div.className = "category-filter";
    div.innerHTML = `
      <span id="pills">${cat}</span>
      <button type="button" class="delete-btn" id=${cat} onClick="window.location.reload();">X</button>
    `;
    document.getElementById("category-list").append(div);
  });

  document.getElementById("category-list").addEventListener("click", (e) => {
    let catToDel = e.target.id;
    let newFiltes = {
      duration: filters.duration,
      category: filters.category.filter((cat) => cat !== catToDel),
    };
    saveFiltersToLocalStorage(newFiltes);
  });
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
