import React from 'react'
import { motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import Tab from './Tab'
import state from '../store'
import { FilterMenu } from '../config/constants'
import { slideAnimation } from '../config/motion'
import { downloadCanvasToImage } from '../config/helpers'
import { download } from '../assets'

const FilterTabs = () => {
  const snap = useSnapshot(state)

  return (
    <motion.div className='filtertabs-container' {...slideAnimation('up')}>
      {FilterMenu.map((tab) => (
        <Tab
          key={tab.name}
          tab={tab}
          isFilterTab
          isActiveTab={snap[tab.name]}
          onClick={() => (state[tab.name] = !state[tab.name])}
        />
      ))}
      <button className='download-btn' onClick={downloadCanvasToImage}>
        <img
          src={download}
          alt='download_image'
          className='w-3/5 h-3/5 object-contain'
        />
      </button>
    </motion.div>
  )
}

export default FilterTabs
