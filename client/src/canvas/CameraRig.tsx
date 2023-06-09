import { FC, PropsWithChildren, useRef } from 'react'
import { easing } from 'maath'
import { Group } from 'three'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'

import state from '../store'

type CameraRigProps = PropsWithChildren & {}

const CameraRig: FC<CameraRigProps> = ({ children }) => {
  const group = useRef<Group>(null)
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600

    // set the initial position of the model
    let targetPosition: [x: number, y: number, z: number] = [-0.4, 0, 2]
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2]
      if (isMobile) targetPosition = [0, 0.2, 2.5]
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2]
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

export default CameraRig
