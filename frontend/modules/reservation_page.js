import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
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
  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  reservations.forEach((reservation) => {
    let trElem = document.createElement("tr");
    trElem.innerHTML = `

      <td data-title="Transaction ID">${reservation.id}</td>
      <td data-title="Booking Name">${reservation.name}</td>
      <td data-title="Adventure)">${reservation.adventureName}</td>
      <td data-title="Person(s">${reservation.person}</td>
      <td data-title="Date">${new Date(reservation.date).toLocaleDateString(
        "en-IN"
      )}</td>
      <td data-title="Price">${reservation.price}</td>
      <td data-title="Booking Time">${new Date(reservation.time).toLocaleString(
        "en-IN",
        {
          year: "numeric",
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: "false",
        }
      )}</td>
      <td data-title="Action">
        <div class="reservation-visit-button" id=${reservation.id}>
          <a href="../detail/?adventure=${
            reservation.adventure
          }">Visit Adventure</a>
        </div>
      </td>
      `;

    document.getElementById("reservation-table").appendChild(trElem);
  });
}

export { fetchReservations, addReservationToTable };
