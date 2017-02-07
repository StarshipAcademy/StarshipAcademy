
AFRAME.registerComponent('click-list', {
  init: function () {
    var el = this.el;

    window.addEventListener('click', function () {
    	var newScene = require('../../body.js')


 $('#menu').replaceWith(newScene);

      el.emit('click', null, false);
    });
  }
});
