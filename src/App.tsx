import './App.css'
import { LessonPanel } from './components/LessonPanel'
import { SortingGame } from './components/SortingGame'
import { lessonShapes } from './data/shapes'

function App() {
  return (
    <main>
      <nav className="top-nav" aria-label="主要導覽">
        <a className="brand" href="#lesson">
          P1 Math 3D
        </a>
        <div>
          <a href="#lesson">認識圖形</a>
          <a href="#practice">分類練習</a>
        </div>
      </nav>
      <LessonPanel shapes={lessonShapes} />
      <SortingGame />
    </main>
  )
}

export default App
