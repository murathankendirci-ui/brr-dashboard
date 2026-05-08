const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Serve the dashboard as static files
app.use(express.static('.'));

app.post('/search', async (req, res) => {
  try {
    const { apiKey, postcode, list } = req.body;
    
    if (!apiKey || !postcode || !list) {
      return res.json({ error: 'Missing required parameters' });
    }
    
    const url = `https://api.propertydata.co.uk/sourced-properties?key=${apiKey}&postcode=${postcode}&list=${list}&standardised_type=terraced_house,semi_detached_house,detached_house&results=500`;
    
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
