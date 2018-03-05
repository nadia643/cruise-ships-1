function Ship(currentPort) {
  this.currentPort = currentPort;
}

Ship.prototype = {
  setSail() {
    this.currentPort = null;
  },
};

module.exports = Ship;
