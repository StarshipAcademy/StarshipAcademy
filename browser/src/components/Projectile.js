AFRAME.registerComponent('projectile', {
  schema: {
    speed: { default: -0.4 },
    target: {default: '.enemy'}
  },

  init: function () {
      let enemies = document.querySelectorAll('.enemy')
      this.targets = [];
      for (var i = 0; i < enemies.length; i++) {
        this.targets.push(enemies[i]);
      }
    },


    tick: function () {
      let intersect = (laser, asteroid) => {
        var x = Math.max(asteroid.minX, Math.min(laser.x, asteroid.maxX));
        var y = Math.max(asteroid.minY, Math.min(laser.y, asteroid.maxY));
        var z = Math.max(asteroid.minZ, Math.min(laser.z, asteroid.maxZ));

        var distance = Math.sqrt((x - laser.x) * (x - laser.x) +
                                 (y - laser.y) * (y - laser.y) +
                                 (z - laser.z) * (z - laser.z));
        return distance < 0.25;
      }

      let bullet = this.el;
      // let hit = false
        if(this.targets.length !== 0 && bullet.parentEl) {
          for (let i = 0; i < this.targets.length; i++ ) {
            let currentEnemy = this.targets[i].object3D
            let asteroid = {
              minX: currentEnemy.position.x - 2,
              minY: currentEnemy.position.y - 2,
              minZ: currentEnemy.position.z - 2,
              maxX: currentEnemy.position.x + 2,
              maxY: currentEnemy.position.y + 2,
              maxZ: currentEnemy.position.z + 2
            }
            let laser = bullet.object3D.translateY(this.data.speed).position;
            let target = this.targets[i];

            if(intersect(laser, asteroid) && target.parentNode) {
              let animation = document.createElement('a-animation');
              animation.setAttribute('attribute', 'scale');
              animation.setAttribute('dur', '400');
              animation.setAttribute('ease', 'linear');
              animation.setAttribute('to', '0 0 0');
              
              target.setAttribute('material', {src: '#explode'});
              target.setAttribute('geometry', {primitive: 'sphere'});
              target.appendChild(animation);

              bullet.parentNode.removeChild(bullet);
              // this.targets.splice(i, 1);
              setTimeout(() => { target.parentNode.removeChild(target) }, 1000);
              return;
            }
          }
          // function hit(collision) {
          //   if (hit) {
          //     collision.object.el.emit('hit')
          //   }
          // }
      }
      bullet.object3D.translateY(this.data.speed)
    }
  });


// AFRAME.registerComponent('projectile', {
//   schema: {
//     speed: { default: -0.4 }
//   },
//   tick: function () {
//     this.el.object3D.translateY(this.data.speed);
//   }
// });
