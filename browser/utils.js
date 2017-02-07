export function putSelfOnDOM(user) {
  const scene = document.getElementById('scene');
  const avatar = document.createElement('a-camera');

  //add camera
  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
  avatar.setAttribute('publish', true);
  avatar.setAttribute('look-controls', true);
  avatar.setAttribute('wasd-controls', 'fly: true; acceleration: 4001');
  avatar.setAttribute('spawner', 'mixin: laser; on: click');
  avatar.setAttribute('click-listener', true);
  avatar.bulletsFired = 0;
  avatar.newBullets = [];
  avatar.deadBullets = [];
  avatar.setAttribute('ship', true);
  avatar.setAttribute('fence', 'width: 4800; height: 4800; depth: 4800');

  //add model to camera
  const model = document.createElement('a-obj-model');
  avatar.appendChild(model);
  model.setAttribute('position', '0 -4 2');
  model.setAttribute('rotation', '0 180 0');
  model.setAttribute('src', '#arc170-obj');
  model.setAttribute('mtl', '#arc170-mtl');

  //add hud elements

  const crosshair = document.createElement('a-image')
  avatar.appendChild(crosshair);
  crosshair.setAttribute('position', ' 0 0 -1');
  crosshair.setAttribute('height', '0.15');
  crosshair.setAttribute('width', '0.15');
  crosshair.setAttribute('src', '#crosshair');
  // crosshair.setAttribute()
  // crosshair.setAttribute()

  // const crosshairAnimation = document.createElement('a-animation')
  // crosshairImage.appendChild(crosshairAnimation);
  // crosshairAnimation.setAttribute('attribute', 'rotation');
  // crosshairAnimation.setAttribute('dur', '1000000000');
  // crosshairAnimation.setAttribute('to', "0 0 0");
  // crosshairAnimation.setAttribute('repeat', 'indefinite')
  // console.log('yo2321 yo234 yo678');

  const hud1 = document.createElement('a-box');
  avatar.appendChild(hud1);
  hud1.setAttribute('height', '0.02');
  hud1.setAttribute('width', '0.25');
  hud1.setAttribute('depth', '0.15');
  hud1.setAttribute('rotation', '60 0 0');
  hud1.setAttribute('position', '-0.01 -0.25 -1.13');
  hud1.setAttribute('material', "shader:gif; src:#hud1")

  const hud2 = document.createElement('a-box');
  avatar.appendChild(hud2);
  hud2.setAttribute('height', '0.1');
  hud2.setAttribute('width', '0.18');
  hud2.setAttribute('depth', '0.001');
  hud2.setAttribute('rotation', '-89 0 0');
  hud2.setAttribute('position', '-0.37 -0.319 -0.98');
  hud2.setAttribute('material', "shader:gif; src:#hud2")

  const hud3 = document.createElement('a-box');
  avatar.appendChild(hud3);
  hud3.setAttribute('height', '0.25')
  hud3.setAttribute('width', '0.36')
  hud3.setAttribute('depth', '0.001')
  hud3.setAttribute('rotation', '-85 0 0')
  hud3.setAttribute('position', '-0.005 -0.28 -0.8')
  hud3.setAttribute('material', "src:#hud3")

  const hud4 = document.createElement('a-box');
  avatar.appendChild(hud4);
  hud4.setAttribute('height', '0.1');
  hud4.setAttribute('width', '0.19');
  hud4.setAttribute('depth', '0.001');
  hud4.setAttribute('rotation', '-89 0 0');
  hud4.setAttribute('position', '0.37 -0.319 -0.97');
  hud4.setAttribute('material', "shader:gif; src:#hud4")

  const hud5 = document.createElement('a-image');
  avatar.appendChild(hud5);
  hud5.setAttribute('position', '-0.185 -0.22 -1.1')
  hud5.setAttribute('rotation', '-40 0 -90')
  hud5.setAttribute('height', '0.07')
  hud5.setAttribute('width', '0.13')
  hud5.setAttribute('material', 'src:#hud5')

  const hud6 = document.createElement('a-image');
  avatar.appendChild(hud6);
  hud6.setAttribute('position', '0.17 -0.22 -1.1')
  hud6.setAttribute('rotation', '-40 0 0')
  hud6.setAttribute('height', '0.13')
  hud6.setAttribute('width', '0.07')
  hud6.setAttribute('material', 'shader: gif; src:#hud6')

  const hud7 = document.createElement('a-image');
  avatar.appendChild(hud7);
  hud7.setAttribute('position', '-0.3 -0.24 -1')
  hud7.setAttribute('rotation', '0 0 0')
  hud7.setAttribute('height', '0.09')
  hud7.setAttribute('width', '0.09')
  hud7.setAttribute('material', 'src:#hud7; transparent: true')

  const hud8 = document.createElement('a-image');
  avatar.appendChild(hud8);
  hud8.setAttribute('position', '0.285 -0.24 -1')
  hud8.setAttribute('rotation', '0 180 0')
  hud8.setAttribute('height', '0.09')
  hud8.setAttribute('width', '0.09')
  hud8.setAttribute('material', 'src:#hud7')

  const hud9 = document.createElement('a-image');
  avatar.appendChild(hud9)
  hud9.setAttribute('position', '-0.75 -0.28 -1.05')
  hud9.setAttribute('rotation', '-15 90 0')
  hud9.setAttribute('height', '0.25')
  hud9.setAttribute('width', '0.4')
  hud9.setAttribute('material', 'src:#hud9')

  const hud10 = document.createElement('a-image');
  avatar.appendChild(hud10)
  hud10.setAttribute('position', '0.75 -0.28 -1.07')
  hud10.setAttribute('rotation', '15 90 0')
  hud10.setAttribute('height', '0.25')
  hud10.setAttribute('width', '0.4')
  hud10.setAttribute('material', 'src:#hud9')

  const hud_top = document.createElement('a-image');
  avatar.appendChild(hud_top)
  hud_top.setAttribute('position', '0 0.14 -0.3')
  hud_top.setAttribute('rotation', '-25 0 0')
  hud_top.setAttribute('height', '0.4')
  hud_top.setAttribute('width', '1.5')
  hud_top.setAttribute('material', 'src:#hud_top; opacity: 0.4')

    //add score
  const score = document.createElement('a-entity');
  avatar.appendChild(score);
  score.setAttribute('id', 'score');
  score.setAttribute('position', '-4, 2.3, -3.6');
  score.setAttribute('rotation', '15, 0, 0');
  score.setAttribute('bmfont-text', 'text: Score: 0; fnt: ./src/assets/fonts/DejaVu-sdf.fnt; fntImage: ./src/assets/fonts/DejaVu-sdf.png; color: #f44336; lineHeight:30; letterSpacing: 6');

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
  // console.log('SSSSSSSSS', bullets)
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
  model.setAttribute('src', '#arc170-obj');
  model.setAttribute('mtl', '#arc170-mtl');

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
