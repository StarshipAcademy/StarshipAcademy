var endCredit = `<a-scene id="scene">
				<a-entity position="0 1.8 4">
		      <a-camera >
		        <a-cursor color="#4CC3D9"></a-cursor>
		      </a-camera>
		    </a-entity>

		 <a-image id="gameOver" position="0 3.5 -100" rotation="20 20 0"
		      width="100" depth="100" height="100" material="src: #youWin">
		      </a-image>
		 <a-image id="gameOver" position="0 3.5 100" rotation="20 200 0"
		      width="200" depth="200" height="200" material="src: #youWin">
		      </a-image>
			<a-asset>

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
				<img id="youWin" src="./src/assets/images/endCredit.png">

				<img id="youWin" src="./src/assets/images/endCredits.png">

				<audio id="gameplay" src="./src/assets/sounds/SpaceCube.ogg" />

      </a-asset>


			<a-sky src="./src/assets/images/atmos.jpg"></a-sky>
    </a-scene>`


	module.exports = endCredit;
