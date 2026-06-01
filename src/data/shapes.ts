import type { ComponentType } from 'react'
import { Box, Circle, Cone, Cylinder, Sparkles, Triangle } from 'lucide-react'

export type ShapeKind =
  | 'triangular-prism'
  | 'rectangular-prism'
  | 'pentagonal-prism'
  | 'triangular-pyramid'
  | 'square-pyramid'
  | 'sphere'
  | 'cylinder'
  | 'cone'

export type ShapeCategory = 'prism' | 'pyramid' | 'sphere' | 'none'

export type Shape = {
  id: string
  name: string
  shortName: string
  kind: ShapeKind
  category: ShapeCategory
  color: string
  accent: string
  canRoll: 'yes' | 'sometimes' | 'no'
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  facts: string[]
  prompt: string
  pushResult: string
}

export const lessonShapes: Shape[] = [
  {
    id: 'prism',
    name: '角柱',
    shortName: '角柱',
    kind: 'triangular-prism',
    category: 'prism',
    color: '#33b7a4',
    accent: '#e7fbf6',
    canRoll: 'no',
    icon: Box,
    facts: ['有兩個一樣形狀嘅底面', '側面多數係長方形', '有邊、有角、有平面'],
    prompt: '搵吓兩個一樣嘅底面喺邊度？',
    pushResult: '角柱有平面同邊，推一推通常只會滑少少，唔容易滾動。',
  },
  {
    id: 'pyramid',
    name: '角錐',
    shortName: '角錐',
    kind: 'square-pyramid',
    category: 'pyramid',
    color: '#ff7a59',
    accent: '#fff0e9',
    canRoll: 'no',
    icon: Triangle,
    facts: ['有一個底面', '側面係三角形', '上面有一個尖頂'],
    prompt: '睇吓尖頂指住邊個方向？',
    pushResult: '角錐有尖頂同平面，推一推會搖吓或者跌側，但唔會順住滾。',
  },
  {
    id: 'sphere',
    name: '球體',
    shortName: '球體',
    kind: 'sphere',
    category: 'sphere',
    color: '#3b82f6',
    accent: '#eaf3ff',
    canRoll: 'yes',
    icon: Circle,
    facts: ['成個都圓圓滑滑', '冇角', '冇平面'],
    prompt: '用手指轉一轉，邊一面都咁圓。',
    pushResult: '球體圓圓滑滑，推一推就會好容易滾動。',
  },
  {
    id: 'cylinder',
    name: '圓柱',
    shortName: '圓柱',
    kind: 'cylinder',
    category: 'none',
    color: '#f5b82e',
    accent: '#fff8df',
    canRoll: 'sometimes',
    icon: Cylinder,
    facts: ['有兩個圓形平面', '有一個彎曲面', '橫放時可以滾動'],
    prompt: '轉去側邊，睇吓兩個圓形面。',
    pushResult: '圓柱橫放時會滾動；直立時就會企定定。',
  },
]

export const sortingShapes: Shape[] = [
  { ...lessonShapes[0], id: 'tri-prism', name: '三角柱', shortName: '三角柱', kind: 'triangular-prism' },
  { ...lessonShapes[0], id: 'box-prism', name: '長方體', shortName: '長方體', kind: 'rectangular-prism', color: '#20a88e' },
  { ...lessonShapes[0], id: 'pent-prism', name: '五角柱', shortName: '五角柱', kind: 'pentagonal-prism', color: '#53c7b7' },
  { ...lessonShapes[1], id: 'tri-pyramid', name: '三角錐', shortName: '三角錐', kind: 'triangular-pyramid' },
  { ...lessonShapes[1], id: 'square-pyramid', name: '四角錐', shortName: '四角錐', kind: 'square-pyramid', color: '#f46f8c' },
  { ...lessonShapes[2], id: 'ball', name: '球體', shortName: '球體', kind: 'sphere' },
  { ...lessonShapes[3], id: 'cylinder-sort', name: '圓柱', shortName: '圓柱', kind: 'cylinder' },
  {
    ...lessonShapes[3],
    id: 'cone',
    name: '圓錐',
    shortName: '圓錐',
    kind: 'cone',
    color: '#9b7bf4',
    accent: '#f3efff',
    icon: Cone,
    facts: ['有圓形底面', '有尖頂', '唔係角柱、角錐或球體'],
  },
]

export const categoryLabels: Record<ShapeCategory, string> = {
  prism: '角柱',
  pyramid: '角錐',
  sphere: '球體',
  none: '全部都不是',
}

export const categoryHints: Record<ShapeCategory, string> = {
  prism: '有兩個一樣底面',
  pyramid: '有一個尖頂',
  sphere: '圓圓滑滑',
  none: '唔屬於上面三類',
}

export const categoryIcons: Record<ShapeCategory, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  prism: Box,
  pyramid: Triangle,
  sphere: Circle,
  none: Sparkles,
}
