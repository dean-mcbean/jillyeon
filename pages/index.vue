<template>
  <div class="base-div">
    <div
      class="left-section"
      :class="{ active: activeSide == 'left' }"
      @mouseenter="() => activateSide('left')"
    >
      <h1>JOYPEA</h1>
      <h1 class="h1">
        JOYPEA
      </h1>
      <h1 class="h2">
        JOYPEA
      </h1>
      <div
        class="skyline"
      >
        <img
          :src="'/skyline.png'"
          alt="skyline"
        >
        <img
          src="/skyline-reverse.png"
          alt="skyline"
        >
        <img
          :src="'/skyline.png'"
          alt="skyline"
        >
        <img
          src="/skyline-reverse.png"
          alt="skyline"
        >
      </div>
      <img
        src="/moon.png"
        alt="skyline"
        class="moon"
      >
      <div class="gradient-overlay" />
    </div>
    <div
      class="right-section"
      :class="{ active: activeSide == 'right' }"
      @mouseenter="() => activateSide('right')"
    >
      <div class="menu">
        <div class="list">
          <div
            v-for="page in pages"
            :key="page.title"
            class="list-item"
            :to="page.to"
            @click="() => $router.push(page.to)"
          >
            <div class="image-parent">
              <img
                :src="page.image"
                alt="page.title"
                class="image"
              >
              <img
                src="/frame.png"
                alt="page.title"
                class="frame"
              >
            </div><div class="title">{{ page.title }}</div>
          </div>
        </div>
        <div class="gradient-overlay" />
      </div>
    </div>
  </div>
</template>

<script setup>
const activeSide = ref(null)
const activateSide = (side) => {
  activeSide.value = side
}

const pages = [
  {
    title: 'Jillyeon',
    to: '/jillyeon',
    image: '/jillyeon-icon.png',
  },
  {
    title: 'GOF Dots',
    to: '/dots',
    image: '/dots-icon.png',
  },
]
</script>

<style lang="scss" scoped>
.base-div {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: stretch;
  position: relative;
  background-color: rgb(255, 247, 219);
}
.right-section {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  transition: width 0.5s ease-in-out;
  height: 100%;
  position: relative;
  font-family: "Noto Serif", serif;
  text-transform: uppercase;

  .image-parent {
    position: relative;
    width: 200px;
    height: 200px;
    margin-right: 16px;
    background-color: rgb(255, 247, 219);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .frame {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0.8;
    }

    .image {
      position: absolute;
      top: 24px;
      left: 26px;
      width: calc(100% - 50px);
      height: calc(100% - 50px);
      background-color: #1f1f1f;
      border-radius: 15px;
      filter: grayscale(1) sepia(0.4);
      opacity: 0.9;
    }
  }

  .title {
    border-bottom: 1px solid #1f1f1fCC;
    flex-grow: 1;
    padding-bottom: 8px;
  }

  .menu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    font-size: 24px;
    position: relative;
    color: #1f1f1f;
    transition: font-size 0.5s ease-in-out;
    display: none;

    .list {
      margin: 8px;
      width: 80%;
      max-width: 800px;
      background-color: transparent;
      border-radius: 8px;
      overflow: hidden;
      z-index: 2;
    }

    .list-item {
      transition: background-color 0.5s ease-in-out;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .gradient-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 0.5s ease-in-out;
    background: linear-gradient(90deg, rgba(255, 247, 219, 1) 5%, rgba(255, 247, 219, 0.5) 100%);
    opacity: 0.8;
  }

  &.active {
    width: 60%;
    .gradient-overlay {
      opacity: 0;
    }
    .menu {
      font-size: 40px;
    }
  }
}
.left-section {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: #1f1f1f;
  height: 100%;
  transition: width 0.5s ease-in-out, min-width 0.5s ease-in-out;
  position: relative;
  overflow: hidden;
  min-width: 600px;

  img {
    filter: invert(1) sepia(1);
    mix-blend-mode: lighten;
    opacity: 0.3;
    transition: opacity 0.5s ease-in-out;
  }

  .skyline {
    width: 100%;
    height: 160px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    mix-blend-mode: lighten;
    transition: opacity 0.5s ease-in-out, height 0.5s ease-in-out;
    display: flex;

    > img {
      height: 100%;
      width: auto;
    }
  }

  .moon {
    width: 80%;
    height: auto;
    position: absolute;
    top: 5%;
    left: 5%;
    z-index: 1;
    transform: translate(-50%, -50%) scale(0.8);
    transition: top 0.5s ease-in-out, opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }

  .gradient-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 0.5s ease-in-out;
    background: linear-gradient(-90deg, #1f1f1f 5%, #1f1f1fB0 95%);
    opacity: 1;
    z-index: 3;
  }

  &.active {
    width: 60%;
    min-width: 800px;
    .gradient-overlay {
      opacity: 0;
    }
    img {
      opacity: 0.8;
    }
    .moon {
      top: 50%;
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.1;
    }
    .skyline {
      height: 100px;
    }
    h1 {
      letter-spacing: 16px;
      font-size: 160px;
      top: 50%;
      margin-left: 0;
      transform: translate(-50%, -50%) rotate(0deg);

      &.h1 {
        transform: translate(-50%, -50%) rotate(0deg) translate(0, -160px);
        opacity: 0.1;
        z-index: 1;
      }

      &.h2 {
        transform: translate(-50%, -50%) rotate(0deg) translate(0, 160px);
        opacity: 0.5;
        z-index: 1;
      }
    }
  }
  h1 {
    font-size: 400px;
    font-weight: 900;
    color: rgb(236, 229, 167);
    letter-spacing: -64px;
    transition: letter-spacing 0.5s ease-in-out, font-size 0.5s ease-in-out, margin-left 0.5s ease-in-out, transform 0.5s ease-in-out, top 0.5s ease-in-out;
    position: absolute;
    top: 45%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(-20deg);

    &.h1 {
      transform: translate(-50%, -50%) rotate(-20deg) translate(0, -20px);
      opacity: 0.1;
      z-index: 1;
    }
    &.h2 {
      transform: translate(-50%, -50%) rotate(-20deg) translate(0, 20px);
      opacity: 0.5;
      z-index: 1;
    }
  }
}
</style>
