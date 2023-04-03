import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import { CustomButton } from '../components'
import { fadeAnimation } from '../config/motion'
import EditorTabs from '../components/EditorTabs'
import FilterTabs from '../components/FilterTabs'

const Customizer = () => {
  const snap = useSnapshot(state)

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <EditorTabs />
          <FilterTabs />
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='Go Back'
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              onClick={() => {
                setTimeout(() => {
                  state.intro = true
                }, 100)
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
