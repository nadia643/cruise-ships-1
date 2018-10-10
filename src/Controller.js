(function exportController() {
  function Controller(ship) {
    this.ship = ship;
    this.initialiseSea();

    this.updateHUD();

    document.querySelector('#sailbutton').addEventListener('click', () => {
      this.setSail();
    });
  }

  Controller.prototype = {
    initialiseSea() {
      const backgrounds = [
        './images/water0.png',
        './images/water1.png',
      ];

      let backgroundIndex = 0;

      setInterval(() => {
        const sea = document.querySelector('#sea');
        sea.style.backgroundImage = `url('${backgrounds[backgroundIndex]}')`;

        backgroundIndex += 1;
        if (backgroundIndex === backgrounds.length) {
          backgroundIndex = 0;
        }
      }, 1000);
    },
    renderPorts(ports) {
      const portsElement = document.querySelector('#ports');
      portsElement.style.width = '0px';

      ports.forEach((port, index) => {
        const newPortElement = document.createElement('div');
        newPortElement.className = 'port';
        newPortElement.dataset.portIndex = index;

        portsElement.appendChild(newPortElement);

        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    },
    renderShip() {
      const shipPortIndex = this.ship.itinerary.ports.indexOf(this.ship.currentPort);
      const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);

      const shipElement = document.querySelector('#ship');
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    },
    setSail() {
      const ship = this.ship;

      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      let nextPortIndex = currentPortIndex + 1;

      const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
      if (!nextPortElement) {
        window.alert('End of the line!');
      } else {
        this.renderMessageBox(`Now departing ${ship.currentPort.name}`);

        ship.setSail();
        const shipElement = document.querySelector('#ship');

        const sailInterval = setInterval(() => {
          const shipLeft = parseInt(shipElement.style.left, 10);
          if (shipLeft === (nextPortElement.offsetLeft - 32)) {
            ship.dock();
            this.updateHUD();
            clearInterval(sailInterval);
          } else {
            shipElement.style.left = `${shipLeft + 1}px`;
          }
        }, 20);
      }
    },
    renderMessageBox(message) {
      const messageElement = document.createElement('div');
      const messageText = document.createElement('span');
      messageElement.id = 'message';

      messageText.id = 'message-text';
      messageText.textContent = message;


      messageElement.appendChild(messageText);
      const viewport = document.querySelector('#viewport');
      viewport.appendChild(messageElement);

      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 7000);
    },
    updateHUD() {
      const currentPortElement = document.getElementById('current-port');
      currentPortElement.textContent = `Current Port: ${this.ship.currentPort.name}`;
      const nextPortElement = document.getElementById('next-port');
      const nextPortName = this.ship.nextPort ? this.ship.nextPort.name : 'End of Itinerary';
      nextPortElement.textContent = `Next Port: ${nextPortName}`;
    },
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());
