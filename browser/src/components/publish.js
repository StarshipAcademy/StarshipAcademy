import AFRAME from 'aframe';

let hasGottenOthers = false;

export default AFRAME.registerComponent('publish', {
  tick: function() {
    socket.on('startTick', () => hasGottenOthers = true);
    if (hasGottenOthers) {
      const el = this.el;
      const bullets = {};

      socket.emit('tick', {
        id: el.getAttribute('id'),
        x: el.getAttribute('position').x,
        y: el.getAttribute('position').y,
        z: el.getAttribute('position').z,
        xrot: el.getAttribute('rotation').x,
        yrot: el.getAttribute('rotation').y,
        zrot: el.getAttribute('rotation').z,
        newBullets: el.newBullets,
        deadBullets: el.deadBullets
      });

      el.newBullets = [];
      el.deadBullets = [];

    }
  }
});
