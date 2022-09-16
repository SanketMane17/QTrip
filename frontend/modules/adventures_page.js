import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

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
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

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
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  // if (isNaN(low) || isNaN(high)) return list;
  return list.filter((item) => item.duration >= low && item.duration <= high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  // if (categoryList.length == 0) return list;
  return list.filter((item) => categoryList.includes(item.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  let low = Number(filters.duration.split("-")[0]);
  let high = Number(filters.duration.split("-")[1]);

  let filteredList = [];

  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    filteredList = filterByCategory(list, [...filters.category]);

    filteredList = filterByDuration(filteredList, low, high);
    // console.log(filteredList);
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
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let filteredObj = JSON.parse(localStorage.getItem("filters"));

  if (filteredObj !== null) return filteredObj;
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

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
    
    let catToDel= e.target.id;
    let newFiltes = { duration: filters.duration, category: filters.category.filter(cat => cat !== catToDel) };
    saveFiltersToLocalStorage(newFiltes);
  })

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
