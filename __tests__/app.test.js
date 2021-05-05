import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  beforeAll(() => {
    execSync('npm run setup-db');
  });

  afterAll(async () => {
    return client.end();
  });

  const expectedPizza = [
    {
      name: 'Yummy',
      type: 'Cheese',
      url: 'cats/felix.png',
      year: 1999,
      spiceLevel: 1,
      isSpicy: false
    },
    {
      name: 'Delicious',
      type: 'Pepperoni',
      url: 'cats/garfield.jpeg',
      year: 2000,
      spiceLevel: 2,
      isSpicy: true
    },
    {
      name: 'Heaven',
      type: 'Triple Cheese',
      url: 'cats/duchess.jpeg',
      year: 2001,
      spiceLevel: 3,
      isSpicy: false
    },
    {
      name: 'Saucy',
      type: 'No Cheese',
      url: 'cats/stimpy.jpeg',
      year: 2002,
      spiceLevel: 4,
      isSpicy: true
    },
    {
      name: 'Healthy',
      type: 'Veggies',
      url: 'cats/sylvester.jpeg',
      year: 2003,
      spiceLevel: 5,
      isSpicy: false
    },
    {
      name: 'Hot',
      type: 'Peppers',
      url: 'cats/tigger.jpeg',
      year: 2004,
      spiceLevel: 6,
      isSpicy: true
    },
    {
      name: 'Sweet',
      type: 'Pineapple',
      url: 'cats/hello-kitty.jpeg',
      year: 2005,
      spiceLevel: 7,
      isSpicy: false
    },
    {
      name: 'Meaty',
      type: 'Sausage',
      url: 'cats/hobbs.jpeg',
      year: 2006,
      spiceLevel: 8,
      isSpicy: true
    }
  ];

  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it('GET /api/pizza', async () => {
    // act - make the request
    const response = await request.get('/api/pizza');

    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(expectedPizza);

  });

  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('GET /api/pizza/:id', async () => {
    const response = await request.get('/api/pizza/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedPizza[1]);
  });
});