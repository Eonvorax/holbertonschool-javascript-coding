#!/usr/bin/node
// importing the request module
const request = require('request');

// Getting the url to request from the command line arguments
const url = process.argv[2];

request.get(url, (err, response, body) => {
  if (err) {
    console.log(err);
  }
  const tasks = JSON.parse(body);

  // Could use forEach and a secondary object completedTasksByUser
  // Method using reduce (see docs) below
  // https://github.com/mbeaudru/modern-js-cheatsheet?tab=readme-ov-file#arrayprototypereduce
  const completedTasksByUser = tasks.reduce((accumulator, task) => {
    if (task.completed) {
      // Checking if the user ID is already in the accumulator object
      if (accumulator[task.userId]) {
        // If yes, increment the completed tasks count for the user
        accumulator[task.userId]++;
      } else {
        // If no, initialize the completed tasks count for the user to 1
        accumulator[task.userId] = 1;
      }
    }
    return accumulator;
  }, {});

  console.log(completedTasksByUser);
});
