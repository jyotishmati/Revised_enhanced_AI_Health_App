// import React, { useEffect, useRef } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Asset } from 'expo-asset';
// import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
// import { Renderer } from 'expo-three';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';




// export default function HeartModelViewer() {
//   const requestRef = useRef<number>();

//   const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
//     const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

//     const renderer = new Renderer({ gl });
//     renderer.setSize(width, height);
//     renderer.setClearColor(0xcccccc);
//     renderer.outputColorSpace = THREE.SRGBColorSpace;

//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.set(0, 0, 3);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
//     directionalLight.position.set(1, 1, 1);
//     scene.add(directionalLight);

//     // Load the GLB model asset
//     const glbAsset = Asset.fromModule(require('../../../assets/models/realistic_human_heart.glb'));
//     try {
//       await glbAsset.downloadAsync();
//       console.log('GLB Asset URI:', glbAsset.localUri || glbAsset.uri);
//     } catch (e) {
//       console.error('Error downloading GLB asset:', e);
//       return;
//     }

//     const loader = new GLTFLoader();
    
//     loader.load(
//       glbAsset.localUri || glbAsset.uri,
//       (gltf: any) => {
//         const model = gltf.scene;
//         console.log('Model loaded successfully');

//         // Optional: Center and scale
//         const box = new THREE.Box3().setFromObject(model);
//         const center = box.getCenter(new THREE.Vector3());
//         const size = box.getSize(new THREE.Vector3());
//         const maxDim = Math.max(size.x, size.y, size.z);
//         const scale = 2.0 / maxDim;

//         model.position.sub(center);
//         model.scale.set(scale, scale, scale);

//         scene.add(model);

//         const render = () => {
//           requestRef.current = requestAnimationFrame(render);
//           model.rotation.y += 0.01;
//           renderer.render(scene, camera);
//           gl.endFrameEXP();
//         };

//         render();
//       },
//       (xhr: ProgressEvent) => {
//         console.log(`${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
//       },
//       (error: unknown) => {
//         console.error('Error loading GLTF model:', error);
//         if (error instanceof Error) {
//           console.error('Error message:', error.message);
//         }
//       }
//     );
//   };

//   useEffect(() => {
//     return () => {
//       if (requestRef.current) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <GLView style={styles.glView} onContextCreate={onContextCreate} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   glView: {
//     flex: 1,
//   },
// });

import Realistic_human_heart from "../../../assets/models/Realistic_human_heart"
import Canvas from 'react-native-canvas';
export default function HeartModelViewer() {
    return {
        <Canvas>
<Realistic_human_heart/>
        </Canvas>
    }
}