import {
  ai,
  download,
  fileIcon,
  logoShirt,
  stylishShirt,
  swatch,
} from '../assets'
import { State } from '../store'

/* ----------------------------------- Tab ---------------------------------- */

export enum EditorName {
  COLOR_PICKER = 'colorPicker',
  FILE_PICKER = 'filePicker',
  AI_PICKER = 'aiPicker',
}

export type FilterName = keyof Pick<State, 'isLogoTexture' | 'isFullTexture'>

export type TabItem<T extends string> = {
  name: T
  icon: string
}

export const EditorMenu: TabItem<EditorName>[] = [
  {
    name: EditorName.COLOR_PICKER,
    icon: swatch,
  },
  {
    name: EditorName.FILE_PICKER,
    icon: fileIcon,
  },
  {
    name: EditorName.AI_PICKER,
    icon: ai,
  },
]

export const FilterMenu: TabItem<FilterName>[] = [
  {
    name: 'isLogoTexture',
    icon: logoShirt,
  },
  {
    name: 'isFullTexture',
    icon: stylishShirt,
  },
]

/* ----------------------------------- Decal ----------------------------------- */

export type DecalType = {
  logo: DecalTypeProperty
  full: DecalTypeProperty
}

type DecalTypeProperty = {
  stateProperty: keyof Pick<State, 'logoDecal' | 'fullDecal'>
  filterTab: FilterName
}

export const DecalTypes: DecalType = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'isLogoTexture',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'isFullTexture',
  },
}
