import { proxy } from 'valtio'

export type State = {
  intro: boolean
  color: string
  isLogoTexture: boolean
  isFullTexture: boolean
  logoDecal: string
  fullDecal: string
  isDownload: boolean
}

const state = proxy<State>({
  intro: true,
  color: '#0E172A',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  isDownload: false,
})

export default state
