import { Rotate3D, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import type { Shape } from '../data/shapes'
import { ShapeCanvas } from './ShapeCanvas'

type LessonPanelProps = {
  shapes: Shape[]
  onStartPractice: () => void
}

export function LessonPanel({ shapes, onStartPractice }: LessonPanelProps) {
  const [activeId, setActiveId] = useState(shapes[0].id)
  const [pushKey, setPushKey] = useState(0)
  const [cornerCounts, setCornerCounts] = useState({ prism: 3, pyramid: 4 })
  const [heightScales, setHeightScales] = useState<Record<string, number>>({
    prism: 1,
    pyramid: 1,
    sphere: 1,
    cylinder: 1,
  })
  const activeShape = shapes.find((shape) => shape.id === activeId) ?? shapes[0]
  const ActiveIcon = activeShape.icon
  const canChangeCorners = activeShape.id === 'prism' || activeShape.id === 'pyramid'
  const activeCorners = activeShape.id === 'pyramid' ? cornerCounts.pyramid : cornerCounts.prism
  const activeHeight = heightScales[activeShape.id] ?? 1
  const heightLabel = Math.round(activeHeight * 100)
  const displayName = canChangeCorners ? `${activeCorners}角${activeShape.id === 'pyramid' ? '錐' : '柱'}` : activeShape.name
  const dynamicFacts = canChangeCorners
    ? [
        `底面有 ${activeCorners} 條邊，同 ${activeCorners} 個角`,
        ...(activeShape.id === 'prism'
          ? ['上下有兩個一樣嘅底面', '側面一格一格，好似圍住個底面']
          : ['有一個底面', `有 ${activeCorners} 塊三角形側面，全部去到尖頂`]),
      ]
    : activeShape.facts

  function pushShape() {
    setPushKey((current) => current + 1)
  }

  function updateCorners(corners: number) {
    setCornerCounts((current) =>
      activeShape.id === 'pyramid' ? { ...current, pyramid: corners } : { ...current, prism: corners },
    )
  }

  function updateHeight(height: number) {
    setHeightScales((current) => ({ ...current, [activeShape.id]: height }))
  }

  return (
    <section className="lesson-section" id="lesson">
      <div className="section-heading">
        <div>
          <h1>小一數學：認識立體圖形</h1>
          <p>用手指拖動 3D 圖形，轉一圈睇清楚佢有冇平面、尖頂同圓圓嘅面。</p>
        </div>
        <button type="button" className="nav-action" onClick={onStartPractice}>
          開始練習
        </button>
      </div>

      <div className="lesson-grid">
        <div className="viewer-panel" style={{ '--shape-accent': activeShape.accent } as CSSProperties}>
          <div className="viewer-topline">
            <span>
              <ActiveIcon size={22} strokeWidth={2.3} />
              {displayName}
            </span>
            <span className="rotate-note">
              <Rotate3D size={18} />
              360 度旋轉
            </span>
          </div>
          <ShapeCanvas
            shape={activeShape}
            pushKey={pushKey}
            sides={canChangeCorners ? activeCorners : undefined}
            heightScale={activeHeight}
            displayName={displayName}
          />
          <div className="push-row">
            <button type="button" onClick={pushShape} className="primary-button">
              <Sparkles size={20} />
              推一推
            </button>
            <p>{activeShape.pushResult}</p>
          </div>
        </div>

        <div className="info-panel">
          <div className="shape-tabs" aria-label="選擇立體圖形">
            {shapes.map((shape) => {
              const Icon = shape.icon
              return (
                <button
                  type="button"
                  key={shape.id}
                  className={shape.id === activeShape.id ? 'shape-tab shape-tab--active' : 'shape-tab'}
                  onClick={() => setActiveId(shape.id)}
                >
                  <Icon size={22} strokeWidth={2.3} />
                  <span>{shape.shortName}</span>
                </button>
              )
            })}
          </div>

          <div className="fact-box">
            <div className="height-control">
              <label htmlFor="shape-height">
                <span>調較高度</span>
                <strong>{heightLabel}%</strong>
              </label>
              <input
                id="shape-height"
                type="range"
                min="70"
                max="150"
                step="5"
                value={heightLabel}
                onChange={(event) => updateHeight(Number(event.target.value) / 100)}
                aria-label={`${displayName} 高度`}
              />
              <div className="slider-scale" aria-hidden="true">
                <span>矮</span>
                <span>高</span>
              </div>
            </div>
            {canChangeCorners && (
              <div className="corner-picker" aria-label={`${activeShape.name} 角數選擇`}>
                <span>揀底面角數</span>
                <div>
                  {[3, 4, 5, 6, 7].map((corners) => (
                    <button
                      type="button"
                      key={corners}
                      className={corners === activeCorners ? 'corner-button corner-button--active' : 'corner-button'}
                      onClick={() => updateCorners(corners)}
                    >
                      {corners}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <h2>{displayName} 有咩特徵？</h2>
            <ul>
              {dynamicFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <p className="look-question">{activeShape.prompt}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
