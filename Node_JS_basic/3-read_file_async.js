// import a module needed to work with files
const fs = require('fs').promises;

async function countStudents(path) {
  // get the file data asynchronously
  return fs.readFile(path, 'utf8')
    .then((data) => {
      // Split the data by lines
      const lines = data.trim().split('\n');

      // Initialize variables to count students in each field
      let csCount = 0;
      let sweCount = 0;
      const csList = [];
      const sweList = [];

      // Iterate through each line
      for (const line of lines) {
        const fields = line.split(',');
        const [firstName, lastName, age, field] = fields;

        // Check if the line is not empty and all fields are present
        if (firstName && lastName && age && field) {
          if (field === 'CS') {
            csCount += 1;
            csList.push(firstName);
          } else if (field === 'SWE') {
            sweCount += 1;
            sweList.push(firstName);
          }
        }
      }

      // Log the number of students and their lists
      console.log(`Number of students: ${csCount + sweCount}`);
      console.log(`Number of students in CS: ${csCount}. List: ${csList.join(', ')}`);
      console.log(`Number of students in SWE: ${sweCount}. List: ${sweList.join(', ')}`);
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
