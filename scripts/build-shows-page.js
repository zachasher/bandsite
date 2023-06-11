// Shows array
const shows = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

// Create show card
function createShowCard(show) {
  const showEl = document.createElement("article");
  showEl.classList.add("show");

  const detailsEl = document.createElement("div");
  detailsEl.classList.add("show__details");

  const dateLabelEl = document.createElement("h4");
  dateLabelEl.innerText = "Date";
  dateLabelEl.classList.add("show__label");

  const dateEl = document.createElement("p");
  dateEl.innerText = show.date;
  dateEl.classList.add("show__date");

  const venueLabelEl = document.createElement("h4");
  venueLabelEl.innerText = "Venue";
  venueLabelEl.classList.add("show__label");

  const venueEl = document.createElement("p");
  venueEl.innerText = show.venue;
  venueEl.classList.add("show__venue");

  const locationLabelEl = document.createElement("h4");
  locationLabelEl.innerText = "Location";
  locationLabelEl.classList.add("show__label");

  const locationEl = document.createElement("p");
  locationEl.innerText = show.location;
  locationEl.classList.add("show__location");

  const buttonEl = document.createElement("button");
  buttonEl.innerText = "BUY TICKETS";
  buttonEl.classList.add("show__button");

  //Append elements to show details
  detailsEl.appendChild(dateLabelEl);
  detailsEl.appendChild(dateEl);
  detailsEl.appendChild(venueLabelEl);
  detailsEl.appendChild(venueEl);
  detailsEl.appendChild(locationLabelEl);
  detailsEl.appendChild(locationEl);

  //Append elements to show card
  showEl.appendChild(detailsEl);
  showEl.appendChild(buttonEl);

  return showEl;
}

function renderShows() {
  const myShowsEl = document.querySelector(".shows");

  // Clear the comments div first
  myShowsEl.innerHTML = "";

  shows.forEach((show) => {
    const card = createShowCard(show);
    myShowsEl.appendChild(card);
  });
}

renderShows();