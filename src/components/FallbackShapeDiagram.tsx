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

function regularPolygonPoints(cx: number, cy: number, radius: number, sides: number, rotation = -Math.PI / 2) {
  return pointsToString(polygonPointList(cx, cy, radius, radius, sides, rotation))
}

function PrismDiagram({ color, sides = 3, heightScale = 1 }: { color: string; sides?: number; heightScale?: number }) {
  const safeSides = Math.max(3, Math.min(7, sides))
  const radiusX = safeSides === 3 ? 44 : 46
  const radiusY = (safeSides === 3 ? 42 : 44) * Math.max(0.78, Math.min(heightScale, 1.35))
  const front = polygonPointList(96, 92, radiusX, radiusY, safeSides, -Math.PI / 2)
  const back = front.map((point) => ({ x: point.x + 48, y: point.y - 28 }))
  const sideFaces = front.map((point, index) => {
    const next = (index + 1) % safeSides
    return [point, front[next], back[next], back[index]]
  })
  const visibleFaces = sideFaces
    .map((face, index) => ({ face, index, centerX: face.reduce((sum, point) => sum + point.x, 0) / face.length }))
    .sort((a, b) => a.centerX - b.centerX)

  return (
    <g>
      <polygon points={pointsToString(back)} fill="#d7faf6" stroke="#0b766d" strokeWidth="3.4" opacity="0.96" />
      {visibleFaces.map(({ face, index, centerX }) => (
        <polygon
          key={index}
          points={pointsToString(face)}
          fill={centerX > 122 ? '#61d2c7' : '#91e5dc'}
          stroke="#0b766d"
          strokeWidth="3.4"
          opacity={index % 2 === 0 ? 0.92 : 0.8}
        />
      ))}
      <polygon points={pointsToString(front)} fill={color} stroke="#0b766d" strokeWidth="3.8" opacity="0.86" />
      {front.map((point, index) => (
        <line
          key={`edge-${index}`}
          x1={point.x}
          y1={point.y}
          x2={back[index].x}
          y2={back[index].y}
          stroke="#0b766d"
          strokeWidth="3"
          opacity="0.72"
        />
      ))}
    </g>
  )
}

function PyramidDiagram({ color, sides = 4, heightScale = 1 }: { color: string; sides?: number; heightScale?: number }) {
  const base = regularPolygonPoints(120, 122, 58, sides, -Math.PI / 2 + Math.PI / sides)
  const apexY = 28 - (heightScale - 1) * 26

  return (
    <g>
      <polygon points={base} fill="#ffd7c9" stroke="#c94f34" strokeWidth="3" />
      <polygon points={`120,${apexY} 64,122 120,152`} fill="#ffb39c" stroke="#c94f34" strokeWidth="3" />
      <polygon points={`120,${apexY} 120,152 176,122`} fill={color} opacity="0.9" stroke="#c94f34" strokeWidth="3" />
      <line x1="120" y1={apexY} x2="120" y2="152" stroke="#c94f34" strokeWidth="3" />
    </g>
  )
}

function SphereDiagram({ color }: { color: string }) {
  return (
    <>
      <defs>
        <radialGradient id="fallback-sphere" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#9ed0ff" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <circle cx="120" cy="88" r="58" fill="url(#fallback-sphere)" />
      <ellipse cx="120" cy="158" rx="54" ry="12" fill="#15364e" opacity="0.15" />
    </>
  )
}

function CylinderDiagram({ color, heightScale = 1 }: { color: string; heightScale?: number }) {
  const height = 76 * heightScale
  const top = 56 - (height - 76) / 2
  const bottom = top + height

  return (
    <>
      <defs>
        <linearGradient id="fallback-cylinder" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#d99b12" />
          <stop offset="52%" stopColor={color} />
          <stop offset="100%" stopColor="#ffe08a" />
        </linearGradient>
      </defs>
      <path d={`M64 ${top}c0-17 112-17 112 0v${height}c0 17-112 17-112 0z`} fill="url(#fallback-cylinder)" />
      <ellipse cx="120" cy={top} rx="56" ry="18" fill="#ffe49a" stroke="#c78910" strokeWidth="3" />
      <ellipse cx="120" cy={bottom} rx="56" ry="18" fill="#e2a31a" stroke="#c78910" strokeWidth="3" />
      <path d={`M64 ${top}v${height}M176 ${top}v${height}`} stroke="#b9790d" strokeWidth="3" opacity="0.55" />
    </>
  )
}

export function FallbackShapeDiagram({ shape, sides, heightScale = 1, displayName }: FallbackShapeDiagramProps) {
  const isPyramid = shape.id === 'pyramid'
  const isPrism = shape.id === 'prism'

  return (
    <div className="ios-fallback-stage" role="img" aria-label={`${displayName ?? shape.name} 圖形`}>
      <svg viewBox="0 0 240 180" aria-hidden="true">
        <ellipse cx="120" cy="164" rx="68" ry="14" fill="#15364e" opacity="0.14" />
        {isPrism && <PrismDiagram color={shape.color} sides={sides} heightScale={heightScale} />}
        {isPyramid && <PyramidDiagram color={shape.color} sides={sides} heightScale={heightScale} />}
        {shape.id === 'sphere' && <SphereDiagram color={shape.color} />}
        {shape.id === 'cylinder' && <CylinderDiagram color={shape.color} heightScale={heightScale} />}
      </svg>
      <span className="shape-name-tag">{displayName ?? shape.name}</span>
    </div>
  )
}
