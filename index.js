const startServer = require('./setup'); // Import the startServer function

async function main() {
  try {
    await startServer(); // Call the startServer function
    console.log('Server started successfully!');
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

main();