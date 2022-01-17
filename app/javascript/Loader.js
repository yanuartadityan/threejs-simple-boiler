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

    loader.load(bmw, (gltf) => {
        const mesh = gltf.scene.children[0];

        // do something with the mesh
        const s = 0.00045;
        mesh.scale.set(s, s, s);
        mesh.position.set(0, 0, 0);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);
    });

}