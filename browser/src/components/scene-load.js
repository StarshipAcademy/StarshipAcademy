import AFRAME from 'aframe';
import socket from '../../sockets/index'


export default AFRAME.registerComponent('scene-load', {
  init: function() {
    console.log('scene loaded')
    socket.emit('sceneLoad');
  }
});
