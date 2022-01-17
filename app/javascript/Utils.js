import * as THREE from 'three';


export function addBox (scene) {
    const box = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8eb2b3
    })

    return new THREE.Mesh(box, material);
}