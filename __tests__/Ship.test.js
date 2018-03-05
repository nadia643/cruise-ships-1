/* globals describe it expect */
const Ship = require('../src/Ship.js');
const Port = require('../src/Port.js');

describe('Ship', () => {
  it('can be instantiated', () => {
    expect(new Ship()).toBeInstanceOf(Object);
  });

  it('has a starting port', () => {
    const port = new Port('Dover');
    const ship = new Ship(port);

    expect(ship.currentPort).toBe(port);
  });

  it('can set sail', () => {
    const port = new Port('Dover');
    const ship = new Ship(port);

    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
  });
});
