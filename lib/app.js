/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import client from './client.js';

// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

// heartbeat route
app.get('/', (req, res) => {
  res.send('pizza API');
});

// API routes,
app.get('/api/pizza', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              type,
              url,
              year,
              spice_level as "spiceLevel",
              is_spicy as "isSpicy"
      FROM    pizza;
    `);

    // send back the data
    res.json(data.rows); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.get('/api/pizza/:id', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              type,
              url,
              year,
              isSpicy,
              is_spicy as "isSpicy"
      FROM    pizza
      WHERE   id = $1;
    `, [req.params.id]);

    // send back the data
    res.json(data.rows[0] || null); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

app.post('/api/pizza', async (req, res) => {
  try {
    const pizza = req.body;

    const data = await client.query(`
    INSERT INTo pizza (name, type, url, year, spice_level, is_spicy)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, name, type, url, year, spice_level as "spiceLevel", is_spicy as "isSpicy";

    `,
    [pizza.name, pizza.type, pizza.url, pizza.year, pizza.spiceLevel, pizza.isSpicy]);


    res.json(data.rows[0]);
    

  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/pizza/:id', async (req, res) => {
  try {
    const pizza = req.body;

    const data = await client.query(`
      UPDATE  pizza 
        SET   name = $1, 
              type = $2, 
              url = $3, 
              year = $4, 
              spice_level = $5, 
              is_spicy = $6
      WHERE   id = $7
      RETURNING id, name, type, url, year, spice_level as "spiceLevel", is_spicy as "isSpicy";
    `,
    [pizza.name, pizza.type, pizza.url, pizza.year, pizza.spiceLevel, pizza.isSpicy, req.params.id]);

    res.json(data.rows[0]); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });  
  }
});

export default app;