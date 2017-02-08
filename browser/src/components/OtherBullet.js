AFRAME.registerComponent('other-bullet', {
  schema: {
    speed: {
      default: 1
    }
  },

  tick: function() {
    this.el.object3D.translateY(this.data.speed)
  }
});
