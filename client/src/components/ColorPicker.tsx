import { BlockPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state)

  return (
    <div className='glassmorphism p-3 rounded-md'>
      <BlockPicker
        color={snap.color}
        triangle='hide'
        onChangeComplete={(color) => (state.color = color.hex)}
      />
    </div>
  )
}

export default ColorPicker
