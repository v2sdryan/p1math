import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  categoryHints,
  categoryIcons,
  categoryLabels,
  sortingShapes,
  type Shape,
  type ShapeCategory,
} from '../data/shapes'
import { ShapePreview } from './ShapePreview'

type Placements = Record<string, ShapeCategory>

const categories: ShapeCategory[] = ['prism', 'pyramid', 'sphere', 'none']

function DraggableShape({ shape, disabled = false }: { shape: Shape; disabled?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: shape.id,
    disabled,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.35 : 1,
  }

  return (
    <button
      type="button"
      ref={setNodeRef}
      className={`shape-token ${disabled ? 'shape-token--placed' : ''}`}
      style={style}
      {...listeners}
      {...attributes}
      aria-label={`拖拉 ${shape.name}`}
    >
      <ShapePreview shape={shape} />
    </button>
  )
}

function DropZone({ category, children }: { category: ShapeCategory; children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({ id: category })
  const Icon = categoryIcons[category]

  return (
    <div ref={setNodeRef} className={`drop-zone ${isOver ? 'drop-zone--over' : ''}`}>
      <div className="drop-zone__head">
        <Icon size={24} strokeWidth={2.3} />
        <div>
          <h3>{categoryLabels[category]}</h3>
          <p>{categoryHints[category]}</p>
        </div>
      </div>
      <div className="drop-zone__items">{children}</div>
    </div>
  )
}

export function SortingGame() {
  const [placements, setPlacements] = useState<Placements>({})
  const [activeId, setActiveId] = useState<string | null>(null)
  const [message, setMessage] = useState('拖拉上面嘅立體圖形，放入正確分類框。')
  const activeShape = sortingShapes.find((shape) => shape.id === activeId)
  const remainingShapes = sortingShapes.filter((shape) => !placements[shape.id])
  const placedByCategory = categories.reduce(
    (groups, category) => ({
      ...groups,
      [category]: sortingShapes.filter((shape) => placements[shape.id] === category),
    }),
    {} as Record<ShapeCategory, Shape[]>,
  )
  const completed = Object.keys(placements).length === sortingShapes.length

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const shape = sortingShapes.find((item) => item.id === event.active.id)
    const category = event.over?.id as ShapeCategory | undefined
    setActiveId(null)

    if (!shape || !category) {
      setMessage('未放入分類框，再試一次。')
      return
    }

    if (shape.category === category) {
      setPlacements((current) => ({ ...current, [shape.id]: category }))
      setMessage(`答啱！${shape.name} 放入「${categoryLabels[category]}」。`)
      return
    }

    setMessage(`再睇清楚：${shape.name} ${shape.category === 'none' ? '唔屬於角柱、角錐或球體。' : `應該有「${categoryLabels[shape.category]}」嘅特徵。`}`)
  }

  function resetGame() {
    setPlacements({})
    setMessage('重新開始！拖拉上面嘅立體圖形，放入正確分類框。')
  }

  return (
    <section className="practice-section" id="practice">
      <div className="section-heading section-heading--compact">
        <div>
          <h2>分類小挑戰</h2>
          <p>留意：圓柱有教過，但呢題冇「圓柱」分類，所以要諗吓係咪「全部都不是」。</p>
        </div>
        <button type="button" className="secondary-button" onClick={resetGame}>
          <RotateCcw size={19} />
          再玩一次
        </button>
      </div>

      <div className="practice-workspace">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="shape-bank" aria-label="可拖拉立體圖形">
            {remainingShapes.map((shape) => (
              <DraggableShape key={shape.id} shape={shape} />
            ))}
          </div>

          <div className="feedback-line" aria-live="polite">
            {completed ? '全部完成，好叻！可以按「再玩一次」挑戰自己。' : message}
          </div>

          <div className="drop-grid">
            {categories.map((category) => (
              <DropZone key={category} category={category}>
                {placedByCategory[category].map((shape) => (
                  <DraggableShape key={shape.id} shape={shape} disabled />
                ))}
              </DropZone>
            ))}
          </div>

          <DragOverlay>{activeShape ? <DraggableShape shape={activeShape} /> : null}</DragOverlay>
        </DndContext>
      </div>
    </section>
  )
}
