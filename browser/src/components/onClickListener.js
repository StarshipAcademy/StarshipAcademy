AFRAME.registerComponent('click-listener', {
  init: function() {
    var el = this.el;
    window.addEventListener('click', function() {
      el.emit('click', null, false);
    });
  }
});
