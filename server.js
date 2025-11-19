// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/scrape/:woord', async (req, res) => {
  const woord = req.params.woord;
  const url = `https://www.mijnwoordenboek.nl/puzzelwoordenboek/${woord}/1}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const resultaten = $('.puzzel-woord a')
      .map((i, el) => $(el).text().trim())
      .get()
      .filter(t => t && !t.includes('advertentie'));

    res.json({ woord, resultaten });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001);
