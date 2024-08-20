import React, { useRef, useEffect} from 'react';
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import mitt from 'mitt'
import { throttle } from '@/utils/common'
export default function() {
  const demo1 = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const emitter = mitt()


  // 初始化渲染器
  const initRenderer = () => {
    return new Promise((resolve, reject)=> {
      const getCanvasElement = new Promise((resolve1, reject1) => {
        const fn = () => {
          if(!canvasRef.current) {
            setTimeout(() => {
              fn();
            }, 50)
          }else {
            resolve1(canvasRef.current)
          }
        }
        fn();
      })
      getCanvasElement.then(canvas => {
        console.log('canvas------', canvas);
        // 创建渲染器,指定渲染的分辨率和尺寸
        const renderer = new THREE.WebGLRenderer({
          logarithmicDepthBuffer: true, // 是否使用对数深度缓存。如果要在单个场景中处理巨大的比例差异，就有必要使用
          antialias: true, // 表示是否开启反锯齿
          // alpha: true, // true/false 表示是否可以设置背景色透明
          precision: 'mediump', // highp/mediump/lowp 表示着色精度选择
          premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
          // preserveDrawingBuffer: false, // true/false 表示是否保存绘图缓冲
          // physicallyCorrectLights: true, // true/false 表示是否开启物理光照
          canvas: canvas
        });
        rendererRef.current = renderer
        renderer.shadowMap.enabled = true; // 允许在场景中使用阴影贴图
        renderer.clearDepth(); // 清除深度缓存
        renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
        renderer.setSize(demo1.current.clientWidth, demo1.current.clientHeight);
        resolve(renderer);
      })
    })
  }
  // 初始化场景
  const initScene = () => {
    // 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene
  }

  // 初始化相机
  const initCamera = () => {
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      45, // 视角
      demo1.current.clientWidth / demo1.current.clientHeight, // 宽高比
      0.1, // 近平面 
      2000 // 远平面
    );
    cameraRef.current = camera
    camera.position.set(0, 10, 20);
  }

  // 初始化负责器
  const initHelper = () => {
    const axesHelper = new THREE.AxesHelper(5);
    sceneRef.current.add(axesHelper);
  }

  // 初始化摄像机控制器
  const initControls = () => {
    // 添加交互
    const controls = new OrbitControls(cameraRef.current, canvasRef.current);
    controlsRef.current = controls;
    controls.screenSpacePanning = false; // 定义当平移的时候摄像机的位置将如何移动。如果为true，摄像机将在屏幕空间内平移。 否则，摄像机将在与摄像机向上方向垂直的平面中平移。
    controls.enableDamping = true; // 设置带阻尼的惯性
    controls.dampingFactor = 0.05; // 设置阻尼系数
    // controls.autoRotate = true; // 自动旋转
  }

  // 初始化立方体
  const initCube = () => {
    const cube = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
    const cubeMesh = new THREE.Mesh(cube, cubeMaterial);
    sceneRef.current.add(cubeMesh);
  }

  // 初始化环境光源
  const initAmbientLight = () => {
    // 添加光源 - 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 180;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.left = -120;
    directionalLight.shadow.camera.right = 400;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 400;
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    directionalLight.shadow.mapSize.set(1024, 1024);
    sceneRef.current.add(directionalLight)
    // 辅助器 - 平行光
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    sceneRef.current.add(directionalLightHelper);
  }

  // 初始化渲染
  const initRender = () => {
    // 循环
    animate();
  }


  const animate = () => {
    controlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestAnimationFrame(animate);
  }

  const init = () => {
    initRenderer().then(res => {
      initScene();
      initCamera();
      initHelper();
      initControls();
      initAmbientLight();
      initCube();
      initRender();
    })
  }

  

  const resize = () => {
    if(rendererRef && canvasRef && demo1) {
      if(canvasRef.current.clientWidth != demo1.current.clientWidth || canvasRef.current.clientHeight != demo1.current.clientHeight) {
        rendererRef.current.setSize(demo1.current.clientWidth, demo1.current.clientHeight);
        cameraRef.current.aspect = demo1.current.clientWidth / demo1.current.clientHeight
        cameraRef.current.updateProjectionMatrix();
      }
    }
  }

  const addEventListener = () => {
    window.addEventListener("resize", () => {
      resize()
    })
  }

  useEffect(() => {
    init();
    addEventListener();
  }, [])
  
  return (
    <div className='Demo1' ref={demo1} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}