const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define the GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Define the POST endpoint
app.post("/bfhl", (req, res) => {
  const data = req.body;

  // Static user details
  const fullName = "Himanshu Kumar Modi";
  const dob = "31082003";
  const userId = `${fullName}_${dob}`;

  if (!data || !data.input) {
    return res.status(400).json({
      is_success: false,
      user_id: userId,
      error: "No input data provided",
    });
  }

  const inputArray = data.input;
  const numbers = [];
  const alphabets = [];

  inputArray.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(parseInt(item));
    } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  // Determine the highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(
    (char) => char >= "a" && char <= "z"
  );
  const highestLowercase = lowercaseAlphabets.length
    ? lowercaseAlphabets.sort().reverse()[0]
    : null;

  // Prepare the response
  const response = {
    is_success: true,
    user_id: userId,
    email_id: "himanshukumar.modi2021@gmail.com",
    roll_number: "21BCI0011",
    numbers,
    alphabets,
    highest_lowercase: highestLowercase,
  };

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
