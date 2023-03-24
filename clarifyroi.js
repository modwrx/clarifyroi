function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

createCookie("wc_visitor", "94387-44e84ff3-ae0f-d658-e5c4-bd8003ecf4a8", 365);



var myCookieValue = readCookie("wc_visitor");
console.log(myCookieValue);


function readCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for(var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

    // Retrieve the query string parameters from the current URL
const queryString = window.location.search;

// Parse the query string into an object
const urlParams = new URLSearchParams(queryString);

// Get the values of the source, medium, and campaign parameters
const source = urlParams.get('utm_source');
const medium = urlParams.get('utm_medium');
const campaign = urlParams.get('utm_campaign');
const keyword = urlParams.get('utm_keyword');

// Do something with the captured values
console.log('Source: ' + source);
console.log('Medium: ' + medium);
console.log('Campaign: ' + campaign);
console.log('Keyword: ' + keyword);

const data = {
    'Source: ' : source,
    'user_id' : myCookieValue
};

// Define the API endpoint URL
const apiUrl = 'http://192.168.1.30/api/wctest';

// Call the API endpoint when the page loads
window.addEventListener('load', () => {
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Handle the API response data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occur during the API request
      console.error(error);
    });
});
