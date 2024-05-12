const renderEmail = require('../src/email/render-email');

describe('render-email.js tests', () => {
  it('should render email', (done) => {
    const request = {
      template: 'reservation-confirmation',
      parameters: {
        reservation: {
          parking_space_id: 1,
          reservation_start: '2026-04-26T14:20:48.000000Z',
          reservation_end: '2026-04-27T21:20:48.000000Z',
          user_id: 1,
          updated_at: '2024-05-12T19:20:40.000000Z',
          created_at: '2024-05-12T19:20:40.000000Z',
          id: 1,
          user: {
            id: 1,
            name: 'Ms. Bonnie Rempel',
            email: 'cborer@example.com',
            email_verified_at: '2024-05-12T19:20:40.000000Z',
            created_at: '2024-05-12T19:20:40.000000Z',
            updated_at: '2024-05-12T19:20:40.000000Z'
          },
          parking_space: {
            id: 1,
            address: '176 Kozey Viaduct\nWest Bud, WV 76159',
            created_at: '2024-05-12T19:20:40.000000Z',
            updated_at: '2024-05-12T19:20:40.000000Z'
          }
        }
      }
    };
    renderEmail(request, (err, html) => {
      expect(err).toBeNull();
      expect(html).toBeDefined();
      done();
    });
  });
});