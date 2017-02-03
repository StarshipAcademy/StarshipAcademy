AFRAME.registerComponent('click-list', {
  init: function () {
    var el = this.el;

    window.addEventListener('click', function () {
    	var newScene = '<body id="mainApp">' + '<i class="fa fa-crosshairs" style="color: #41EF39; position: absolute; top: 49%; left: 49.5%; z-index: 9999" aria-hidden="true"></i>' + '<a-scene id="scene" physics-world="gravity: 0 0 0" scene-load>' + '<a-asset>' + '<img id="space" src="./src/assets/images/space.jpg">' +'<img id="asteroid" src="./src/assets/images/asteroid.jpg">' + '<audio id="gameplay" src="./src/assets/sounds/SpaceCube.ogg">' + '<audio id="laser_shot" src="./src/assets/sounds/Laser.ogg">' + '<a-asset-item id="arc170-obj" src="./src/assets/models/arc170/arc170.obj"></a-asset-item>' +
        '<a-asset-item id="arc170-mtl" src="./src/assets/models/arc170/arc170.mtl"></a-asset-item> ' + '<a-mixin id="asteroid1" geometry="primitive: sphere; radius:2" material="src: #asteroid"></a-mixin>' +
        '<a-mixin id="asteroid2" geometry="primitive: sphere; radius:4" material="src: #asteroid"></a-mixin>' +'<a-mixin id="position" random-spherical-position="radius: 40; startX: 0; lengthX: 360; startY: 0; lengthY: 360" random-rotation random-position="min: -100 -100 -100; max: 100 100 100"></a-mixin>'+
 '<a-mixin id="laser" '+ 'geometry="primitive: cylinder; radius: 0.1; height: 8 "' + 'rotation="-90 0 0"' + 'translate="0 -2 0" ' + 'material="color: yellow; metalness: 0.2; opacity: 0.8; roughness: 0.3" ' + 'projectile="speed: 0.02 "' + 'sound="src: #laser_shot; on: click; autoplay: true; volume: 1"></a-mixin> ' + '</a-asset>' + '<a-entity entity-generator="mixin: asteroid1 position; num: 150;"></a-entity>' + '<a-entity entity-generator="mixin: asteroid2 position; num: 150;"></a-entity>' +'<a-sky src="./src/assets/images/space.jpg"></a-sky> ' + '</a-scene> ' + '</body>';
 $('#menu').replaceWith(newScene);

      el.emit('click', null, false);
    });
  }
});
