//Dynamic timestamp converter function
function convertedDate(date) {
  const commentDate = new Date(date);
  const currentTime = new Date();
  const timeDifference = Math.floor((currentTime - commentDate) / 1000); //Convert ms to s

  if (timeDifference < 60) {
    return `${timeDifference} seconds ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} minutes ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hours ago`;
  } else if (timeDifference < 2592000) {
    const days = Math.floor(timeDifference / 86400);
    return `${days} days ago`;
  } else if (timeDifference < 31536000) {
    const months = Math.floor(timeDifference / 2592000);
    return `${months} months ago`;
  } else {
    const years = Math.floor(timeDifference / 31536000);
    return `${years} years ago`;
  }
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

  //Create like button + counter
  const likeBoxEl = document.createElement("div");
  likeBoxEl.classList.add("comment__like");

  const likeEl = document.createElement("button");
  likeEl.classList.add("comment__like-button");
  likeEl.addEventListener("click", () => {
    incrementLikes(comment.id, likeCountEl);
  });

  const likeCountEl = document.createElement("p");
  likeCountEl.innerText = comment.likes;
  likeCountEl.classList.add("comment__like-count");

  likeBoxEl.appendChild(likeEl);
  likeBoxEl.appendChild(likeCountEl);

  //Create delete button and add event listener
  const deleteEl = document.createElement("button");
  deleteEl.classList.add("comment__delete");
  deleteEl.addEventListener("click", () => {
    deleteComment(comment.id);
    sectionEl.remove();
  });

  //Append like-box and delete to div
  buttonsEl.appendChild(likeBoxEl);
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
    })
    .catch((error) => {
      console.error("Error deleting comment:", error);
    });
}

//Function to increment likes + like counter
function incrementLikes(commentId, likeCountEl) {
  const incrementURL = `https://project-1-api.herokuapp.com/comments/${commentId}/like?api_key=zach`;

  axios
    .put(incrementURL)
    .then((response) => {
      console.log(response.data);
      const updatedLikes = response.data.likes;
      likeCountEl.innerText = updatedLikes;
    })
    .catch((error) => {
      console.error("Error incrementing likes:", error);
    });
}
