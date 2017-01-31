AFRAME.registerComponent('explode', {
  schema: { on: { default: ''} },

  update: function (previousData) {
    var el = this.el;
    var explode = this.handler = this.explode.bind(this);
    if (previousData) {
      el.removeEventListener(previousData.on, explode);
    }
    el.addEventListener(this.data.on, explode);
  },

  explode: function () {
    var object3D = this.el.getObject3D('mesh');
    console.log('HIT OBJECT', object3D);
    var scene = this.el.sceneEl.object3D;
    var duration = 8000;

    // explode geometry into objects
    // var pieces = explode(object3D.geometry, object3D.material);

    object3D.material.visible = false;

    // animate objects

    function deleteBox() {
      // scene.remove( object3D );
    }

    this.el.removeEventListener(this.data.on, this.handler);

    function explode( geometry, material ) {
      var pieces = new THREE.Group();
      console.log('PIECES', pieces);
      console.log('GEOMETRY', geometry);
      var material = material.clone();
      console.log('MATERIAL', material);
      material.side = THREE.DoubleSide;
    }

    function removeBoxFromList( box ) {
    }

    console.log('EXPLODE');
  }
});
