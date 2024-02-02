const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

// This function is from Task 5 :
async function countStudents(path) {
  // Getting the file data asynchronously, then returning a promise
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const stringData = data.toString();
      // Converting data to array, slicing the first line containing column descriptions
      const arrayData = stringData.split('\n').slice(1);

      // Removing empty lines
      const filteredArrayData = arrayData.filter((line) => line !== '');
      const namesByField = {};

      filteredArrayData.forEach((line) => {
        // Splitting each string into an array (CSV, so using commas)
        const parts = line.split(',');
        // Getting the first name and the field values
        const firstName = parts[0];
        const field = parts[3];

        // If the field doesn't exist, create an empty array as value
        if (!namesByField[field]) {
          namesByField[field] = [];
        }
        // Pushing the name associated with the field into the array
        namesByField[field].push(firstName);
      });

      const results = [`Number of students: ${filteredArrayData.length}`];

      // Building the formatted message using the fields in the array
      const fields = Object.keys(namesByField);
      for (const field of fields) {
        const names = namesByField[field];
        const count = names.length;
        const list = names.join(', ');
        results.push(`Number of students in ${field}: ${count}. List: ${list}`);
      }
      return results;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

// Express app basic route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Express app custom route
app.get('/students', (req, res) => {
  // Getting the database file path from argv
  const path = process.argv[2];

  countStudents(path)
    .then((data) => {
      res.send(`This is the list of our students\n${data.join('\n')}`);
    })
    .catch((err) => {
      res.send(`Error: ${err.message}`);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/!`);
});

module.exports = app;
