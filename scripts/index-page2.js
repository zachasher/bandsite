//Function to convert timestamp to date
function convertedDate(date) {
  const showDate = new Date(date);
  const dateformat = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  const newshowdate = showDate
    .toLocaleDateString("en-US", dateformat)
    .replace(/\//g, "-");
  const [mm, dd, yyyy] = newshowdate.split("-");
  return `${mm}/${dd}/${yyyy}`;
}

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
  dateEl.innerText = convertedDate(comment.timestamp);
  dateEl.classList.add("comment__date");

  const paragraphEl = document.createElement("p");
  paragraphEl.innerText = comment.comment;
  paragraphEl.classList.add("comment__text");

  const buttonsEl = document.createElement("div");
  buttonsEl.classList.add("comment__buttons");

  const likeEl = document.createElement("button");
  //   likeEl.src = "/assets/icons/icon-like.svg";
  likeEl.classList.add("comment__like");

  const deleteEl = document.createElement("button");
  //   deleteEl.src = "/assets/icons/icon-delete.svg";
  deleteEl.classList.add("comment__delete");
  deleteEl.addEventListener("click", () => {
    deleteComment(comment.id);
    sectionEl.remove();
  });

  //Append like and delete to div
  buttonsEl.appendChild(likeEl);
  buttonsEl.appendChild(deleteEl);

  //Append Name and date to div
  namedateEl.appendChild(heading);
  namedateEl.appendChild(dateEl);

  //Append namedate and paragraph to comment div
  commentEl.appendChild(namedateEl);
  commentEl.appendChild(paragraphEl);
  commentEl.appendChild(buttonsEl);

  //Append icon and comment body to section
  sectionEl.appendChild(avatarEl);
  sectionEl.appendChild(commentEl);

  // return commentEl;
  return sectionEl;
}

const myCommentsEl = document.querySelector(".comments");

//Import data from API and render into shows
const commentsURL = "https://project-1-api.herokuapp.com/comments?api_key=zach";

function renderComments() {
  axios.get(commentsURL).then((response) => {
    console.log(response.data);
    comments = response.data;
    comments.forEach((comment) => {
      //   createCommentCard(comment);
      const card = createCommentCard(comment);
      myCommentsEl.appendChild(card);
    });
  });
}

//Function tp handle the comment form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get values from input fields
  const commentName = document.querySelector("#name").value;
  const commentText = document.querySelector("#comment").value;

  // Create an object containing the comment data
  const commentData = {
    name: commentName,
    comment: commentText,
    // timestamp: getCurrentDate(),
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Post comment using axios
  axios
    .post(commentsURL, commentData, config)
    .then((response) => {
      console.log(response.data);

      // Create a new comment card and append it to the comments section
      const newComment = response.data;
      const card = createCommentCard(newComment);
      myCommentsEl.appendChild(card);

      // Clear the form fields
      document.querySelector("#name").value = "";
      document.querySelector("#comment").value = "";
    })
    //Error message
    .catch((error) => {
      console.error("Error submitting comment:", error);
    });
}

// Add event listener to the form
const formEl = document.querySelector(".form__fields");
formEl.addEventListener("submit", handleFormSubmit);

renderComments();

//Delete comments function
function deleteComment(commentId) {
  const deleteURL = `https://project-1-api.herokuapp.com/comments/${commentId}?api_key=zach`;

  axios
    .delete(deleteURL)
    .then((response) => {
      console.log(response.data);
      // Handle successful deletion if needed
    })
    .catch((error) => {
      console.error("Error deleting comment:", error);
    });
}
