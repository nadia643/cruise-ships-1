/* globals describe it expect */
const Port = require('../src/Port.js');
const Ship = require('../src/Ship.js');
const Itinerary = require('../src/Itinerary.js');

describe('Port', () => {
  it('can be instantiated', () => {
    expect(new Port()).toBeInstanceOf(Object);
  });

  it('can add a ship', () => {
    const port = new Port('Dover');
    const itinerary = new Itinerary([port]);
    const ship = new Ship(itinerary);

    port.addShip(ship);

    expect(port.ships).toContain(ship);
  });

  it('can remove a ship', () => {
    const port = new Port('Dover');
    const itinerary = new Itinerary([port]);
    const titanic = new Ship(itinerary);
    const queenMary = new Ship(itinerary);

    port.addShip(titanic);
    port.addShip(queenMary);
    port.removeShip(queenMary);

    expect(port.ships).toEqual([titanic]);
  });

  it('has a name', () => {
    const port = new Port('Dover');

    expect(port.name).toBe('Dover');
  });
});
