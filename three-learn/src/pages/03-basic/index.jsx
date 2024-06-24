import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Checkbox, Slider, ColorPicker  } from 'antd'
// 平面纹理
import floor from '@/images/不敲了.jpg'
// 立方体的顶部纹理
import grass_top from '@/images/qql.GIF'
// 立方体的侧边纹理
import grass_side from '@/images/qql.PNG'
// 立方体的底部纹理
import grass_bottom from "@/images/woqiao.PNG";

const Basic = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

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

    // 创建相机
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera
    camera.position.set(0, 0, 10);

    // 添加交互
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.update();
    
    // 添加球体
    // const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    // const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x878787 });
    // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // sphereRef.current = sphere
    // sphere.castShadow = true;
    // sphere.position.set(0, 1, 0);
    // scene.add(sphere);
    // 添加立方体
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);
    const direactionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(direactionalLightHelper);

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