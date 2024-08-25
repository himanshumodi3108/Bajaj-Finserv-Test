const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const USER_INFO = {
  fullName: "Himanshu Kumar Modi",
  dob: "31082003",
  email: "himanshukumar.modi2021@gmail.com",
  roll_number: "21BCI0011",
  userId: "himanshumodi_31082003",
};

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Root route is working!");
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: "1" });
});

app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));

  const lowercaseAlphabets = alphabets.filter(
    (item) => item === item.toLowerCase()
  );
  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

  const response = {
    is_success: true,
    user_id: USER_INFO.user_id,
    email: USER_INFO.email,
    roll_number: USER_INFO.roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  };

  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
