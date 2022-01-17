import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Ground } from './Grid.js';
import { loadGltf } from './Loader';
import { Pane } from 'tweakpane';


export default class Application {
    constructor(_options) {
        console.log('Welcome to the application main entry...')

        // get canvas DOM object
        this.$canvas = _options.$canvas;
        this.planeHelper = _options.planeHelper;
        this.axisHelper = _options.axisHelper;
        this.gridHelper = _options.gridHelper;
        this.enableDebug = _options.enableDebug.enabled;
        this.debugGui = _options.enableDebug.gui;
        this.statsHelper = _options.statsHelper;

        // param
        this.settingCamFoV = 55;
        this.settingCamFustrum = 10000;

        // main properties
        {
            let container, stats, camera, target, scene, renderer, grid, axis, control, gui;
            this.container = container;
            this.stats = stats;
            this.camera = camera;
            this.target = target;
            this.scene = scene;
            this.renderer = renderer;
            this.grid = grid;
            this.axis = axis;
            this.control = control;
            this.debug = gui
        }

        // init world and render
        this.init();
        this.initLight();
        this.initWorld();
        this.animate();
    }

    init() {
        // scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x95a7c3);
        this.scene.fog = new THREE.Fog(this.scene.background, 1, this.cameraFustrum);

        // camera
        this.camera = new THREE.PerspectiveCamera(
            this.settingCamFoV, 
            window.innerWidth/window.innerHeight, 
            0.1, 
            this.settingCamFustrum
        );

        // plane helper
        if (this.planeHelper) {
            this.scene.add(Ground);
        }

        // grid helper
        if (this.gridHelper) {
            this.grid = new THREE.GridHelper(15, 15);
            this.grid.position.set(0, -1, 0);
            this.scene.add(this.grid);
        }

        // axis helper
        if (this.axisHelper) {
            // axis
            this.axis = new THREE.AxesHelper();
            this.scene.add(this.axis);
        }

        // renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: this.$canvas
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;

        // orbit control
        this.control = new OrbitControls(this.camera, this.renderer.domElement);
        this.control.maxPolarAngle = 0.8 * Math.PI / 2;
        
        // camera target
        this.camera.position.set(2.3, 1.5, 1.9);
        this.target = new THREE.Vector3(0, 0, 0);
        this.camera.lookAt(this.target);

        this._camPos = new THREE.Vector3;
        this.camera.getWorldPosition(this._camPos);
        this._camPosStr =  `x: ${this._camPos.x.toFixed(1)}, y: ${this._camPos.y.toFixed(1)}, z: ${this._camPos.z.toFixed(1)}`;

        // fps stats
        if (this.statsHelper) {
            this.stats = Stats();
            document.body.append(this.stats.dom);
        }

        // gui helper
        if (this.debugGui == 'guify') {
            // guify
            this.initGuify();
        }

        if (this.debugGui == 'tweakpane') {
            // tweakpane
            this.initTweak();
        }

        // listener during resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    initLight() {
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 50, 0 );
        this.scene.add(hemiLight);

        const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 15 );
        this.scene.add(hemiLightHelper);

        this.addShadowedLight( 2, 2, 2, 0xffffff, 1.35 );
        this.addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );
    }

    initGuify() {
        // enable gui
        this.debug = new guify({
            title: 'test app',
            theme: 'dark',
            barMode: 'offset',
            align: 'right',
            width: 300,
            panelOverflowBehavior: 'overflow',
            opacity: 0.75,
            open: true
        })

        // Populate the GUI
        const param = {
            someNumber: 10,
            rangeMin: 0,
            rangeMax: 64,
            step: 4,
            logNumber: 20,
            interval: [15, 30],
            checkbox: false,
            testText: 'this is threejs boiler',
            options: ['Option 1', 'Option 2', 'Option 3'],
            optionsDefault: 'Option 1',
            rgbColor:'rgb(255, 0, 0)', 
            hexColor:'#00FF00',
            file: null        
        }

        // camera-part
        this.debug.Register({
            type: 'title',
            label: 'Camera'
        });

        this.debug.Register({
            type: 'range',
            label: 'Range',
            min: 0, max: 10,
            precision: 10,
            object: param, property: "someNumber",
            onChange: (data) => {
                console.log(data);
            }
        });

        this.debug.Register({
            type: 'display',
            label: 'X',
            object: this._camPos, property: 'x'
        });

        this.debug.Register({
            type: 'display',
            label: 'Y',
            object: this._camPos, property: 'y'
        });

        this.debug.Register({
            type: 'display',
            label: 'Z',
            object: this._camPos, property: 'z'
        });
    }

    initTweak() {
        this.debug = new Pane({
            title: 'parameters',
            expanded: true
        });

        // Populate the GUI
        const param = {
            someNumber: 10,
            rangeMin: 0,
            rangeMax: 64,
            step: 4,
            logNumber: 20,
            interval: [15, 30],
            checkbox: false,
            testText: 'this is threejs boiler',
            options: ['Option 1', 'Option 2', 'Option 3'],
            optionsDefault: 'Option 1',
            rgbColor:'rgb(255, 0, 0)', 
            hexColor:'#00FF00',
            file: null,
            cameraPos: 5       
        };

        this.debug.addMonitor(this, '_camPosStr');
    }

    initWorld() {
        loadGltf(this.scene);
    }

    addShadowedLight( x, y, z, color, intensity ) {

        const directionalLight = new THREE.DirectionalLight( color, intensity );
        directionalLight.position.set( x, y, z );
        directionalLight.castShadow = true;

        const d = 1;
        directionalLight.shadow.camera.left = - d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = - d;

        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 4;

        directionalLight.shadow.bias = - 0.002;

        this.scene.add(directionalLight);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        this.render();
        window.requestAnimationFrame(this.animate.bind(this));
    }

    updateDebug() {
        if (this.enableDebug){
            // update camera positions
            this.camera.getWorldPosition(this._camPos);
            this._camPosStr =  `x: ${this._camPos.x.toFixed(1)}, y: ${this._camPos.y.toFixed(1)}, z: ${this._camPos.z.toFixed(1)}`;
        }
    }

    updateStats() {
        if (this.statsHelper) {
            this.stats.update();
        }
    }

    render() {
        // this.camera.lookAt(this.target);
        this.control.update();

        // update all debug parts
        this.updateDebug();

        // update stats
        this.updateStats();

        this.debug.refresh();

        // render
        this.renderer.render(this.scene, this.camera);
    }
}