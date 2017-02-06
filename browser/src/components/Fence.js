if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('fence', {
  schema: {
      width: {
          type: 'number',
          default: 10
      },
      height: {
        type: 'number',
        default: 10
      },
      depth: {
          type: 'number',
          default: 10
      },
      x0: {
          type: 'number',
          default: 0
      },
      y0: {
          type: 'number',
          default: 0
      },
      z0: {
          type: 'number',
          default: 0
      }
  },


  tick: function() {
      let data = this.data;
      let thiswidth = data.width;
      let thisheight = data.height;
      let thisdepth = data.depth;
      let x0 = data.x0;
      let y0 = data.y0;
      let z0 = data.z0;

      let minX = thiswidth / 2 + x0;
      let maxX = ( -1 * thiswidth / 2 ) + x0;

      let minY = thiswidth / 2 + y0;
      let maxY = ( -1 * thiswidth / 2 ) + y0;

      let minZ = thisdepth / 2 + z0;
      let maxZ = ( -1 * thisdepth / 2 ) + z0;

      let position = this.el.getAttribute('position');

      position.x = Math.min( minX, position.x);
      position.x = Math.max( maxX, position.x);

      position.y = Math.min( minY, position.y);
      position.y = Math.max( maxY, position.y);

      position.z = Math.min( minZ, position.z);
      position.z = Math.max( maxZ, position.z);

      this.el.setAttribute('position', position);
  }

});
