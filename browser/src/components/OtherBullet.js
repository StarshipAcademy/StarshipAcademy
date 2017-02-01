AFRAME.registerComponent('other-bullet', {
  schema: {
    speed: {
      default: -0.4
    }
  },

  tick: function() {
    this.el.object3D.translateY(this.data.speed)
  }
});
