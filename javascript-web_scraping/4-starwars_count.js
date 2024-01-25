#!/usr/bin/node
// importing the request module
const request = require('request');

// Getting the url to request from the command line arguments
const url = process.argv[2];
const characterId = 18;
let appearanceCount = 0;

request.get(url, (err, response, body) => {
  if (err) {
    console.log(err);
  }
  const films = JSON.parse(body);

  for (const film of films.results) {
    for (const character of film.characters) {
      if (character.includes(characterId)) {
        appearanceCount++;
      }
    }
  }
  console.log(appearanceCount);
});
