/* globals describe it expect */
const Ship = require('../src/Ship.js');
const Port = require('../src/Port.js');
const Itinerary = require('../src/Itinerary.js');

describe('Ship', () => {
  describe('with a port and itinerary', () => {

  });

  it('can be instantiated', () => {
    const port = new Port('Dover');
    const itinerary = new Itinerary([port]);
    const ship = new Ship(itinerary);

    expect(ship).toBeInstanceOf(Object);
  });

  it('has a starting port', () => {
    const port = new Port('Dover');
    const itinerary = new Itinerary([port]);
    const ship = new Ship(itinerary);

    expect(ship.currentPort).toBe(port);
  });

  it('can set sail', () => {
    const port = new Port('Dover');
    const itinerary = new Itinerary([port]);
    const ship = new Ship(itinerary);

    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
    expect(port.ships).not.toContain(ship);
  });

  it('can dock at a different port', () => {
    const dover = new Port('Dover');
    const calais = new Port('Calais');
    const itinerary = new Itinerary([dover, calais]);
    const ship = new Ship(itinerary);

    ship.dock();

    expect(ship.currentPort).toBe(calais);
    expect(calais.ships).toContain(ship);
  });

  it('gets added to port on instantiation', () => {
    const port = new Port('Dover');
    const itinerary = new Itinerary([port]);
    const ship = new Ship(itinerary);

    expect(port.ships).toContain(ship);
  });
});
