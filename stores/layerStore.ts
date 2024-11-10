import { defineStore } from 'pinia'

export interface Tileset {
  id: string
  type: string
  unit?: string
}

export interface Layer {
  id: string
  display_name: string
  assetTag: string
  tilesets: Tileset[]
  legend: string
  visible: boolean
  helpFileName: string
  type: string
  layerType: string
  icon: string
}

export const useLayers = defineStore('layers', () => {
  const layers = ref<Layer[]>([])
  const setLayers = (newLayers: Layer[]) => {
    layers.value = newLayers
  }
  const addLayer = (newLayer: Layer) => {
    layers.value = [...layers.value, newLayer]
  }
  // must export EVERYTHING created, or app will break
  return { layers, setLayers, addLayer }
})
