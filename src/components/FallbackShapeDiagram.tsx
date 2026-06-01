import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import type { Shape } from '../data/shapes'

type FallbackShapeDiagramProps = {
  shape: Shape
  sides?: number
  heightScale?: number
  displayName?: string
}

type Point = {
  x: number
  y: number
}

type DragState = {
  active: boolean
  startX: number
  startRotation: number
}

const VIEWBOX_WIDTH = 320
const VIEWBOX_HEIGHT = 240

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function polygonPointList(cx: number, cy: number, radiusX: number, radiusY: number, sides: number, rotation = -Math.PI / 2) {
  return Array.from({ length: sides }, (_, index) => {
    const angle = rotation + (index * Math.PI * 2) / sides
    return {
      x: cx + Math.cos(angle) * radiusX,
      y: cy + Math.sin(angle) * radiusY,
    }
  })
}

function pointsToString(points: Point[]) {
  return points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ')
}

function PrismDiagram({
  color,
  sides = 3,
  heightScale = 1,
  rotation,
}: {
  color: string
  sides?: number
  heightScale?: number
  rotation: number
}) {
  const safeSides = clamp(sides, 3, 7)
  const scale = clamp(heightScale, 0.72, 1.42)
  const centerX = 152
  const centerY = 142
  const radiusX = safeSides === 3 ? 44 : 48
  const radiusY = (safeSides === 3 ? 33 : 30) * scale
  const baseRotation = rotation - Math.PI / 2
  const front = polygonPointList(centerX, centerY, radiusX, radiusY, safeSides, baseRotation)
  const depthX = Math.cos(rotation - Math.PI / 5) * 48
  const depthY = Math.sin(rotation - Math.PI / 5) * 20 - 30
  const back = front.map((point) => ({ x: point.x + depthX, y: point.y + depthY }))
  const sideFaces = front.map((point, index) => {
    const next = (index + 1) % safeSides
    const face = [point, front[next], back[next], back[index]]
    const centerYOfFace = face.reduce((sum, currentPoint) => sum + currentPoint.y, 0) / face.length
    return { face, index, centerY: centerYOfFace }
  })
  const visibleFaces = sideFaces.toSorted((a, b) => a.centerY - b.centerY)

  return (
    <g>
      <polygon points={pointsToString(back)} fill="#d8fbf7" stroke="#0b766d" strokeWidth="3" opacity="0.9" />
      {visibleFaces.map(({ face, index }) => (
        <polygon
          key={index}
          points={pointsToString(face)}
          fill={index % 2 === 0 ? '#79d9cf' : '#a3ebe4'}
          stroke="#0b766d"
          strokeWidth="3"
          opacity="0.88"
        />
      ))}
      <polygon points={pointsToString(front)} fill={color} stroke="#0b766d" strokeWidth="3.5" opacity="0.9" />
      {front.map((point, index) => (
        <line
          key={`edge-${index}`}
          x1={point.x}
          y1={point.y}
          x2={back[index].x}
          y2={back[index].y}
          stroke="#0b766d"
          strokeWidth="2.6"
          opacity="0.68"
        />
      ))}
    </g>
  )
}

function PyramidDiagram({
  color,
  sides = 4,
  heightScale = 1,
  rotation,
}: {
  color: string
  sides?: number
  heightScale?: number
  rotation: number
}) {
  const safeSides = clamp(sides, 3, 7)
  const scale = clamp(heightScale, 0.72, 1.45)
  const centerX = 160
  const centerY = 162
  const base = polygonPointList(centerX, centerY, 58, 30, safeSides, rotation - Math.PI / 2 + Math.PI / safeSides)
  const apex: Point = {
    x: centerX + Math.cos(rotation + Math.PI / 6) * 12,
    y: 66 - (scale - 1) * 28,
  }
  const faces = base.map((point, index) => {
    const next = base[(index + 1) % safeSides]
    const centerYOfFace = (point.y + next.y + apex.y) / 3
    return { points: [apex, point, next], index, centerY: centerYOfFace }
  })
  const orderedFaces = faces.toSorted((a, b) => a.centerY - b.centerY)

  return (
    <g>
      <polygon points={pointsToString(base)} fill="#ffdccc" stroke="#c94f34" strokeWidth="3" opacity="0.94" />
      {orderedFaces.map(({ points, index }) => (
        <polygon
          key={index}
          points={pointsToString(points)}
          fill={index % 2 === 0 ? color : '#ffad95'}
          opacity={index % 2 === 0 ? 0.9 : 0.78}
          stroke="#c94f34"
          strokeWidth="3"
        />
      ))}
      {base.map((point, index) => (
        <line
          key={`ridge-${index}`}
          x1={apex.x}
          y1={apex.y}
          x2={point.x}
          y2={point.y}
          stroke="#a93c27"
          strokeWidth={index === 0 ? 3 : 2.4}
          opacity={index === 0 ? 0.9 : 0.52}
        />
      ))}
      <polygon points={pointsToString(base)} fill="none" stroke="#a93c27" strokeWidth="3.2" opacity="0.9" />
    </g>
  )
}

function SphereDiagram({ color, rotation }: { color: string; rotation: number }) {
  const shineX = 137 + Math.cos(rotation) * 20

  return (
    <>
      <defs>
        <radialGradient id="fallback-sphere" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#9ed0ff" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <circle cx="160" cy="124" r="58" fill="url(#fallback-sphere)" />
      <ellipse cx={shineX} cy="106" rx="9" ry="15" fill="#ffffff" opacity="0.32" transform={`rotate(34 ${shineX} 106)`} />
    </>
  )
}

function CylinderDiagram({ color, heightScale = 1, rotation }: { color: string; heightScale?: number; rotation: number }) {
  const scale = clamp(heightScale, 0.72, 1.45)
  const height = 78 * scale
  const centerX = 160
  const top = 78 - (height - 78) / 2
  const bottom = top + height
  const lean = Math.sin(rotation) * 22

  return (
    <>
      <defs>
        <linearGradient id="fallback-cylinder" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#d99b12" />
          <stop offset="52%" stopColor={color} />
          <stop offset="100%" stopColor="#ffe08a" />
        </linearGradient>
      </defs>
      <path
        d={`M${centerX - 56 + lean} ${top}c0-17 112-17 112 0v${height}c0 17-112 17-112 0z`}
        fill="url(#fallback-cylinder)"
      />
      <ellipse cx={centerX + lean} cy={top} rx="56" ry="18" fill="#ffe49a" stroke="#c78910" strokeWidth="3" />
      <ellipse cx={centerX + lean} cy={bottom} rx="56" ry="18" fill="#e2a31a" stroke="#c78910" strokeWidth="3" />
      <path
        d={`M${centerX - 56 + lean} ${top}v${height}M${centerX + 56 + lean} ${top}v${height}`}
        stroke="#b9790d"
        strokeWidth="3"
        opacity="0.55"
      />
    </>
  )
}

export function FallbackShapeDiagram({ shape, sides, heightScale = 1, displayName }: FallbackShapeDiagramProps) {
  const [rotation, setRotation] = useState(-0.45)
  const dragState = useRef<DragState>({ active: false, startX: 0, startRotation: -0.45 })
  const isPyramid = shape.id === 'pyramid'
  const isPrism = shape.id === 'prism'

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragState.current = { active: true, startX: event.clientX, startRotation: rotation }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const currentDrag = dragState.current
    if (!currentDrag.active) return
    setRotation(currentDrag.startRotation + (event.clientX - currentDrag.startX) * 0.015)
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    dragState.current = { ...dragState.current, active: false }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div
      className="ios-fallback-stage"
      role="img"
      aria-label={`${displayName ?? shape.name} 圖形，可用手指左右拖動旋轉`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} aria-hidden="true">
        <ellipse cx="160" cy="214" rx="72" ry="14" fill="#15364e" opacity="0.14" />
        {isPrism && <PrismDiagram color={shape.color} sides={sides} heightScale={heightScale} rotation={rotation} />}
        {isPyramid && <PyramidDiagram color={shape.color} sides={sides} heightScale={heightScale} rotation={rotation} />}
        {shape.id === 'sphere' && <SphereDiagram color={shape.color} rotation={rotation} />}
        {shape.id === 'cylinder' && <CylinderDiagram color={shape.color} heightScale={heightScale} rotation={rotation} />}
      </svg>
    </div>
  )
}
