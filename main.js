import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//util function  -- should be moved to a different file -- stores the color of each rectangle in the table value

var table = [];
for(var i=0; i<8; i++) {
    table[i] = [];
    for(var j=0; j<8; j++) {
        table[i][j] = undefined;
    }
}

// coloring the table
table[1][0] = '0xdd223e';	
table[2][3] = '0xdd223e';   //red	
table[3][6] = '0xdd223e';	
table[0][5] = '0xdd223e';	

table[0][2] = '0x9059a6';	
table[1][7] = '0x9059a6';	    //purple
table[2][4] = '0x9059a6';	
table[3][1] = '0x9059a6';	

table[0][6] = '0x25ff00';	
table[1][3] = '0x25ff00';	
table[2][0] = '0x25ff00';	   //green
table[3][5] = '0x25ff00';	

for (let i = 0; i < 4; i++) {
	table[i][i] = '0xff6100';   //portocaliu
	table[i][7-i] = '0x663300'; //brown	
	table[i][i+4] = '0xffff00';	  //yelow ?
	table[i][3-i] = '0xe31ca3';   //pink
}
// first half finished
// mirroring the second half
for (let i = 4; i < 8; i++) {
	for (let j = 0 ; j < 8; j++) {
		table[i][j] =
			table[7-i][7-j];
}
}

for (let i = 0; i < 8; i++) {
	for (let j = 0 ; j < 8; j++) {
		if(table[i][j] == undefined)
			table[i][j] = '0x1a95e5';
}
}


//end of util stuff













// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Cube
var i;
var j;
for(i=0 ; i <=7; i++){
  for(j=0 ; j <=7; j++){
    const cube_geometry = new THREE.BoxGeometry( 5, 2,5 );
    const cube_material = new THREE.MeshBasicMaterial( {color: parseInt( table[i][j])} );
    const cube = new THREE.Mesh( cube_geometry, cube_material );
    cube.position.z = 7*i;
    cube.position.x = 7*j;
    scene.add( cube );
  }
}

//text
const loader = new THREE.FontLoader();

loader.load( 'fonts/Limelight_Regular.json', function ( font ) {

	const text_geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
} );
  const _textmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const text = new THREE.Mesh( text_geometry, text_material );
  scene.add( text );





// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
torus.position.z=40;
torus.position.x=40;

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;



// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.y = 30;
moon.position.setX(-10);


// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
camera.position.z = 60;
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
