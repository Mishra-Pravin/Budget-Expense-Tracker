// Import the express module
let express = require('express');
// Create an instance of express
let app = express();
// Import the body-parser module
let bodyParser = require('body-parser');
// Import the mongoose module for MongoDB interactions
let mongoose = require('mongoose');
// Import the cors module to enable Cross-Origin Resource Sharing
let cors = require('cors');

// Define the MongoDB connection string
let url = 'mongodb://localhost:27017/blog';

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Parse incoming request bodies in a JSON format
app.use(bodyParser.json());
// Enable CORS for all HTTP methods
app.use(cors());

// Connect to MongoDB
mongoose.connect(url)
  // If the connection is successful, log a success message
  .then(() => console.log("Connected to MongoDB Database"))
  // If the connection fails, log the error and exit the process
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

  app.use('/user', require('./routes/userRoutes'));
  app.use('/expense', require('./routes/expenseRoutes'));

// Define a route handler for GET requests to the root URL
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello World!');
});

// Define the port the server should listen on
const PORT = process.env.PORT || 3000;
// Start the server and listen on the defined port
app.listen(PORT, () => {
  // Log a message indicating the server is running
  console.log(`Server is running on port ${PORT}`);
});