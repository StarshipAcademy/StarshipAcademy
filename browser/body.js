var body = `
    <a-scene id="scene" scene-load sound="src: url(./src/assets/sounds/Opening.m4a); autoplay: true; volume: 10">
      <a-asset>
        <img id="space" src="./src/assets/images/space.jpg">
        <img id="asteroid" src="./src/assets/images/asteroid.jpg">
        <img id="explosion" src="./src/assets/images/explosion.jpg">
        <img id="crosshair" src="./src/assets/images/crosshair.png">
        <img id="hud1" src="./src/assets/images/hud_1.gif">
        <img id="hud2" src="./src/assets/images/hud_2.gif">
        <img id="hud3" src="./src/assets/images/hud_3.jpg">
        <img id="hud4" src="./src/assets/images/hud_4.gif">
        <img id="hud5" src="./src/assets/images/hud_5.jpg">
        <img id="hud6" src="./src/assets/images/hud_6.gif">
        <img id="hud7" src="./src/assets/images/hud_7.png">
        <img id="hud9" src="./src/assets/images/hud_9.png">
        <img id="hud_top" src="./src/assets/images/hud_top.png">

        <img id="turretCrosshair" src="./src/assets/images/turret_crosshair.png">
        <img id="turretHud1" src="./src/assets/images/turret_hud1.png">

        <audio id="gameplay" src="./src/assets/sounds/SpaceCube.ogg" />
        <audio id="laser_shot" src="./src/assets/sounds/Laser.ogg" />

        <!-- STARSHIP -->
        <a-asset-item id="arc170-obj" src="./src/assets/models/arc170/arc170.obj"></a-asset-item>
        <a-asset-item id="arc170-mtl" src="./src/assets/models/arc170/arc170.mtl"></a-asset-item>

        <!-- TURRET -->
        <a-asset-item id="turretBot-obj" src="./src/assets/models/turretBot/turretBot.obj"></a-asset-item>
        <a-asset-item id="turretBot-mtl" src="./src/assets/models/turretBot/turretBot.mtl"></a-asset-item>

        <a-mixin id="asteroid1" geometry="primitive: sphere; radius:6" material="src: #asteroid"></a-mixin>
        <a-mixin id="asteroid2" geometry="primitive: sphere; radius:12" material="src: #asteroid"></a-mixin>


        <a-mixin id="octa" geometry="primitive: octahedron; radius:12" material="src:#asteroid">


        <a-mixin id="laser"
            geometry="buffer: false; primitive: cylinder; radius: 0.05; height: 8"
            material="color: green; metalness: 0.2; opacity: 1; roughness: 0.3"
            translate="0 -2 0" sound="src: #laser_shot; on: click; autoplay: true; volume: 1"
            rotation="-90 0 0" projectile collider></a-mixin>
      </a-asset>
      <a-sky src="./src/assets/images/space.jpg"></a-sky>
    </a-scene>
    <script>
        let enemies = document.querySelectorAll('.enemy');
         let deadEnemies = [];
         let points = 0;
         let increaseCounter = function(e) {
            let enemy = e.currentTarget;
           if (deadEnemies.indexOf(enemy) !== -1) { return; }
           deadEnemies.push(enemy);
           points+=1;
           console.log("POINTS",points)
           let score_entity = document.getElementById('score');
           score_entity.setAttribute('bmfont-text', "text: Score:" + points + "; fnt: ./src/assets/fonts/DejaVu-sdf.fnt; fntImage: ./src/assets/fonts/DejaVu-sdf.png; color: #f44336; lineHeight:30; letterSpacing: 6");
         };
         enemies = Array.prototype.slice.call(enemies);
         enemies.forEach(function (enemyEl) {
           enemyEl.addEventListener('hit', increaseCounter);
         });
       </script>`

module.exports = body
