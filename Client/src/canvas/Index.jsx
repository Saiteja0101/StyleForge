import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';
import Shirt from './Shirt';
import CameraRig from './CameraRig'

const CanvasModel = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0">
      <Canvas
        shadows
        camera={{ position: [0, 0, 2.5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        <Environment preset="city" />
        
        <CameraRig>
          <Center>
            <group scale={[0.7, 0.7, 0.7]} position={[0, -0.5, 0]}>
              <Shirt />
            </group>
          </Center>
        </CameraRig>
      </Canvas>
    </div>
  )
}

export default CanvasModel