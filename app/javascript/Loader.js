import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import porsche from '../models/porsche.glb';
import bmw from '../models/bmw.glb';

export function loadGltf(scene) {
    const loader = new GLTFLoader();

    // loader.load(porsche, (gltf) => {
    //     const mesh = gltf.scene.children[0];

    //     // do something with the mesh
    //     const s = 0.06;
    //     mesh.scale.set(s, s, s);
    //     mesh.position.set(0, 0, 0);

    //     mesh.castShadow = true;
    //     mesh.receiveShadow = true;

    //     scene.add(mesh);
    // });

    loader.load(porsche, (gltf) => {
        const mesh = gltf.scene.children[0];

        // do something with the mesh
        const s = 0.45;
        mesh.scale.set(s, s, s);
        mesh.position.set(-0.0, 0, 0.8);
        mesh.rotation.set(-0.5 * Math.PI, 0, 0);
        console.log(mesh.rotation);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);
    });

}