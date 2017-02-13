AFRAME.registerComponent('collider', {
  multiple: true,
  schema: {
    target: {
      default: '.enemy'
    }
  },

  /**
   * Calculate targets.
   */
  init: function() {
    let targetEls = this.el.sceneEl.querySelectorAll(this.data.target);
    this.targets = [];
    for (let i = 0; i < targetEls.length; i++) {
      this.targets.push(targetEls[i].object3D);
    }
    this.el.object3D.updateMatrixWorld();

  },

  /**
   * Check for collisions (for cylinder).
   */
  tick: function(t) {
    // console.log('#### I HAVE NOT COLLIDED')
    let el = this.el;
    let mesh = el.getObject3D('mesh');
    let vertices = mesh.geometry.vertices;
    // console.log('VERY', vertices);
    let bottomVertex = vertices[0].clone();
    let topVertex = vertices[vertices.length - 1].clone();

    // Calculate absolute positions of start and end of entity.
    bottomVertex.applyMatrix4(el.object3D.matrixWorld);
    topVertex.applyMatrix4(el.object3D.matrixWorld);

    // Direction vector from start to end of entity.
    let directionVector = topVertex.clone().sub(bottomVertex).normalize();

    // Raycast for collision.
    let raycaster = new THREE.Raycaster(bottomVertex, directionVector, 0, 8);
    const collisionResults = raycaster.intersectObjects(this.targets, true);

    if (collisionResults.length) {
      // console.log('######### collisions', collisionResults)

      let targetId = collisionResults[0].object.el.id;

      const target = document.getElementById(targetId);

      socket.emit('removeAsteroid', targetId);

      target.setAttribute('material', {
        src: '#explosion'
      });
      target.setAttribute('geometry', {
        primitive: 'sphere'
      });

      let animation = document.createElement('a-animation');
      animation.setAttribute('attribute', 'scale');
      animation.setAttribute('dur', '1000');
      animation.setAttribute('ease', 'linear');
      animation.setAttribute('to', '0 0 0');
      target.appendChild(animation);
      setTimeout(() => {
        //console.log('removing asteroid after 1 second');
        if (target.parentNode === scene) scene.removeChild(target);
      }, 5000);

      //target.emit('hit');

      const scene = document.getElementById('scene');
      const score = document.getElementById('score');
      console.log('score', score)
      score.addPoint();
      //console.log('######### removing', el)
      this.pause()
      if (el.parentNode === scene) scene.removeChild(el);
    //console.log('######### el removed', el)
    }
  }
});
