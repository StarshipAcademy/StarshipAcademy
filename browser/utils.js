export function putSelfOnDOM(user) {
  const scene = document.getElementById('scene');
  const avatar = document.createElement('a-camera');

  //add camera
  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
  avatar.setAttribute('publish', true);
  // avatar.setAttribute('look-controls', true);
  avatar.setAttribute('spawner', 'mixin: laser; on: click');
  avatar.setAttribute('click-listener', true);
  avatar.bulletsFired = 0;
  avatar.newBullets = [];
  avatar.deadBullets = [];

  // determine if user is on a phone or desktop
  if (!AFRAME.utils.device.isMobile()) {
    avatar.setAttribute('wasd-controls', 'fly: true; acceleration: 4001');
    avatar.setAttribute('ship', true);

    //add model to camera
    const model = document.createElement('a-obj-model');
    avatar.appendChild(model);
    model.setAttribute('position', '0 -4 2');
    model.setAttribute('rotation', '0 180 0');
    model.setAttribute('src', '#arc170-obj');
    model.setAttribute('mtl', '#arc170-mtl');
  }
  else {
    // avatar.setAttribute('wasd-controls', 'acceleration: 0');

    // avatar.setAttribute('ship', true);
    const model = document.createElement('a-obj-model');
    avatar.appendChild(model);
    model.setAttribute('position', '0 0.07 0.9');
    model.setAttribute('src', '#turretBot-obj');
    model.setAttribute('mtl', '#turretBot-mtl');
    console.log('AVATAR', avatar)
    console.log('TURRET', model);

    const crosshairs = document.createElement('a-image');
    avatar.appendChild(crosshairs);
    crosshairs.setAttribute('position', '0 0 -1');
    crosshairs.setAttribute('height', '0.2');
    crosshairs.setAttribute('width', '0.45');
    crosshairs.setAttribute('src', '#turretCrosshair');

    const hud1 = document.createElement('a-image');
    avatar.appendChild(hud1);
    hud1.setAttribute('position', '0 0 -1');
    hud1.setAttribute('width', '1.5');
    hud1.setAttribute('height', '1.05');
    hud1.setAttribute('src', '#turretHud1')
  }

  //add music
  // const soundRight = document.createElement('a-entity');
  // avatar.appendChild(soundRight);
  // soundRight.setAttribute('position', '2 0 0');
  // soundRight.setAttribute('sound', 'src: #gameplay; autoplay: true; loop: true; volume: 0.1');
  //
  // const soundLeft = document.createElement('a-entity');
  // avatar.appendChild(soundLeft);
  // soundLeft.setAttribute('position', '-2 0 0');
  // soundLeft.setAttribute('sound', 'src: #gameplay; autoplay: true; loop: true; volume: 0.1');

  return avatar;
}

function createBullets(userId, bullets) {
  console.log('SSSSSSSSS', bullets)
  const scene = document.getElementById('scene');
  Object.keys(bullets).forEach(key => {
    console.log('key:', key)
    let bulletData = bullets[key];
    if (!bulletData) return;
    let bulletId = key;

    const bullet = document.createElement('a-entity');
    scene.appendChild(bullet);
    bullet.setAttribute('class', `${userId}bullet`);
    bullet.setAttribute('id', bulletId);
    bullet.setAttribute('position', bulletData.pos);
    bullet.setAttribute('rotation', {
      x: bulletData.rot.x - 90,
      y: bulletData.rot.y,
      z: bulletData.rot.z
    });
    bullet.setAttribute('other-bullet', true);
    bullet.setAttribute('geometry', 'primitive: cylinder; radius: 0.1; height: 8');
    bullet.setAttribute('material', 'color: yellow; metalness: 0.2; opacity: 0.8; roughness: 0.3');
  })
}

export function putUserOnDOM(user) {
  const scene = document.getElementById('scene');
  const avatar = document.createElement('a-entity');

  //add entity
  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);

  //add model inside entity
  const model = document.createElement('a-obj-model');
  avatar.appendChild(model);
  model.setAttribute('position', '0 -4 2');
  model.setAttribute('rotation', '0 180 0');
  if (AFRAME.utils.device.isMobile()) {
    model.setAttribute('src', '#arc170-obj');
    model.setAttribute('mtl', '#arc170-mtl');
  }
  else {
    model.setAttribute('src', '#turretBot-obj');
    model.setAttribute('mtl', '#turretBot-mtl');
  }

  //add their bullets
  createBullets(user.id, user.bullets);

  return avatar;
}

function removeBullets(userId, bullets) {
  const scene = document.getElementById('scene');
  for (var i = 0; i < bullets.length; i++) {
    const bullet = document.getElementById(bullets[i].id);
    scene.remove(bullet);
    bullet.parentNode.removeChild(bullet);
  }
}

export function updateUser(user) {
  const otherAvatar = document.getElementById(user.id);

  otherAvatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  otherAvatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);

  //update their bullets
  createBullets(user.id, user.newBullets);
  removeBullets(user.id, user.deadBullets);

}

export function removeUser(userId) {
  console.log('Removing user.');
  const scene = document.getElementById('scene');
  const avatarToBeRemoved = document.getElementById(userId);
  scene.remove(avatarToBeRemoved);
  avatarToBeRemoved.parentNode.removeChild(avatarToBeRemoved);

  //remove all their bullets
  let bullets = document.querySelectorAll(`.${userId}bullet`);
  for (var i = 0; i < bullets.length; i++) {
    scene.remove(bullet);
    bullet.parentNode.removeChild(bullet);
  }
}
