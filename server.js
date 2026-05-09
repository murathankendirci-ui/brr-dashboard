const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/search', async (req, res) => {
  try {
    const { apiKey, postcode, list, radius } = req.body;
    
    if (!apiKey || !postcode || !list) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    
    const url = `https://api.propertydata.co.uk/sourced-properties?key=${apiKey}&postcode=${postcode}&list=${list}&radius=${radius || 10}&results=500`;
    
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'BRR Backend API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
