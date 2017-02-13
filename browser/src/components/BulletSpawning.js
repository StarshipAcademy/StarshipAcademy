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
  init: function() {
    let me = this.el;
    let spawner = this;
    spawner.spawn.bind(spawner)
    window.addEventListener('click', () => me.emit('shoot'));
    me.addEventListener('shoot', () => spawner.spawn())
  },

  spawn: function() {

    let el = this.el;
    let bulletId = el.bulletsFired++;
    let entity = document.createElement('a-entity');
    let matrixWorld = el.object3D.matrixWorld;
    let position = new THREE.Vector3();
    let rotation = el.getAttribute('rotation');
    let entityRotation;
    position.setFromMatrixPosition(matrixWorld);
    entity.setAttribute('position', position);
    entity.setAttribute('class', 'laser');

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
