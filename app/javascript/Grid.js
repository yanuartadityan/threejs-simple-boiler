import * as THREE from 'three';

const plane = new THREE.PlaneGeometry(15, 15, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: 0x1b75a2,
    side: THREE.DoubleSide
});

const grid = new THREE.Mesh(plane, material);
grid.rotation.set(-0.5 * Math.PI, 0, 0);
grid.position.set(0, -1, 0);

const groundGeo = new THREE.PlaneGeometry(10000, 10000);
const groundMat = new THREE.MeshLambertMaterial({
    color: 0x000000
});
groundMat.color.setHex(0x20242a);
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.y = - 33;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;

// export
export { grid as Grid };
export { ground as Ground };