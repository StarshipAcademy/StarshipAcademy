var endCredit = `<a-scene id="scene">
				<a-entity position="0 1.8 4">
		      <a-camera >
		        <a-cursor color="#4CC3D9"></a-cursor>
		      </a-camera>
		    </a-entity>

		 <a-image id="gameOver" position="0 3.5 -100" rotation="20 20 0"
		      width="100" depth="100" height="100" color="#FFFFFF" material="src: #youWin" sound="src: url(./src/assets/sounds/Closing.m4a); autoplay: true; position: 0 0 0; volume: 10">
		      </a-image>
			<a-asset>

				<img id="crosshair" src="./src/assets/images/crosshair.png">

				<img id="youWin" src="./src/assets/images/endCredits.png">

				<audio id="gameplay" src="./src/assets/sounds/SpaceCube.ogg" />

      </a-asset>


			<a-sky src="./src/assets/images/atmos.jpg"></a-sky>
    </a-scene>`


	module.exports = endCredit;
