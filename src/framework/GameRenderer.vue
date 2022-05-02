<template>
  <canvas id="canvasRenderer" ref="canvasRenderer"></canvas>
</template>

<script>
import GameInitializer from "@/framework/GameInitializer";

export default {
  name: "GameRenderer",
  mixins: [GameInitializer],
  mounted() {
    this.initGame(this.$refs.canvasRenderer);
  },
}
</script>

<style scoped>
#canvasRenderer {
  width: 100%;
  height: 100%;
}
</style>