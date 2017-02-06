AFRAME.registerComponent('collider', {
  schema: {
    target: { default: '.enemy' }
  },

  /**
   * Calculate targets.
   */
  init: function () {
    var targetEls = this.el.sceneEl.querySelectorAll(this.data.target);
    this.targets = [];
    for (var i = 0; i < targetEls.length; i++) {
      this.targets.push(targetEls[i].object3D);
    }
    this.el.object3D.updateMatrixWorld();
  },

  /**
   * Check for collisions (for cylinder).
   */
  tick: function (t) {
    var collisionResults;
    var directionVector;
    var el = this.el;
    var mesh = el.getObject3D('mesh');
    var object3D = el.object3D;
    var raycaster;
    var vertices = mesh.geometry.vertices;
    // console.log('VERY', vertices);
    var bottomVertex = vertices[0].clone();
    var topVertex = vertices[vertices.length - 1].clone();

    // Calculate absolute positions of start and end of entity.
    bottomVertex.applyMatrix4(object3D.matrixWorld);
    topVertex.applyMatrix4(object3D.matrixWorld);

    // Direction vector from start to end of entity.
    directionVector = topVertex.clone().sub(bottomVertex).normalize();

    // Raycast for collision.
    raycaster = new THREE.Raycaster(bottomVertex, directionVector, 1);
    collisionResults = raycaster.intersectObjects(this.targets, true);
    // console.log("RESULTS!ss!",collisionResults)
    let animation = document.createElement('a-animation');
    animation.setAttribute('attribute', 'scale');
    animation.setAttribute('dur', '70');
    animation.setAttribute('ease', 'linear');
    animation.setAttribute('to', '0 0 0');
    collisionResults.forEach(function (target) {
      // Tell collided entity about the collision.
      console.log('TT', target.object.el);
      // target.object.el.emit('collider-hit', {target: el});
      // console.log('HITTING IT UP');


      target.object.el.setAttribute('material', {src: '#explosion'});
      target.object.el.setAttribute('geometry', {primitive: 'sphere'});
      target.object.el.appendChild(animation);
      target.object.el.emit('hit');
      //
      // bullet.parentNode.removeChild(bullet);
      // this.targets.splice(i, 1);
      // setTimeout(() => {target.parentNode.removeChild(target) }, 4000);
      // return;

    });
  }
});
