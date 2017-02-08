AFRAME.registerComponent('spawner', {
  schema: {
    on: {
      default: 'click'
    },
    mixin: {
      default: ''
    }
  },
  /**
   * Add event listener.
   */
  update: function(oldData) {
    this.el.addEventListener('gamepadbuttondown', (e) => {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAA you pressed a button', e)
    });
    this.el.addEventListener(this.data.on, this.spawn.bind(this));
  },
  /**
   * Spawn new entity at entity's current position.
   */
  spawn: function() {

    var el = this.el;
    var bulletId = el.bulletsFired++;
    var entity = document.createElement('a-entity');
    var matrixWorld = el.object3D.matrixWorld;
    var position = new THREE.Vector3();
    var rotation = el.getAttribute('rotation');
    var entityRotation;
    position.setFromMatrixPosition(matrixWorld);
    entity.setAttribute('position', position);

    entity.setAttribute('mixin', this.data.mixin);
   
    entity.addEventListener('loaded', function() {
      entityRotation = entity.getAttribute('rotation');
      entity.setAttribute('rotation', {
        x: entityRotation.x + rotation.x,
        y: entityRotation.y + rotation.y,
        z: entityRotation.z + rotation.z
      });
    });
    const scene = document.getElementById('scene');

    scene.appendChild(entity);
    el.newBullets.push({
      id: bulletId,
      pos: position,
      rot: rotation
    })
    // console.log('BULLETS', el.newBullets)

  }
});
