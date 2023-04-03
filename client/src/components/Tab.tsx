import { FC } from 'react'
import { useSnapshot } from 'valtio'
import { TabItem } from '../config/constants'

import state from '../store'

type TabProps<T extends string> = {
  tab: TabItem<T>
  isFilterTab?: boolean
  isActiveTab?: boolean
  onClick: () => void
}

const Tab = <T extends string>({
  tab,
  isFilterTab,
  isActiveTab,
  onClick,
}: TabProps<T>) => {
  const snap = useSnapshot(state)
  const activeStyles =
    isFilterTab && isActiveTab
      ? {
          backgroundColor: snap.color,
          opacity: 1,
        }
      : {
          backgroundColor: 'transparent',
          opacity: 0.5,
        }

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'
      }`}
      style={activeStyles}
      onClick={onClick}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${
          isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'
        }`}
      />
    </div>
  )
}

export default Tab
