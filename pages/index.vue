<template>
  <div class="base-div">
    <RelativeSprite
      :x="50"
      :y="50"
      :height="600"
      :scary-animation="true"
      src="./jill/base.png"
    >
      <RelativeSprite
        :x="55"
        :y="35"
        :height="120"
        :scary-animation="true"
        on-poke="shrink"
        src="./jill/eyes.png"
      >
        <RelativeSprite
          :x="24"
          :y="51"
          :height="24"
          :scary-animation="true"
          :track-mouse="true"
          on-poke="hide"
          src="./jill/left_pupil.png"
        />
        <RelativeSprite
          :x="76"
          :y="51"
          :height="24"
          :scary-animation="true"
          :track-mouse="true"
          on-poke="hide"
          src="./jill/right_pupil.png"
        />
      </RelativeSprite>
      <RelativeSprite
        :x="54"
        :y="50"
        :height="72"
        :scary-animation="true"
        on-poke="shrink"
        src="./jill/mouth.png"
      />
    </RelativeSprite>
    <div class="attribution">
      <img :src="'./jill/attribution.png'"><br>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.base-div {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #1f1f1f;
}
.attribution {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 240px;
  width: auto;
  color: #FFF8;
  text-align: right;
  letter-spacing: 3px;
  font-size: 12px;
  img {
    height: 100%;
  }
}
</style>
