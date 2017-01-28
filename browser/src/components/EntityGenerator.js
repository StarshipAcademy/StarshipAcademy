AFRAME.registerComponent('entity-generator', {
  schema: {
    mixin: {default: ''},
    num: {default: 10}
  },

  init: function () {
    var data = this.data;
    const randomNum = Math.random() * 15
    // Create entities with supplied mixin.
    for (var i = 0; i < randomNum; i++) {
      var entity = document.createElement('a-entity');
      entity.setAttribute('mixin', data.mixin);
      entity.setAttribute('class', 'enemy')
      this.el.appendChild(entity);
    }
  },
  tick: function() {
    let enemies = document.querySelectorAll('.enemy');

    if(enemies.length === 1) {
      this.init()
    }
  }
});
