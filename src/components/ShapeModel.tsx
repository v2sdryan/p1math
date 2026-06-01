import { Edges, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { Shape, ShapeKind } from '../data/shapes'

type ShapeModelProps = {
  shape: Pick<Shape, 'kind' | 'color' | 'name' | 'canRoll'>
  mini?: boolean
  sides?: number
  heightScale?: number
  pushKey?: number
  displayName?: string
}

function geometryFor(kind: ShapeKind, sides?: number, heightScale = 1) {
  const polygonSides = sides ?? 3

  switch (kind) {
    case 'triangular-prism':
      return <cylinderGeometry args={[0.9, 0.9, 1.45 * heightScale, polygonSides]} />
    case 'rectangular-prism':
      return <boxGeometry args={[1.45, 1.05 * heightScale, 1.05]} />
    case 'pentagonal-prism':
      return <cylinderGeometry args={[0.86, 0.86, 1.45 * heightScale, sides ?? 5]} />
    case 'triangular-pyramid':
      return <coneGeometry args={[1, 1.35 * heightScale, polygonSides]} />
    case 'square-pyramid':
      return <coneGeometry args={[1, 1.35 * heightScale, sides ?? 4]} />
    case 'sphere':
      return <sphereGeometry args={[0.78 * Math.min(heightScale, 1.25), 48, 32]} />
    case 'cylinder':
      return <cylinderGeometry args={[0.72, 0.72, 1.35 * heightScale, 48]} />
    case 'cone':
      return <coneGeometry args={[0.8, 1.35 * heightScale, 48]} />
  }
}

export function ShapeModel({ shape, mini = false, sides, heightScale = 1, pushKey = 0, displayName }: ShapeModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const pushStartRef = useRef<number | null>(null)
  const rotation: [number, number, number] =
    shape.kind === 'cylinder' ? [Math.PI / 2, 0, 0.2] : [0.08, 0.2, 0]

  useEffect(() => {
    if (!mini && pushKey > 0) {
      pushStartRef.current = performance.now()
    }
  }, [mini, pushKey])

  useFrame(() => {
    const group = groupRef.current
    const mesh = meshRef.current
    const pushStart = pushStartRef.current

    if (!group || !mesh || pushStart === null) return

    const elapsed = (performance.now() - pushStart) / 1000
    const duration = 1.35
    const t = Math.min(elapsed / duration, 1)
    const easeOut = 1 - (1 - t) ** 3
    const returnEase = Math.sin(Math.PI * t)

    if (shape.canRoll === 'yes') {
      group.position.x = returnEase * 1.45
      mesh.rotation.z = -easeOut * Math.PI * 3.2
    } else if (shape.canRoll === 'sometimes') {
      group.position.x = returnEase * 1.1
      mesh.rotation.y = -easeOut * Math.PI * 2.5
    } else {
      group.position.x = Math.sin(Math.PI * t) * 0.22
      group.rotation.z = Math.sin(Math.PI * t * 4) * 0.08
    }

    if (t >= 1) {
      group.position.set(0, 0, 0)
      group.rotation.z = 0
      mesh.rotation.set(0, 0, 0)
      pushStartRef.current = null
    }
  })

  return (
    <group ref={groupRef} rotation={rotation} scale={mini ? 0.9 : 1}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {geometryFor(shape.kind, sides, heightScale)}
        <meshStandardMaterial color={shape.color} roughness={0.48} metalness={0.04} />
        <Edges color="#0f172a" threshold={18} />
      </mesh>
      {!mini && (
        <Html position={[0, -1.35, 0]} center className="shape-name-tag">
          {displayName ?? shape.name}
        </Html>
      )}
    </group>
  )
}
