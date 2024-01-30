process.stdin.setEncoding('utf8');

const welcomeMessage = 'Welcome to Holberton School, what is your name?';
process.stdout.write(`${welcomeMessage}\n`);

process.stdin.on('readable', () => {
    const userInput = process.stdin.read();
    if (userInput) {
        process.stdout.write(`Your name is: ${userInput}`);
    }
    process.stdout.write('This important software is now closing\n');

    process.exit()
});
