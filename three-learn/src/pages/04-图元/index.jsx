import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Checkbox, Slider, ColorPicker  } from 'antd'

const Basic = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  // 环境光
  const [ambientLightStatus, setAmbientLightStatus] = useState({
    color: 0xffffff,
    intensity: 1,
    visible: true,
  });
  // 盒子
  const [boxGeometryState, setBoxGeometryState] = useState({
    width: 5,
    height: 5,
    depth: 5,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
    material: {
      color: 0xcccccc,
      wireframe: true
    }
  });
  // 平面圆
  const [circleGeometryState, setCircleGeometryState] = useState({
    radius: 2.5,
    segments: 12,
    thetaStart: Math.PI * 1.00,
    thetaLength: Math.PI * 1.00,
    material: {
      color: 0xcccccc,
      wireframe: true
    }
  });
  // 锥形
  const [coneGeometryState, setConeGeometryState] = useState({
    radius: 2.5,
    height: 10,
    radialSegments: 10,
    heightSegments: 1,
    openEnded: false,
    thetaStart: Math.PI * 0.00,
    thetaLength: Math.PI * 2.00,
    material: {
      color: 0xcccccc,
      wireframe: true
    }
  })

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
    camera.position.set(30, 30, 50);

    // 添加交互
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.update();

    // 添加光源 - 环境光源
    const ambientLight = new THREE.AmbientLight(ambientLightStatus.color, ambientLightStatus.intensity);
    scene.add(ambientLight);

    // 添加物体
    // 1.盒子 BoxGeometry
    const boxGeometry = new THREE.BoxGeometry(boxGeometryState.width, boxGeometryState.height, boxGeometryState.depth, boxGeometryState.widthSegments, boxGeometryState.heightSegments, boxGeometryState.depthSegments);
    const boxMaterial = new THREE.MeshPhongMaterial(boxGeometryState.material);
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);
    // 2.平面圆
    const circleGeometry = new THREE.CircleGeometry(circleGeometryState.radius, circleGeometryState.segments, circleGeometryState.thetaStart, circleGeometryState.thetaLength)
    const circleMaterial = new THREE.MeshPhongMaterial(circleGeometryState.material)
    const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial)
    circleMesh.position.set(10, 0, 0)
    scene.add(circleMesh);
    // 3.锥形
    const coneGeometry = new THREE.ConeGeometry(coneGeometryState.radius, coneGeometryState.height, coneGeometryState.radialSegments, coneGeometryState.heightSegments, coneGeometryState.openEnded, coneGeometryState.thetaStart, coneGeometryState.thetaLength);
    const coneMaterial = new THREE.MeshPhongMaterial(coneGeometryState.material);
    const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
    coneMesh.position.set(20, 0, 0);
    scene.add(coneMesh);

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