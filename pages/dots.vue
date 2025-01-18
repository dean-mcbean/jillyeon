<template>
  <div class="base-div">
    <canvas
      ref="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="handleCanvasClick"
      @contextmenu="handleCanvasClick"
    />
    <div
      class="button"
      :style="{ backgroundColor: isPaused ? '#f00' : '#0f0', color: isPaused ? '#fff' : '#000' }"
      @click="togglePaused"
    >
      {{ isPaused ? 'Play' : 'Pause' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const gridWidth = 40
const gridHeight = 40
const cellSize = 10

const grid = ref(new Array(gridWidth).fill(null).map(() => new Array(gridHeight).fill(0)))
const isPaused = ref(false)
const canvasWidth = gridWidth * cellSize
const canvasHeight = gridHeight * cellSize
let worker: Worker

const togglePaused = () => {
  isPaused.value = !isPaused.value
}

const setDot = (i: number, j: number, val: number) => {
  const currentVal = grid.value[i][j]
  if (currentVal === val) {
    grid.value[i][j] = 0
  }
  else {
    grid.value[i][j] = val
  }
}

const drawGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      if (grid.value[i][j] === 1) {
        ctx.fillStyle = '#008'
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
      } else if (grid.value[i][j] === 2) {
        ctx.fillStyle = '#800'
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
      }
    }
  }
}

const handleCanvasClick = (event: MouseEvent) => {
  const canvas = event.target as HTMLCanvasElement
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const i = Math.floor(x / cellSize)
  const j = Math.floor(y / cellSize)
  // if left click, toggle between 1 and 0, if right click toggle between 2 and 0
  setDot(i, j, event.button === 0 ? 1 : 2)
  const ctx = canvas.getContext('2d')
  if (ctx) {
    drawGrid(ctx)
  }
  event.preventDefault()
}

onMounted(() => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas?.getContext('2d')

  if (ctx) {
    drawGrid(ctx)

    worker = new Worker(new URL('@/assets/gameWorker.js', import.meta.url))
    worker.onmessage = (e) => {
      grid.value = e.data
      drawGrid(ctx)
    }

    const interval = setInterval(() => {
      if (!isPaused.value) {
        worker.postMessage(JSON.stringify({ grid: grid.value, gridWidth, gridHeight }))
      }
    }, 100)

    onUnmounted(() => {
      clearInterval(interval)
      worker.terminate()
    })
  }
})
</script>

<style lang="scss" scoped>
.base-div {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  text-align: center;
}
</style>
