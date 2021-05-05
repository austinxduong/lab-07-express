/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import pizza from './pizza.js';

run();

async function run() {

  try {

    await Promise.all(
      pizza.map(pizzas => {
        return client.query(`
          INSERT INTO pizza (name, type, url, year, spiceLevel, is_Spicy)
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
        [pizzas.name, pizzas.type, pizzas.url, pizzas.year, pizzas.spiceLevel, pizzas.isSpicy]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}