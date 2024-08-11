const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ask', async (req, res) => {
  const input = req.body.question;

  if (!input) {
    return res.status(400).send('Please provide a question.');
  }

  try {
    const { data } = await axios.get(`https://nash-api-end.onrender.com/freegpt4o8k?question=${encodeURIComponent(input)}`);
    let response = JSON.parse(data.answer).response;

    response = response.replace(/\n\nIs this answer helpful to you\?/, '');

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});