/* eslint-disable func-names */
(function exportController() {
  function Controller() {
    this.initialiseSea();
  }
  Controller.prototype = {
    initialiseSea: function () {
      const backgrounds = [
        '../images/cs-images\(1\)/water0.png',
        '../images/cs-images\(1\)/water1.png',
      ];

      let backgroundCounter = 0;

      window.setInterval(() => {
        document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundCounter % backgrounds.length]}')`;
        backgroundCounter += 1;
      }, 500);
    },

    renderPorts: function (ports) {
      const portsElement = document.querySelector('#ports');
      portsElement.style.width = '0px';
      ports.forEach((port, index) => {
        const newPortElement = document.createElement('div');
        newPortElement.className = 'port';
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        portsElement.appendChild(newPortElement);
        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    },

    renderShip: function (ship) {
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
      const shipElement = document.querySelector('#ship');
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft + 32}px`;
    },

  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());
