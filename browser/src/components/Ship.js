AFRAME.registerComponent('ship', {
  schema: {
    target: {
      default: '.enemy'
    }
  },

  init: function() {
    const asteroidNodes = document.querySelectorAll('.enemy')
    this.targetNodes = [];
    for (var i = 0; i < asteroidNodes.length; i++) {
      this.targetNodes.push(asteroidNodes[i]);
    }
  },

  //TODO when new asteroids are added, add to this.targetNodes

  tick: function() {
    let intersect = (shipPosition, asteroid) => {
      var x = Math.max(asteroid.minX, Math.min(shipPosition.x, asteroid.maxX));
      var y = Math.max(asteroid.minY, Math.min(shipPosition.y, asteroid.maxY));
      var z = Math.max(asteroid.minZ, Math.min(shipPosition.z, asteroid.maxZ));

      var distance = Math.sqrt((x - shipPosition.x) * (x - shipPosition.x) + (y - shipPosition.y) * (y - shipPosition.y) + (z - shipPosition.z) * (z - shipPosition.z));
      return distance < 5;
    };

    let me = this.el;

    if (this.targetNodes.length && me.parentEl) {
      for (let i = 0; i < this.targetNodes.length; i++) {
        let currentEnemy = this.targetNodes[i].object3D;
        let asteroid = {
          minX: currentEnemy.position.x - 2,
          minY: currentEnemy.position.y - 2,
          minZ: currentEnemy.position.z - 2,
          maxX: currentEnemy.position.x + 2,
          maxY: currentEnemy.position.y + 2,
          maxZ: currentEnemy.position.z + 2
        };

        let target = this.targetNodes[i];

        if (intersect(me.object3D.position, asteroid) && target.parentNode) {
          target.parentNode.removeChild(target);
          this.targetNodes.splice(i, 1);
          // me.points *= 0.75
          return;
        }
      }
    }
  }
});
