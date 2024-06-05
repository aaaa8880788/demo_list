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

const Demo2 = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereRef = useRef(null);
  // 环境光
  const ambientLightRef = useRef(null);
  // 半球光
  const hemisphereLightRef = useRef(null);
  // 环境光
  const [ambientLightStatus, setAmbientLightStatus] = useState({
    color: 0xffffff,
    intensity: 1,
    visible: true,
  });
  // 半球光
  const [hemisphereLightStatus, setHemisphereLightStatus] = useState({
    color: 0xff0000, // 从天空发出的光线的颜色
    groundColor: 0xff0000, // 从地面发出的光线的颜色
    intensity: 1, // 光源照射的强度。默认值为1
    position: {
      x: 0,
      y: 10,
      z: 0
    }, // 光源在场景中的位置。默认值为：(0, 100, 0)
    visible: true,
  });

  const init = () => {
    if(!canvasRef.current) return;
    // 1. 创建渲染器,指定渲染的分辨率和尺寸
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvasRef.current});
    rendererRef.current = renderer
    renderer.pixelRatio = window.devicePixelRatio;
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 渲染器能够渲染阴影效果
    renderer.shadowMap.enabled = true;
    // 阴影的类型
    // 1. BasicShadowMap：基本阴影映射类型，使用简单的阴影投影算法生成阴影。这是默认的阴影映射类型。
    // 性能优秀但是质量不好（默认）
    // 2. PCFShadowMap：使用 Percentage-Closer Filtering (PCF)技术生成阴影，以获得更平滑的阴影边缘效果。
    // 性能稍差但是拥有光滑的边缘
    // 3. PCFSoftShadowMap：使用软阴影技术生成阴影，通过多次采样和模糊处理来产生更柔和的阴影效果。
    // 性能稍差但是拥有更 soft 的边缘
    // 4. VSMShadowMap：使用Variance Shadow Mapping (VSM)技术生成阴影，以获得更高质量的阴影效果和更柔和的阴影边缘。
    // 性能稍差，更多限制，有着意想不到的效果
    // renderer.shadowMap.type = THREE.PCFShadowMap;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.shadowMap.type = THREE.VSMShadowMap;

    // 初始化纹理加载器
    const textloader = new THREE.TextureLoader();

    // 2. 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene

    // 3. 创建相机
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera
    camera.position.set(0, 20, 30);
    // 添加交互
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.update();
    
    // 添加球体
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x878787 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereRef.current = sphere
    sphere.castShadow = true;
    sphere.position.set(0, 1, 0);
    scene.add(sphere);

    // 4. 添加光源 - 环境光源
    // color：环境光的颜色；
    // intensity：光源照射的强度。默认值为1；
    // visible：设为 ture（默认值），光源就会打开。设为 false，光源就会关闭。
    // const ambientLight = new THREE.AmbientLight(ambientLightStatus.color, ambientLightStatus.intensity);
    // ambientLightRef.current = ambientLight
    // scene.add(ambientLight);

    // 4. 添加光源 - 半球光源
    // color从天空发出的光线的颜色；
    // groundColor：从地面发出的光线的颜色
    // intensity：光源照射的强度。默认值为1；
    // position：光源在场景中的位置。默认值为：(0, 100, 0)
    // visible：设为 ture（默认值），光源就会打开。设为 false，光源就会关闭。
    // const hemisphereLight = new THREE.HemisphereLight(hemisphereLightStatus.color, hemisphereLightStatus.groundColor, hemisphereLightStatus.intensity);
    // hemisphereLight.position.set(hemisphereLightStatus.position.x, hemisphereLightStatus.position.y, hemisphereLightStatus.position.z);
    // hemisphereLightRef.current = hemisphereLight;
    // scene.add(hemisphereLight);
    // const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1);
    // scene.add(hemisphereLightHelper); // 辅助线

    // 4. 添加光源 - 矩形区域光源
    // color：环境光的颜色；
    // intensity：光源照射的强度。默认值为1；
    // width: 光源的宽度，默认值为10；
    // height: 光源的高度，默认值为10；
    // visible：设为 ture（默认值），光源就会打开。设为 false，光源就会关闭。
    // const rectLight = new THREE.RectAreaLight(0xffffff, 2, 4, 4);
    // rectLight.position.set(0, 10, 0);
    // rectLight.lookAt(0, 0, 0);
    // scene.add(rectLight);

    // 4. 添加光源 - 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    // 扩大相机的上边缘
    directionalLight.shadow.camera.top = 8; // 这个值不是固定的，视场景不同
    // 和相机的渲染一致，设置相机的far,可以控制是否显示阴影。
    directionalLight.shadow.camera.far = 30;
    // 我们可以使用 radius 属性控制阴影模糊
    directionalLight.shadow.radius = 0

    scene.add(directionalLight);
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
    scene.add(directionalLightHelper);
    // 用相机辅助线看一下光线的阴影的相机视角：
    const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(cameraHelper);


    // 4. 添加光源 - 点光源
    // color点光源的颜色；
    // intensity：光源照射的强度。默认值为1；
    // position：光源在场景中的位置。
    // visible：设为 ture（默认值），光源就会打开。设为 false，光源就会关闭。
    // const pointLight = new THREE.PointLight(0xffffff, 100);
    // pointLight.position.set(10, 10, 0);
    // scene.add(pointLight);
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
    // scene.add(pointLightHelper);
    // 4. 添加光源 - 聚光灯
    // color点光源的颜色；
    // intensity：光源照射的强度。默认值为1；
    // distance：光源照射的最大距离。默认值为 0（无限远）;
    // angle：光线照射范围的角度。默认值为 Math.PI/3;
    // penumbra：聚光锥的半影衰减百分比。默认值为 0;
    // decay：沿着光照距离的衰减量。默认值为 2。
    // const spotLight = new THREE.SpotLight(0xffffff, 100);
    // spotLight.position.set(10, 10, 0);
    // scene.add(spotLight);
    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);


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

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate()
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='Demo2' style={{width: '100%', height: '100%', overflow: 'hidden'}}>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  )
};

export default Demo2;