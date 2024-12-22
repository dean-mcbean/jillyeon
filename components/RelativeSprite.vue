<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div
    ref="spriteRef"
    class="sprite"
    :class="{ animate: props.scaryAnimation, canPoke: props.onPoke }"
    :style="{
      position: 'absolute',
      left: props.x + '%',
      top: props.y + '%',
    }"
    @click="onClick"
  >
    <div class="inner-sprite">
      <div
        ref="clickEffect"
        class="click-effect"
      >
        <div
          class="mouse-tracking"
          :style="mouseTrackingStyle"
        >
          <img
            :src="props.src"
            :height="props.height"
          >
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  x: number
  y: number
  height: number
  src: string
  scaryAnimation?: boolean
  trackMouse?: boolean
  onPoke?: string
}>()

const spriteRef = ref<HTMLElement | null>(null)
const clickEffect = ref<HTMLElement | null>(null)
const blockingInput = ref(false)
const effectActive = ref(false)
const mouseTrackingStyle = ref<{ transform?: string }>({})

// get mouse position relative to this sprite
const getMousePosition = (event: MouseEvent) => {
  const x = event.pageX - (props.x - 35) * 1.8
  const y = event.pageY - props.y
  return { x, y }
}

// get the angle between the mouse and the center of this sprite
const getAngle = (event: MouseEvent) => {
  const { x, y } = getMousePosition(event)
  const centerX = document.body.offsetLeft + document.body.offsetWidth / 2
  const centerY = document.body.offsetTop + document.body.offsetHeight / 2 - 150
  const angle = Math.atan2(y - centerY, x - centerX)
  return angle
}

// get the distance between the mouse and the center of this sprite
const getDistance = (event: MouseEvent) => {
  const { x, y } = getMousePosition(event)
  const centerX = spriteRef.value!.offsetLeft + spriteRef.value!.offsetWidth / 2
  const centerY = spriteRef.value!.offsetTop + spriteRef.value!.offsetHeight / 2
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
  return distance
}

// get the scale of this sprite based on the distance between the mouse and the center
const getScale = (event: MouseEvent) => {
  const distance = getDistance(event)
  const scale = Math.max(1.3 - distance / 100, 0.95)
  return scale
}

// get the translateX of this sprite based on the angle between the mouse and the center
const getTranslateX = (event: MouseEvent) => {
  const angle = getAngle(event)
  const distance = getDistance(event)
  const maxDistance = Math.max(document.body.offsetWidth, document.body.offsetHeight)
  const translateX = Math.cos(angle) * distance / maxDistance * 30
  return translateX
}

// get the translateY of this sprite based on the angle between the mouse and the center
const getTranslateY = (event: MouseEvent) => {
  const angle = getAngle(event)
  const distance = getDistance(event)
  const maxDistance = Math.max(document.body.offsetWidth, document.body.offsetHeight)
  const translateY = Math.sin(angle) * distance / maxDistance * 30
  return translateY
}

// track mouse movement
const onMouseMove = (event: MouseEvent) => {
  if (blockingInput.value) return
  const scale = getScale(event)
  const translateX = getTranslateX(event)
  const translateY = getTranslateY(event)
  mouseTrackingStyle.value.transform = `scale(${scale}) translateX(${translateX}px) translateY(${translateY}px)`
  blockingInput.value = true
  setTimeout(() => {
    blockingInput.value = false
  }, Math.random() * 1)
}
onMounted(() => {
  if (props.trackMouse) window.addEventListener('mousemove', onMouseMove)
})
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
})

const onClick = (e: MouseEvent) => {
  if (props.onPoke) {
    switch (props.onPoke) {
      case 'hide': {
        if (effectActive.value) {
          clickEffect.value!.style.transform = 'scale(1)'
        }
        else {
          clickEffect.value!.style.transform = 'scale(0)'
        }
        break
      }
      case 'shrink':{
        if (effectActive.value) {
          clickEffect.value!.style.transform = 'scale(1)'
        }
        else {
          clickEffect.value!.style.transform = 'scale(0.5)'
        }
        break
      }
    }
    effectActive.value = !effectActive.value
  }
  e.stopPropagation()
}

const wobbleRate = (Math.random() * 0.5 + 0.5) * 10 + 5 + 's'
const scaleRate = (Math.random() * 0.5 + 0.5) * 10 + 5 + 's'
const translateYRate = (Math.random() * 0.5 + 0.5) * 10 + 5 + 's'
const translateXRate = (Math.random() * 0.5 + 0.5) * 10 + 5 + 's'

const animationOffset = Math.random() * 10 + 's'
</script>

<style scoped>
@keyframes wobble {
  0% {
    transform: rotate(-1deg);
  }
  50% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(-1deg);
  }
}
@keyframes scale {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0.95);
  }
}
@keyframes translateX {
  0% {
    translate: -2px;
  }
  50% {
    translate: 2px;
  }
  100% {
    translate: -2px;
  }
}
@keyframes translateY {
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(-2px);
  }
}
.sprite {
  background-color: transparent;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}
.sprite.canPoke {
  pointer-events: auto;
  cursor: pointer;
}
.inner-sprite {
  position: relative;
}
.sprite.animate {
  animation: scale v-bind(scaleRate) infinite, translateX v-bind(translateXRate) infinite;
  animation-delay: v-bind(animationOffset);
  translate: -2px;
  transform: scale(0.95);
}
.sprite.animate .inner-sprite {
  animation:  translateY v-bind(translateYRate) infinite;
  transform: translateY(-2px);
}
.sprite.animate img {
  animation: wobble v-bind(wobbleRate) infinite;
  transform: rotate(-1deg);
}
.click-effect {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.2s;
}
</style>
