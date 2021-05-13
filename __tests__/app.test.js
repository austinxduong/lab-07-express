import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';
// import pizza from '../data/pizza.js';

const request = supertest(app);

describe('API Routes', () => {



  afterAll(async () => {
    return client.end();
  });

  describe('/api/pizza', () => {


    beforeAll(() => {
      execSync('npm run recreate-tables');
    });


    let yummy = {
      id: expect.any(Number),
      name: 'Yummy',
      type: 'Cheese',
      url: 'cats/felix.png',
      year: 1999,
      spiceLevel: 1,
      isSpicy: false
    };
    let delicious = {
      id: expect.any(Number),
      name: 'Delicious',
      type: 'Pepperoni',
      url: 'cats/garfield.jpeg',
      year: 2000,
      spiceLevel: 2,
      isSpicy: true
    };
    let heaven = {
      name: 'Heaven',
      type: 'Triple Cheese',
      url: 'cats/duchess.jpeg',
      year: 2001,
      spiceLevel: 3,
      isSpicy: false
    };
    // let saucy = {
    //   name: 'Saucy',
    //   type: 'No Cheese',
    //   url: 'cats/stimpy.jpeg',
    //   year: 2002,
    //   spiceLevel: 4,
    //   isSpicy: true
    // };

    it('POST yummy to /api/pizza', async () => {
      const response = await request
        .post('/api/pizza')
        .send(yummy);

    
      // expect(response.status).toBe(200);
      expect(response.body).toEqual(yummy);

      yummy = response.body;
    });


    it('PUT updated yummy to /api/pizza/:id', async () => {
      // console.log(yummy);
      yummy.spiceLevel = 1;
      yummy.name = ' yummy pizza';

      const response = await request
        .put('/api/pizza/1')
        .send(yummy);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(yummy);

    });

    it('getroute', async () => {
      const newHeaven = await request.post('/api/pizza').send(heaven);

      heaven = newHeaven.body;
      const response = await request.get('/api/pizza');
      // console.log(response.body);
      expect (response.body).toEqual(    
        [
          {
            id: 1,
            name: ' yummy pizza',
            type: 'Cheese',
            url: 'cats/felix.png',
            year: 1999,
            spiceLevel: 1,
            isSpicy: false
          },
          {
            id: 2,
            name: 'Heaven',
            type: 'Triple Cheese',
            url: 'cats/duchess.jpeg',
            year: 2001,
            spiceLevel: 3,
            isSpicy: false
          }
        ]);
      
    });
  });
    
  

  // // If a GET request is made to /api/cats, does:
  // // 1) the server respond with status of 200
  // // 2) the body match the expected API data?
  // it('GET /api/pizza', async () => {
  //   // act - make the request
  //   const response = await request.get('/api/pizza');

  //   // was response OK (200)?
  //   expect(response.status).toBe(200);

  //   // did it return the data we expected?
  //   expect(response.body).toEqual(expectedPizza);

  // });

  // // If a GET request is made to /api/cats/:id, does:
  // // 1) the server respond with status of 200
  // // 2) the body match the expected API data for the cat with that id?
  // test('GET /api/pizza/:id', async () => {
  //   const response = await request.get('/api/pizza/2');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(expectedPizza[1]);
    
});    
describe.skip('seed data tests', () => {

  beforeAll(() => {
    execSync('npm run setup-db');
  });
    
  it('GET /api/pizza', async () => {
    // act - make the request
    const response = await request.get('/api/pizza');
  
    // was response OK (200)?
    expect(response.status).toBe(200);
  
    // did it return some data?
    expect(response.body.length).toBeGreaterThan(0);
        
    // did the data get inserted?
    expect(response.body[0]).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      type: expect.any(String),
      url: expect.any(String),
      year: expect.any(Number),
      is_spicy: expect.any(Boolean),
      spice_level: expect.any(Number),
    });
  });
  
});
  
//   });

// });