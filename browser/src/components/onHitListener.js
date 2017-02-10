AFRAME.registerComponent('hit-listener', {
  init: function() {
    var el = this.el;
    el.addEventListener('hit', function () {
      // el.emit('hit', null, false);
    });
  }
});
