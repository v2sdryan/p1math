import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { FallbackShapeDiagram } from './FallbackShapeDiagram'
import { ShapeModel } from './ShapeModel'
import type { Shape } from '../data/shapes'

type ShapeCanvasProps = {
  shape: Shape
  mini?: boolean
  pushKey?: number
  sides?: number
  heightScale?: number
  displayName?: string
}

export function ShapeCanvas({ shape, mini = false, pushKey = 0, sides, heightScale = 1, displayName }: ShapeCanvasProps) {
  const [useFallbackDiagram] = useState(() => {
    if (typeof window === 'undefined') return false
    const ua = window.navigator.userAgent
    const isIOS = /iPad|iPhone|iPod/.test(ua)
    const isTouchMac = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1
    return isIOS || isTouchMac
  })

  if (!mini && useFallbackDiagram) {
    return (
      <div className="shape-canvas shape-canvas--fallback">
        <FallbackShapeDiagram shape={shape} sides={sides} heightScale={heightScale} displayName={displayName} />
      </div>
    )
  }

  return (
    <div className={`shape-canvas ${mini ? 'shape-canvas--mini' : ''}`}>
      <Canvas
        shadows
        camera={{ position: mini ? [0, 0.35, 4] : [0, 0.4, 4.4], fov: mini ? 34 : 38 }}
        dpr={[1, 1.8]}
      >
        <ambientLight intensity={1.4} />
        <directionalLight castShadow position={[3, 5, 4]} intensity={2.4} />
        <spotLight position={[-4, 5, 2]} angle={0.35} penumbra={0.5} intensity={1.3} />
        <ShapeModel
          shape={shape}
          mini={mini}
          pushKey={pushKey}
          sides={sides}
          heightScale={heightScale}
          displayName={displayName}
        />
        <ContactShadows position={[0, -1.15, 0]} opacity={0.3} scale={4} blur={2} far={2.4} />
        {!mini && <OrbitControls enablePan={false} enableZoom={false} />}
      </Canvas>
    </div>
  )
}
