/* globals window */
(function exportShip() {
  function Ship(itinerary) {
    this.itinerary = itinerary;
    this._previousPortIndex = -1;
    this._currentPortIndex = 0;

    this.currentPort.addShip(this);
  }

  Ship.prototype = {
    setSail() {
      if (this._currentPortIndex >= this.itinerary.ports.length - 1) {
        throw new Error('End of itinerary reached');
      }
      this.currentPort.removeShip(this);
      this._previousPortIndex += 1;
      this._currentPortIndex = -1;
    },
    dock() {
      this._currentPortIndex = this._previousPortIndex + 1;
      this.currentPort.addShip(this);
    },
    get currentPort() {
      return this.itinerary.ports[this._currentPortIndex] || null;
    },
    get nextPort() {
      return this.itinerary.ports[this._currentPortIndex + 1] || null;
    },
    get previousPort() {
      return this.itinerary.ports[this._previousPortIndex] || null;
    },
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Ship;
  } else {
    window.Ship = Ship;
  }
}());
