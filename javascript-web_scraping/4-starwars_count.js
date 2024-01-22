#!/usr/bin/node
// importing the request module
const request = require('request');

// Getting the url to request from the command line arguments
const url = 'https://swapi-api.hbtn.io/api/films/';
const characterId = 18;
let appearanceCount = 0;

request.get(url, (err, response, body) => {
  if (err) {
    console.log(err);
  }
  const films = JSON.parse(body);

  for (const film of films.results) {
    if (film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
      appearanceCount++;
    }
  }
  console.log(appearanceCount);
});
