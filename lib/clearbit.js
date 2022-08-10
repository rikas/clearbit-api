const authorization = 'Bearer sk_29221b150bf36ba81bf34fe7d6f5f8a2';

// Replace :email with the actual email!
const url = 'https://person.clearbit.com/v1/people/email/';

// DOM elements to populate the user info
const userInfo = document.querySelector('#userInfo');
const nameRow = document.querySelector('#userName');
const emailRow = document.querySelector('#userEmail');
const userBio = document.querySelector('#userBio');
const location = document.querySelector('#userLocation');
const avatar = document.querySelector('#userAvatar');

const form = document.querySelector('#clearbitForm');
const email = document.querySelector('#clearbitEmail');
const button = document.querySelector('#clearbitSubmit');

const populateDOM = (data) => {
  // 4. take the name, email, bio, location and avatar from that JSON
  emailRow.innerText = data.email;
  userBio.innerText = data.bio;
  nameRow.innerText = data.name.fullName;
  location.innerText = data.location;
  avatar.src = data.avatar;

  // 4.1 clear the value of the input
  email.value = '';

  // 6. remove 'd-none' from the info div (userInfo.classList.remove('d-none'))
  userInfo.classList.remove('d-none');
};

// When the user inputs the email check if we have more than 3 characters and enable the submit
// button.
email.addEventListener('input', (event) => {
  if (email.value.length > 3) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }

  // we could write this like so: button.disabled = email.value.length < 4
});

// 1. add event listener to the form (event: 'submit')
form.addEventListener('submit', (event) => {
  // 1.05 prevent the default behaviour of the submit event
  event.preventDefault();

  // 1.1 read the email value to use in the URL
  const replacedUrl = `${url}${email.value}`;

  button.disabled = true;

  // 2. request the API (fetch) with the email
  // 2.1 the fetch needs to have the Authorization header
  fetch(replacedUrl, { headers: { Authorization: authorization } })
    .then((response) => response.json())
    .then((data) => {
      populateDOM(data);
    });
});
