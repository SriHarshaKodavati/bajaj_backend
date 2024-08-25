const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper function to process data
function processData(data) {
  const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
  const alphabets = data.filter(item => isNaN(item) && item.trim() !== '');

  const lowercaseAlphabets = alphabets.filter(char => /^[a-z]$/.test(char));
  const highestLowercase = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

  return {
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase
  };
}

// POST endpoint
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: "Invalid input format" });
  }

  const processed = processData(data);

  res.json({
    is_success: true,
    user_id: "sri_harshavardhan_19072004", // Replace with your actual user ID (fullname_ddmmyyyy)
    email: "sriharsha.kodavati@gmail.com", // Ensure there are no extra spaces
    roll_number: "21BCE8726", // Replace with your actual roll number
    numbers: processed.numbers,
    alphabets: processed.alphabets,
    highest_lowercase_alphabet: processed.highest_lowercase_alphabet
  });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
