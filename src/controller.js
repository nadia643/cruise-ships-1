/* eslint-disable func-names */
(function exportController() {
  function Controller(ship) {
    this.initialiseSea();
    this.ship = ship;
    document.querySelector('#sailbutton').addEventListener('click', () => {
      this.setSail();
    });
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

    renderShip: function () {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
      const shipElement = document.querySelector('#ship');
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft + 32}px`;
    },

    setSail: function () {
      const ship = this.ship;
      const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1;
      const nextPortElement = document.querySelector(`[data-port-index= '${nextPortIndex}']`);
      if (!nextPortElement) {
        this.renderMessageBox('End of the line!');
      } else {
        this.renderMessageBox(`Now departing ${ship.currentPort.name}`);
        setTimeout(() => {
          this.renderHeadupMessage(`Current Port: ${ship.itinerary.ports[nextPortIndex].name} Previous Port: ${ship.currentPort.name}`);
        }, 3500);
      }

      const shipElement = document.querySelector('#ships');

      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);

        if (shipLeft === (nextPortElement.offsetLeft - 32)) {
          ship.currentPort = ship.itinerary.ports[nextPortIndex];
          ship.previousPort = ship.itinerary.ports[nextPortIndex - 1];
          clearInterval(sailInterval);
        }

        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    },

    renderHeadupMessage: function (message) {
      const ship = this.ship;
      const messageElement = document.createElement('div');
      messageElement.id = 'headup';
      messageElement.innerHTML = message;
      const viewport = document.querySelector('#viewport');
      const ports = document.querySelector('#ports');
      viewport.insertBefore(messageElement, ports);
    },

    renderMessageBox: function (message) {
      const messageElement = document.createElement('div');
      messageElement.id = 'message';
      messageElement.innerHTML = message;
      const viewport = document.querySelector('#viewport');
      viewport.appendChild(messageElement);
      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 1500);
    },

  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());
