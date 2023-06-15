// Shows array
const showlist = [];

//Function to convert timestamp to date
function convertedDate(date) {
  const showDate = new Date(date);
  const dateformat = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  const newshowdate = showDate
    .toLocaleDateString("en-US", dateformat)
    .replace(/,/g, "");
  return newshowdate;
}

// Create show card
function createShowCard(show) {
  const showEl = document.createElement("article");
  showEl.classList.add("show");

  const dateLabelEl = document.createElement("h4");
  dateLabelEl.innerText = "DATE";
  dateLabelEl.classList.add("show__label");

  const dateEl = document.createElement("p");
  dateEl.innerText = convertedDate(show.date);
  dateEl.classList.add("show__date");

  const venueLabelEl = document.createElement("h4");
  venueLabelEl.innerText = "VENUE";
  venueLabelEl.classList.add("show__label");

  const venueEl = document.createElement("p");
  venueEl.innerText = show.place;
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

  // Adds a click event listener to the whole show card
  showEl.addEventListener("click", () => {
    // Removes active class from all show cards
    const allShows = document.querySelectorAll(".show");
    allShows.forEach((showCard) => {
      showCard.classList.remove("show--active");
    });

    // Adds the active class to the clicked show card
    showEl.classList.add("show--active");
  });

  //Append Elements to section
  showEl.appendChild(dateLabelEl);
  showEl.appendChild(dateEl);
  showEl.appendChild(venueLabelEl);
  showEl.appendChild(venueEl);
  showEl.appendChild(locationLabelEl);
  showEl.appendChild(locationEl);

  showEl.appendChild(buttonEl);

  myShowsEl.appendChild(showEl);

  return showEl;
}

const showsURL = "https://project-1-api.herokuapp.com/showdates?api_key=zach";
function renderShows() {
  axios.get(showsURL).then((response) => {
    console.log(response.data);
    shows = response.data;
    shows.forEach((show) => {
      createShowCard(show);
    });
  });
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

renderShows();
