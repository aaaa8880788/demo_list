import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { useRef } from 'react';
// 平面纹理
import floor from '@/images/不敲了.jpg'
// 立方体的顶部纹理
import grass_top from '@/images/qql.GIF'
// 立方体的侧边纹理
import grass_side from '@/images/qql.PNG'
// 立方体的底部纹理
import grass_bottom from "@/images/woqiao.PNG";

const Demo1 = () => {
  const canvasRef = useRef(null);
  const init = () => {
    if(!canvasRef.current) return;
    // 1. 创建渲染器,指定渲染的分辨率和尺寸
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvasRef.current});
    renderer.pixelRatio = window.devicePixelRatio;
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 渲染器能够渲染阴影效果
    renderer.shadowMap.enabled = true;

    // 初始化纹理加载器
    const textloader = new THREE.TextureLoader();

    // 2. 创建场景
    const scene = new THREE.Scene();

    // 3. 创建相机
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.set(5, 5, 10);
    camera.position.set(10, 10, 10);
    // 添加交互
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.update();

    // 4. 创建坐标轴
    const axis = new THREE.AxesHelper(5);
    scene.add(axis);
    
    // 4. 添加立方体
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    // const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const material = [
      new THREE.MeshBasicMaterial({
        map: textloader.load(grass_side),
      }),
      new THREE.MeshBasicMaterial({
        map: textloader.load(grass_side),
      }),
      new THREE.MeshBasicMaterial({
        map: textloader.load(grass_top),
      }),
      new THREE.MeshBasicMaterial({
        map: textloader.load(grass_bottom),
      }),
      new THREE.MeshBasicMaterial({
        map: textloader.load(grass_side),
      }),
      new THREE.MeshBasicMaterial({
        map: textloader.load(grass_side),
      }),
    ];
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.y = Math.PI / 4;
    // 表示该立方体会产生影像效果
    cube.castShadow = true;
    scene.add(cube);

    // 4. 添加光源 - 环境光
    // const ambientLight = new THREE.AmbientLight(0xffffff, .7);
    // scene.add(ambientLight);
    // 4. 添加光源 - 方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    // 该方向会投射阴影效果
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 5. 方向光的辅助线
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight
    );
    scene.add(directionalLightHelper); // 辅助线

    // 新建了一个平面，该平面能够接受投射过来的阴影效果
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({ 
      // color: 0xffffff, // 白色平面
      map: textloader.load(floor), // 给地板加载纹理
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -0.5 * Math.PI;
    planeMesh.position.set(0, -3, 0);
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    // 5. 渲染
    renderer.render(scene, camera);

    

    
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime(); // 返回已经过去的时间, 以秒为单位
      cube.rotation.y = elapsedTime * Math.PI / 5; // 两秒自转一圈
      renderer.render(scene, camera);
    }
    animate()
  }
  useEffect(() => {
    init();
  })
  return (
    <div className='Demo1' style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  )
};

export default Demo1;