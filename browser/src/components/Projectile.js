AFRAME.registerComponent('projectile', {
  schema: {
    speed: {
      default: 3
    }
  },
  tick: function() {
    this.el.object3D.translateY(this.data.speed);
  }
});
