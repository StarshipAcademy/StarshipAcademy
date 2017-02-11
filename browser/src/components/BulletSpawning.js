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
    var me = this;
    me.spawn.bind(me)
    window.addEventListener('click', () => me.spawn());
  },

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
