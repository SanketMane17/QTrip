import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    const responseObj = await fetch(config.backendEndpoint + "/reservations");
    const data = await responseObj.json();
    return data;
  } catch (e) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent

  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } 
  else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } 
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  reservations.forEach((reservation) => {
    let trElem = document.createElement("tr");
    trElem.innerHTML = `

      <td data-title="Transaction ID">${reservation.id}</td>
      <td data-title="Booking Name">${reservation.name}</td>
      <td data-title="Adventure)">${reservation.adventureName}</td>
      <td data-title="Person(s">${reservation.person}</td>
      <td data-title="Date">${new Date(reservation.date).toLocaleDateString("en-IN")}</td>
      <td data-title="Price">${reservation.price}</td>
      <td data-title="Booking Time">${new Date(reservation.time).toLocaleString('en-IN', {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: "false"
      })}</td>
      <td data-title="Action">
        <div class="reservation-visit-button" id=${reservation.id}>
          <a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a>
        </div>
      </td>
      `;

      document.getElementById("reservation-table").appendChild(trElem);
  });


  // reservations.forEach((reservation) => {
  //   let trElem = document.createElement("tr");
  //   trElem.innerHTML = `
  //     <td>${reservation.id}</td>
  //     <td>${reservation.name}</td>
  //     <td>${reservation.adventureName}</td>
  //     <td>${reservation.person}</td>
  //     <td>${new Date(reservation.date).toLocaleDateString("en-IN")}</td>
  //     <td>${reservation.price}</td>
  //     <td>${new Date(reservation.time).toLocaleString('en-IN', {
  //       year: "numeric",
  //       day: "numeric",
  //       month: "long",
  //       hour: "numeric",
  //       minute: "numeric",
  //       second: "numeric",
  //       hour12: "false"
  //     })}</td>
  //     <td>
  //       <div class="reservation-visit-button" id=${reservation.id}>
  //         <a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a>
  //       </div>
  //     </td>
  //     `;

  //     document.getElementById("reservation-table").appendChild(trElem);
  // });
}

export { fetchReservations, addReservationToTable };
