#!/usr/bin/node
// importing the 'fs' File System module
const fs = require('fs');
// importing the request module
const request = require('request');

request(process.argv[2], function (error, response, body) {
  if (error) {
    console.error('code:', error);
  }
  // Writing to the file in utf-8
  fs.writeFile(process.argv[3], body, 'utf-8', (err) => {
    if (err) {
      // Print the error object if an error occurred during writing
      console.log(err);
    }
  });
});
