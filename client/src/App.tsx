import { useSnapshot } from 'valtio'
import Canvas from './canvas'
import Customizer from './pages/Customizer'
import Home from './pages/Home'
import state from './store'

function App() {
  const snap = useSnapshot(state)
  return (
    <main
      style={{
        backgroundColor: snap.color,
      }}
      className='app transition-all ease-in'
    >
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default App
