// tests/integration/api.test.ts
import request from 'supertest';
import app from '../../src/server';

describe('API Integration Test', () => {
  it('POST /upsell returns a suggestion', async () => {
    const res = await request(app)
      .post('/upsell')
      .send({ cart: [{id:1, name:'Shoes', price:40}] });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('upsell');
    expect(typeof res.body.upsell).toBe('string');
  });
});
