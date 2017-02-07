
AFRAME.registerComponent('click-list', {
  init: function () {
    var el = this.el;

    el.addEventListener('click', function () {
    	var newScene = require('../../body.js')


 $('#scene').replaceWith(newScene);
    });
  }
});
