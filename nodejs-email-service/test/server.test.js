const request = require('supertest');
const server = require('../src/server/server');

describe('server.js tests', () => {
  it('should return 404 for non-existing routes', async () => {
    const response = await request(server).get('/non-existing-route');
    expect(response.status).toBe(404);
  });
});