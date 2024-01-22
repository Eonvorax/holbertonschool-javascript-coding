#!/usr/bin/node
// importing the request module
const request = require('request');

// Getting the url to request from the command line arguments
const url = process.argv[2];

request.get(url, (err, response) => {
  if (err) {
    console.error('code:', err);
  }
  console.log('code:', response && response.statusCode);
});
