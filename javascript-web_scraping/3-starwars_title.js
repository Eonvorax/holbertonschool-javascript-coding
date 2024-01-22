#!/usr/bin/node
// importing the request module
const request = require('request');

// Getting the url to request from the command line arguments
const url = 'https://swapi-api.hbtn.io/api/films/' + process.argv[2];

request.get(url, (err, response, body) => {
  if (err) {
    console.log(err);
  }
  console.log(JSON.parse(body).title);
});
