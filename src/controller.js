/* eslint-disable func-names */
(function exportController() {
  function Controller() {
    this.initialiseSea();
  }
  Controller.prototype = {
    initialiseSea: function () {
      const backgrounds = [
        './images/water0.png',
        './images/water1.png',
      ];

      let backgroundCounter = 0;

      window.setInterval(() => {
        document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundCounter % backgrounds.length]}')`;
        backgroundCounter += 1;
      }, 5000);
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

  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());
