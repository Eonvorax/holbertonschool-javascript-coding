#!/usr/bin/node
// importing the 'fs' File System module
const fs = require('fs');

// Getting the file path and the string from the command line arguments
const filePath = process.argv[2];
const stringToWrite = process.argv[3];

// Writing to the file in utf-8
fs.writeFile(filePath, stringToWrite, 'utf-8', (err) => {
  if (err) {
    // Print the error object if an error occurred during writing
    console.log(err);
  }
});
