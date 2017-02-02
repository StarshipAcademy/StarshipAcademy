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
    this.el.addEventListener(this.data.on, this.spawn.bind(this));
  },
  /**
   * Spawn new entity at entity's current position.
   */
  spawn: function() {
    var el = this.el;
    var bulletId = el.getAttribute('bullets-fired');
    el.setAttribute('bullets-fired', bulletId + 1);
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
      entity.setAttribute('rotation', rotation);
    });
    // console.log('SPAWNING');
    el.sceneEl.appendChild(entity);
  }
});
