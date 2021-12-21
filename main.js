import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.15/+esm";

//UIデバッグ
const gui = new GUI();

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/**
 * パーティクルを作ってみよう
 */
//ジオメトリ
const particlesGeometry = new THREE.BufferGeometry();
const count = 10000;

const positionArray = new Float32Array(count * 3);
// console.log(positionArray);
const colorArray = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 10;
  colorArray[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);
particlesGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colorArray, 3)
);

//マテリアル
const pointMaterial = new THREE.PointsMaterial({
  size: 0.05,
  sizeAttenuation: true,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
});
// pointMaterial.color = new THREE.Color("green");

//メッシュ化
const particles = new THREE.Points(particlesGeometry, pointMaterial);

scene.add(particles);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}

animate();
