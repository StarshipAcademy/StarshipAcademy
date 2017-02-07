// let enemies = document.querySelectorAll('.enemy');
//  let deadEnemies = [];
//  let points = 0;
//  let increaseCounter = function(e) {
//     let enemy = e.currentTarget;
//    if (deadEnemies.indexOf(enemy) !== -1) { return; }
//    deadEnemies.push(enemy);
//    points+=1;
//    let score_entity = document.getElementById('score');
//    score_entity.setAttribute('bmfont-text', `text: Score:${points}; fnt: ./src/assets/fonts/DejaVu-sdf.fnt; fntImage: ./src/assets/fonts/DejaVu-sdf.png; color: #f44336; lineHeight:30; letterSpacing: 6`);
//  };
//  enemies = Array.prototype.slice.call(enemies);
//  enemies.forEach(function (enemyEl) {
//    enemyEl.addEventListener('hit', increaseCounter);
//  });
