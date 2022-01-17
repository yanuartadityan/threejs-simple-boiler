import './style/main.css';
import Application from './javascript/Application';


window.application = new Application({
    $canvas: document.querySelector('.threejs-canvas'),
    planeHelper: false,
    gridHelper: false,
    axisHelper: true,
    statsHelper: false,
    debug: true
})