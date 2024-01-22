#!/usr/bin/node
// importing the 'fs' File System module
const fs = require('fs');

// Geting the file path from the command line arguments
const filePath = process.argv[2];

// Reading the content of the file in utf-8
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    // Print the error object if an error occurred during reading
    console.log(err);
  } else {
    // Print the content of the file
    console.log(data);
  }
});
