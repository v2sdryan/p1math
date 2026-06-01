import type { Shape } from '../data/shapes'

type ShapePreviewProps = {
  shape: Shape
}

type SvgShapeProps = {
  color: string
  id: string
}

function TriangularPrism({ color, id }: SvgShapeProps) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label="三角柱圖形">
      <defs>
        <linearGradient id={`${id}-top`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#c8f8f2" />
          <stop offset="100%" stopColor="#77d9cf" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#8de2d8" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <polygon points="34,22 18,82 70,82" fill="#c8f8f2" stroke="#10766e" strokeWidth="2.2" />
      <polygon points="92,34 76,94 128,94" fill="#6fcfc5" stroke="#10766e" strokeWidth="2.2" />
      <polygon points="34,22 92,34 128,94 70,82" fill={`url(#${id}-top)`} stroke="#10766e" strokeWidth="2.2" />
      <polygon points="18,82 76,94 128,94 70,82" fill="#38b9aa" stroke="#10766e" strokeWidth="2.2" />
      <polygon points="34,22 92,34 76,94 18,82" fill={`url(#${id}-side)`} stroke="#10766e" strokeWidth="2.2" />
      <line x1="70" y1="82" x2="128" y2="94" stroke="#10766e" strokeWidth="2.2" />
    </svg>
  )
}

function RectangularPrism({ color, id }: SvgShapeProps) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label="長方體圖形">
      <defs>
        <linearGradient id={`${id}-side`} x1="0%" x2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#08766b" />
        </linearGradient>
      </defs>
      <polygon points="34,28 104,14 130,34 58,50" fill="#a2eee6" stroke="#0d766f" strokeWidth="2" />
      <polygon points="58,50 130,34 130,82 58,98" fill={`url(#${id}-side)`} stroke="#0d766f" strokeWidth="2" />
      <polygon points="34,28 58,50 58,98 34,76" fill="#72d8cd" stroke="#0d766f" strokeWidth="2" />
    </svg>
  )
}

function PentagonalPrism({ color, id }: SvgShapeProps) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label="五角柱圖形">
      <defs>
        <linearGradient id={`${id}-body`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#9ee8df" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <polygon points="32,44 50,20 82,20 100,44 66,66" fill="#b9f1eb" stroke="#168276" strokeWidth="2" />
      <polygon points="66,66 100,44 126,56 92,80" fill="#80ddd3" stroke="#168276" strokeWidth="2" />
      <polygon points="50,20 82,20 108,32 76,32" fill="#d0faf5" stroke="#168276" strokeWidth="2" />
      <polygon points="82,20 100,44 126,56 108,32" fill={`url(#${id}-body)`} stroke="#168276" strokeWidth="2" />
      <polygon points="32,44 66,66 92,80 58,58" fill={color} opacity="0.85" />
    </svg>
  )
}

function TriangularPyramid({ color, id }: SvgShapeProps) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label="三角錐圖形">
      <defs>
        <linearGradient id={`${id}-face`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#ffb096" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <polygon points="80,12 34,92 112,88" fill={`url(#${id}-face)`} stroke="#c95136" strokeWidth="2" />
      <polygon points="80,12 112,88 132,58" fill="#ff8f72" stroke="#c95136" strokeWidth="2" />
      <polygon points="34,92 112,88 132,58" fill="#ffd0bd" stroke="#c95136" strokeWidth="2" />
    </svg>
  )
}

function SquarePyramid({ color, id }: SvgShapeProps) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label="四角錐圖形">
      <defs>
        <linearGradient id={`${id}-face`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#ff9eba" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <polygon points="80,10 34,84 80,104" fill="#ffc1d2" stroke="#c94d73" strokeWidth="2" />
      <polygon points="80,10 80,104 130,80" fill={`url(#${id}-face)`} stroke="#c94d73" strokeWidth="2" />
      <polygon points="34,84 80,104 130,80 80,62" fill="#ffd7e2" stroke="#c94d73" strokeWidth="2" />
    </svg>
  )
}

function Sphere({ color, id }: SvgShapeProps) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label="球體圖形">
      <defs>
        <radialGradient id={`${id}-sphere`} cx="36%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#8ec5ff" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <circle cx="80" cy="56" r="43" fill={`url(#${id}-sphere)`} />
      <ellipse cx="80" cy="101" rx="38" ry="8" fill="#15364e" opacity="0.14" />
    </svg>
  )
}

function Cylinder({ color, id }: SvgShapeProps) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label="圓柱圖形">
      <defs>
        <linearGradient id={`${id}-body`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#d99b12" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="#ffe08a" />
        </linearGradient>
      </defs>
      <path d="M42 34c0-12 76-12 76 0v44c0 12-76 12-76 0z" fill={`url(#${id}-body)`} />
      <ellipse cx="80" cy="34" rx="38" ry="12" fill="#ffe49a" stroke="#c78910" strokeWidth="2" />
      <ellipse cx="80" cy="78" rx="38" ry="12" fill="#e2a31a" stroke="#c78910" strokeWidth="2" />
      <path d="M42 34v44M118 34v44" stroke="#b9790d" strokeWidth="2" opacity="0.5" />
    </svg>
  )
}

function ConeShape({ color, id }: SvgShapeProps) {
  return (
    <svg viewBox="0 0 160 110" role="img" aria-label="圓錐圖形">
      <defs>
        <linearGradient id={`${id}-cone`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#c6b4ff" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <path d="M80 12 38 82c0 14 84 14 84 0z" fill={`url(#${id}-cone)`} stroke="#795bd8" strokeWidth="2" />
      <ellipse cx="80" cy="82" rx="42" ry="13" fill="#b39cff" stroke="#795bd8" strokeWidth="2" />
    </svg>
  )
}

export function ShapePreview({ shape }: ShapePreviewProps) {
  const id = `preview-${shape.id}`

  return (
    <span className="preview-stage" aria-hidden="true">
      {shape.kind === 'triangular-prism' && <TriangularPrism color={shape.color} id={id} />}
      {shape.kind === 'rectangular-prism' && <RectangularPrism color={shape.color} id={id} />}
      {shape.kind === 'pentagonal-prism' && <PentagonalPrism color={shape.color} id={id} />}
      {shape.kind === 'triangular-pyramid' && <TriangularPyramid color={shape.color} id={id} />}
      {shape.kind === 'square-pyramid' && <SquarePyramid color={shape.color} id={id} />}
      {shape.kind === 'sphere' && <Sphere color={shape.color} id={id} />}
      {shape.kind === 'cylinder' && <Cylinder color={shape.color} id={id} />}
      {shape.kind === 'cone' && <ConeShape color={shape.color} id={id} />}
    </span>
  )
}
