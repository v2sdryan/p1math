import { useState } from 'react'
import './App.css'
import { LessonPanel } from './components/LessonPanel'
import { SortingGame } from './components/SortingGame'
import { lessonShapes } from './data/shapes'

type AppPage = 'lesson' | 'practice'

function App() {
  const [activePage, setActivePage] = useState<AppPage>('lesson')

  return (
    <main className="app-shell">
      <nav className="top-nav" aria-label="主要導覽">
        <button type="button" className="brand" onClick={() => setActivePage('lesson')}>
          P1 Math 3D
        </button>
        <div>
          <button
            type="button"
            className={activePage === 'lesson' ? 'nav-tab nav-tab--active' : 'nav-tab'}
            onClick={() => setActivePage('lesson')}
          >
            認識圖形
          </button>
          <button
            type="button"
            className={activePage === 'practice' ? 'nav-tab nav-tab--active' : 'nav-tab'}
            onClick={() => setActivePage('practice')}
          >
            分類練習
          </button>
        </div>
      </nav>
      <div className={activePage === 'lesson' ? 'app-page app-page--active' : 'app-page'} hidden={activePage !== 'lesson'}>
        <LessonPanel shapes={lessonShapes} onStartPractice={() => setActivePage('practice')} />
      </div>
      <div
        className={activePage === 'practice' ? 'app-page app-page--active' : 'app-page'}
        hidden={activePage !== 'practice'}
      >
        <SortingGame />
      </div>
    </main>
  )
}

export default App
