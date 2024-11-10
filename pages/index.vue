<template>
  <div style="width: 100vw; height: 100vh; display: flex; align-items: center; background-color: rgba(var(--v-theme-primary), 0.1)">
    <div
      id="map"
      ref="map"
      class="map"
    />
    <v-slide-x-reverse-transition>
      <div
        v-show="!showSidebar"
        class="sidebar-untoggle-container"
      >
        <v-btn
          class="sidebar-toggle"
          @click="toggleSidebar"
        >
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
      </div>
    </v-slide-x-reverse-transition>
    <v-slide-x-reverse-transition>
      <v-sheet
        v-show="showSidebar"
        class="sidebar"
        :class="{ 'sidebar--closed': !showSidebar }"
      >
        <div
          class="sidebar-toggle-container"
        >
          <v-btn
            class="sidebar-toggle"
            @click="toggleSidebar"
          >
            <v-icon color="white">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="sidebar-content">
          <SidedrawerAccessForm />
          <SidedrawerCharts />
        </div>
      </v-sheet>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ref, onMounted } from 'vue'

export interface InitialViewState {
  latitude: number
  longitude: number
  zoom: number
  bearing: number
  pitch: number
  transitionDuration: string
}

const config = useRuntimeConfig()
const layerStore = useLayers()

const DEFAULT_MAP_CENTER = [172.6306, -43.532]
const DEFAULT_MAP_BEARING = 0
const DEFAULT_MAP_ZOOM = 12
const DEFAULT_MAP_PITCH = 0

mapboxgl.accessToken = config.public.MAPBOX_ACCESS_TOKEN

const currentViewState = ref<InitialViewState | null>(null)
const mapRef = ref<mapboxgl.Map | null>(null)
const showSidebar = ref(true)

onBeforeMount(async () => {
  const { data } = await useFetch<Layer>(
    `${config.public.BASE_API_URL}/access/layers`,
  )

  if (data.value) layerStore.addLayer(data.value)
})

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

// resize map on sidebar toggle
watch(showSidebar, (show) => {
  if (mapRef.value) {
    setTimeout(() => {
      mapRef.value.resize()
    }, 100)
  }
})

onMounted(async () => {
  await nextTick()

  // Initialize the map
  const INITIAL_VIEW_STATE: InitialViewState = {
    latitude: DEFAULT_MAP_CENTER[1],
    longitude: DEFAULT_MAP_CENTER[0],
    zoom: DEFAULT_MAP_ZOOM,
    bearing: DEFAULT_MAP_BEARING,
    pitch: DEFAULT_MAP_PITCH,
    transitionDuration: 'auto',
  }

  currentViewState.value = INITIAL_VIEW_STATE

  mapRef.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    projection: 'mercator',
    interactive: true,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch,
  })

  mapRef.value.jumpTo({
    center: [currentViewState.value.longitude, currentViewState.value.latitude],
    zoom: currentViewState.value.zoom,
    bearing: currentViewState.value.bearing,
    pitch: currentViewState.value.pitch,
  })
})

watch(layerStore.layers, (layers) => {
  console.log(`'foo': `, 'foo')
  usePrepareAndUpdateLayers(layers, mapRef.value as mapboxgl.Map)
})
</script>

<style lang="scss" scoped>
.sidebar-toggle-container {
  position: absolute;
  width: 0;
  height: 0;
  top: 50%;
  left: 0;
  z-index: 1000;
}
.sidebar-untoggle-container {
  position: absolute;
  width: 0;
  height: 0;
  top: 50%;
  right: 0;
  z-index: 90;
}
.sidebar-toggle {
  position: absolute;
  top: -32px;
  height: 64px;
  width: 32px;
  min-width: 32px;
  left: -32px;
  padding: 0;
  border-radius: 8px 0 0 8px;
  background-color: rgb(var(--v-theme-primary));
}
.map {
  flex-grow: 1;
  height: 100%;
  align-self: stretch;
}
.sidebar {
  max-width: 450px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  align-self: stretch;
  position: relative;
}
.sidebar-content {
  overflow: hidden;
  flex-grow: 1;
}
.sidebar--closed {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
</style>
