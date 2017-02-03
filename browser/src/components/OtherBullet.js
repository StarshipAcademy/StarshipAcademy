AFRAME.registerComponent('other-bullet', {
  schema: {
    speed: {
      default: 0.02
    }
  },

  tick: function() {
    this.el.object3D.translateY(this.data.speed)
  }
});
