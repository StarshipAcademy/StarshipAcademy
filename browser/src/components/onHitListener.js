AFRAME.registerComponent('hit-listener', {
  init: function() {
    var el = this.el;
    window.addEventListener('hit', function() {
    	console.log('elle', el)
      el.emit('hit', null, false);
    });
  }
});
