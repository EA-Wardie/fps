<template>
  <div>
    <game-renderer></game-renderer>
    <game-menu id="gameMenu" v-if="false"></game-menu>
  </div>
</template>

<script>
import GameRenderer from "@/framework/GameRenderer";
import GameMenu from "@/framework/GameMenu";

export default {
  name: "App",
  components: { GameRenderer, GameMenu },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#gameMenu {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 10px;
  border-radius: 10px;
}
</style>
