AFRAME.registerComponent('projectile', {
  schema: {
    speed: {
      default: 0.4
    }
  },
  tick: function () {
    this.el.object3D.translateY(this.data.speed);
  }
});
