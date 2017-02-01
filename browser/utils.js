export function putSelfOnDOM(user) {
  const scene = document.getElementById('scene');
  const avatar = document.createElement('a-camera');

  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
  avatar.setAttribute('publish', true);
  avatar.setAttribute('look-controls', true);
  avatar.setAttribute('wasd-controls', 'fly: true; acceleration: 4001');
  avatar.setAttribute('spawner', 'mixin: laser; on: click');
  avatar.setAttribute('click-listener', true);
  avatar.setAttribute('ship', true);


  const model = document.createElement('a-obj-model');
  avatar.appendChild(model);
  model.setAttribute('position', '0 -4 2');
  model.setAttribute('rotation', '0 180 0');
  model.setAttribute('src', '#arc170-obj');
  model.setAttribute('mtl', '#arc170-mtl');

  const soundRight = document.createElement('a-entity');
  avatar.appendChild(soundRight);
  soundRight.setAttribute('position', '2 0 0');
  soundRight.setAttribute('sound', 'src: #gameplay; autoplay: true; loop: true; volume: 0.1');

  const soundLeft = document.createElement('a-entity');
  avatar.appendChild(soundLeft);
  soundLeft.setAttribute('position', '-2 0 0');
  soundLeft.setAttribute('sound', 'src: #gameplay; autoplay: true; loop: true; volume: 0.1');

  return avatar;
}



export function putUserOnDOM(user) {
  const scene = document.getElementById('scene');
  const avatar = document.createElement('a-entity');

  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);

  const model = document.createElement('a-obj-model');
  avatar.appendChild(model);
  model.setAttribute('position', '0 -4 2');
  model.setAttribute('rotation', '0 180 0');
  model.setAttribute('src', '#arc170-obj');
  model.setAttribute('mtl', '#arc170-mtl');
  return avatar;
}

// export function addFirstPersonProperties (avatar) {
//   avatar.setAttribute('publish', true);
//   avatar.setAttribute('camera', true);
//   avatar.setAttribute('look-controls', true);
//   avatar.setAttribute('wasd-controls', true);
// }
