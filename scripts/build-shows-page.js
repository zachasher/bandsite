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

  const dateLabelEl = document.createElement("h4");
  dateLabelEl.innerText = "DATE";
  dateLabelEl.classList.add("show__label");

  const dateEl = document.createElement("p");
  dateEl.innerText = show.date;
  dateEl.classList.add("show__date");

  const venueLabelEl = document.createElement("h4");
  venueLabelEl.innerText = "VENUE";
  venueLabelEl.classList.add("show__label");

  const venueEl = document.createElement("p");
  venueEl.innerText = show.venue;
  venueEl.classList.add("show__venue");

  const locationLabelEl = document.createElement("h4");
  locationLabelEl.innerText = "LOCATION";
  locationLabelEl.classList.add("show__label");

  const locationEl = document.createElement("p");
  locationEl.innerText = show.location;
  locationEl.classList.add("show__location");

  const buttonEl = document.createElement("button");
  buttonEl.innerText = "BUY TICKETS";
  buttonEl.classList.add("show__button");

  //Append Elements to section
  showEl.appendChild(dateLabelEl);
  showEl.appendChild(dateEl);
  showEl.appendChild(venueLabelEl);
  showEl.appendChild(venueEl);
  showEl.appendChild(locationLabelEl);
  showEl.appendChild(locationEl);

  showEl.appendChild(buttonEl);

  return showEl;
}

//Create Section Heading
const showHeaderEl = document.createElement("h2");
showHeaderEl.innerText = "Shows";
showHeaderEl.classList.add("shows__title");

// Creating labels row for tablet & desktop view
const labelsEl = document.createElement("div");
labelsEl.classList.add("shows__label-container");

const labelsdateEl = document.createElement("h4");
labelsdateEl.innerText = "DATE";
labelsdateEl.classList.add("shows__label");

const labelsvenueEl = document.createElement("h4");
labelsvenueEl.innerText = "VENUE";
labelsvenueEl.classList.add("shows__label");

const labelslocationEl = document.createElement("h4");
labelslocationEl.innerText = "LOCATION";
labelslocationEl.classList.add("shows__label");

//Append labels to label element
labelsEl.appendChild(labelsdateEl);
labelsEl.appendChild(labelsvenueEl);
labelsEl.appendChild(labelslocationEl);

//Append header, labels and show cards to section
const myShowsEl = document.querySelector(".shows");

myShowsEl.innerHTML = "";
myShowsEl.appendChild(showHeaderEl);
myShowsEl.appendChild(labelsEl);

function renderShows() {
  shows.forEach((show) => {
    const card = createShowCard(show);
    myShowsEl.appendChild(card);
  });
}

renderShows();
