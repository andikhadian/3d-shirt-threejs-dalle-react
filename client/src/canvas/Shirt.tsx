import { useRef } from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { ColorRepresentation, Mesh, MeshStandardMaterial } from 'three'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import state from '../store'

type GLTFResult = GLTF & {
  nodes: {
    [x in string]: Mesh
  }
  materials: {
    [x in string]: MeshStandardMaterial
  }
}

const Shirt = () => {
  const mesh = useRef<Mesh>(null)
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked.glb') as GLTFResult

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((state, delta) => {
    if (!mesh.current?.rotation) return
    easing.dampC(
      materials.lambert1.color,
      snap.color as ColorRepresentation,
      0.25,
      delta
    )
    easing.dampE(
      mesh.current?.rotation,
      [state.pointer.y / 10, -state.pointer.x / 2, 0],
      0.55,
      delta
    )
  })

  const stateString = JSON.stringify(snap)

  return (
    <group>
      <mesh
        ref={mesh}
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        rotation={[0, 0, 0]}
        material-roughness={1}
        dispose={null}
      >
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
