
AFRAME.registerComponent('click-list', {
  init: function() {
    let el = this.el;

    el.addEventListener('click', function() {
      let sceneLoadEntity = `<a-entity id="sceneload" scene-load sound="src: url(./src/assets/sounds/Opening.m4a); autoplay: true; volume: 10"></a-entity>`;
      $('.menupage').remove();
      $('#menucamera').replaceWith(sceneLoadEntity);
    });
  }
});
