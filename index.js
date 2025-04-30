const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API_KEY = process.env.COC_API_KEY;

app.get('/clash-proxy', async (req, res) => {
  const tag = req.query.tag;
  const url = `https://api.clashofclans.com/v1/players/${encodeURIComponent(tag)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abruf der Daten' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server läuft auf Port ${port}`));
