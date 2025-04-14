import fetch from 'node-fetch';

// Your server code logic here
// Example: Fetch data from an API
const API_URL = 'https://api.example.com/data';

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log('Fetched data:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Additional code for your server logic, e.g. creating an Express server

