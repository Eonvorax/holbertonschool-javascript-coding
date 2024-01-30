function displayMessage (arg) {
  // arg is a fd
  process.stdout.write(`${arg}\n`);
}
module.exports = displayMessage;
