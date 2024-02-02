const http = require('http');
const url = require('url');
const fs = require('fs').promises;

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

// A basic app server
const app = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url).pathname;
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (reqUrl === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (reqUrl === '/students') {
    const path = process.argv[2];
    res.write('This is the list of our students\n');
    countStudents(path)
      .then((data) => {
        res.write(data.join('\n'));
        res.end();
      })
      .catch((err) => {
        res.write(err.message);
        res.end();
      });
  }
});

app.listen(1245);

module.exports = app;
