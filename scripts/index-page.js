//Comments array
const comments = [
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    text: "I can t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Connor Walton",
    date: "02/17/2021",
    text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
];

//Create comment card
function createCommentCard(comment) {
  const sectionEl = document.createElement("article");
  sectionEl.classList.add("comment");

  //Right column
  const avatarEl = document.createElement("div");
  avatarEl.classList.add("comment__icon");

  //Left column
  const commentEl = document.createElement("div");
  commentEl.classList.add("comment__main");

  //Container for name and date
  const namedateEl = document.createElement("div");
  namedateEl.classList.add("comment__main-namedate");

  const heading = document.createElement("h3");
  heading.innerText = comment.name;
  heading.classList.add("comment__name");

  const dateEl = document.createElement("span");
  dateEl.innerText = comment.date;
  dateEl.classList.add("comment__date");

  const paragraphEl = document.createElement("p");
  paragraphEl.innerText = comment.text;
  paragraphEl.classList.add("comment__text");

  //Append icon and comment body to section
  sectionEl.appendChild(avatarEl);
  sectionEl.appendChild(commentEl);

  //Append Name and date to div
  namedateEl.appendChild(heading);
  namedateEl.appendChild(dateEl);

  //Append namedate and paragraph to comment div
  commentEl.appendChild(namedateEl);
  commentEl.appendChild(paragraphEl);

  // return commentEl;
  return sectionEl;
}

function renderComments() {
  const myCommentsEl = document.querySelector(".comments");

  // Clear the comments div first
  myCommentsEl.innerHTML = "";

  comments.forEach((comment) => {
    const card = createCommentCard(comment);
    myCommentsEl.appendChild(card);
  });
}

function getCurrentDate() {
  const currentDate = new Date(Date.now());
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  return `${month}/${day}/${year}`;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const cardData = {
    name: event.target.name.value,
    date: getCurrentDate(),
    text: event.target.text.value,
  };

  comments.push(cardData);
  renderComments();
}

const formEl = document.querySelector(".form__fields");

formEl.addEventListener("submit", handleFormSubmit);
renderComments();
