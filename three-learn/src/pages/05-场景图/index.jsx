import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Checkbox, Slider, ColorPicker  } from 'antd'

const Basic = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  // 要更新旋转角度的对象数组
  const objectsRef = useRef([]);
  const clockRef = useRef(new THREE.Clock());
  // 球体
  const [sphereGeometryState, setSphereGeometryState] = useState({
    radius: 1,
    widthSegments: 6,
    heightSegments: 6,
  });
  const [pointLightState, setPointLightState] = useState({
    color: 0xffffff,
    intensity: 300,
  });

  const init = () => {
    if(!canvasRef.current) return;

    // 创建渲染器,指定渲染的分辨率和尺寸
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvasRef.current});
    rendererRef.current = renderer
    renderer.pixelRatio = window.devicePixelRatio;
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene
    // 全图场景图节点
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objectsRef.current.push(solarSystem);

    // 创建相机
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    // 添加交互
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.update();

    // 添加球体
    const sphereGeometry = new THREE.SphereGeometry(sphereGeometryState.radius, sphereGeometryState.widthSegments, sphereGeometryState.heightSegments);
    // 添加太阳球体
    const sunMaterial = new THREE.MeshPhongMaterial({
      emissive: 0xffff00,
    });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
    sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
    solarSystem.add(sunMesh);
    objectsRef.current.push(sunMesh);

    // 地球场景图节点
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    // objectsRef.current.push(earthOrbit);

    // 添加地球球体
    const earthMeterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    })
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMeterial)
    earthOrbit.add(earthMesh);
    objectsRef.current.push(earthMesh);
    objectsRef.current.push(earthOrbit);

    // 月球场景图节点
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    // 月球球体
    const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    moonOrbit.add(moonMesh);
    objectsRef.current.push(moonMesh);

    // 添加光源
    const pointLight = new THREE.PointLight(pointLightState.color, pointLightState.intensity);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
    scene.add(pointLight);
    scene.add(pointLightHelper);

    // 5. 渲染
    renderer.render(scene, camera);
    animate()
  }

  const resize = () => {
    if(rendererRef.current) {
      if(canvasRef.current.clientWidth != window.innerWidth || canvasRef.current.clientHeight != window.innerHeight) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix();
      }
    }
  }

  const animate = () => {
    if(objectsRef.current) {
      objectsRef.current.forEach((obj) => {
        const elapsedTime = clockRef.current.getElapsedTime(); // 返回已经过去的时间, 以秒为单位
        obj.rotation.y = elapsedTime * Math.PI / 2 ; // 四秒自转一圈;
      });
    }
    requestAnimationFrame(animate);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }

  const addEventListener = () => {
    window.addEventListener("resize", () => {
      resize()
    })
  }

  useEffect(() => {
    init();
    addEventListener();
  }, []);

  return (
    <div className='Basic' style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  )
};

export default Basic;