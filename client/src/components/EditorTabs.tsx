import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import Tab from './Tab'
import AIPicker from './AIPicker'
import FilePicker from './FilePicker'
import ColorPicker from './ColorPicker'
import CustomButton from './CustomButton'
import state from '../store'
import { slideAnimation } from '../config/motion'
import {
  DecalType,
  DecalTypes,
  EditorMenu,
  EditorName,
} from '../config/constants'

const EditorTabs = () => {
  const snap = useSnapshot(state)
  const [activeEditorTab, setActiveEditorTab] = useState<EditorName | null>()
  const [files, setFiles] = useState<{
    file: File | undefined
    base64: string | undefined
  }>({
    file: undefined,
    base64: undefined,
  })

  useEffect(() => {
    return () => {
      setActiveEditorTab(null)
    }
  }, [])

  const handleDecal = (type: keyof DecalType) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = files.base64 ?? './threejs.png'

    if (!state[decalType.filterTab]) {
      state[decalType.filterTab] = !state[decalType.filterTab]
    }
    setActiveEditorTab(null)
    setFiles({
      file: undefined,
      base64: undefined,
    })
  }

  const onFileChanged = (file?: File, base64?: string) => {
    console.log({ base64 })
    setFiles({
      file,
      base64,
    })
  }

  const renderTabContent = () => {
    switch (activeEditorTab) {
      case EditorName.COLOR_PICKER:
        return <ColorPicker />
      case EditorName.FILE_PICKER:
        return (
          <FilePicker
            file={files.file}
            onChange={onFileChanged}
            footer={renderSetFileAsDecal()}
          />
        )
      case EditorName.AI_PICKER:
        return (
          <AIPicker
            base64Image={files.base64}
            onImageGenerated={(base64) => onFileChanged(undefined, base64)}
            footer={renderSetFileAsDecal()}
          />
        )
      default:
        return null
    }
  }

  const renderSetFileAsDecal = () => {
    return (
      <div className='flex flex-wrap flex-col gap-3'>
        <CustomButton
          type='filled'
          title='Set as Logo'
          customStyles='py-2 text-xs'
          onClick={() => handleDecal('logo')}
        />
        <CustomButton
          type='filled'
          title='Set as Full'
          customStyles='py-2 text-xs'
          onClick={() => handleDecal('full')}
        />
      </div>
    )
  }

  return (
    <motion.div
      key='custom'
      className='absolute top-0 left-0 z-10'
      {...slideAnimation('left')}
    >
      <div className='flex items-center min-h-screen'>
        <div className='editortabs-container tabs'>
          {EditorMenu.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isActiveTab
              onClick={() => {
                const result = tab.name !== activeEditorTab ? tab.name : null
                if (result) setActiveEditorTab(result)
              }}
            />
          ))}

          <motion.div
            key={activeEditorTab}
            {...slideAnimation('left')}
            className='absolute left-full ml-3'
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default EditorTabs
