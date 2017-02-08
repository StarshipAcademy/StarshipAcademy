AFRAME.registerComponent('points-counter', {
  schema: {},
  tick: function () {
    console.log('this', this)
    this.points = 0;
    this.addPoint = function() {
      let score_entity = document.getElementById('score');
        score_entity.setAttribute('bmfont-text', `text: Score:${++this.points}; fnt: ./src/assets/fonts/DejaVu-sdf.fnt; fntImage: ./src/assets/fonts/DejaVu-sdf.png; color: #f44336; lineHeight:30; letterSpacing: 6`);
    };
    this.pause();
  }
});