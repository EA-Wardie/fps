<template>
  <div class="menu">
    <div class="button mb">
      <div class="button-title">Sample Button</div>
      <small>Sample description for sample button.</small>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
};
</script>

<style scoped>
.menu {
  padding: 20px;
}

.button {
  outline: none;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 10px;
  padding: 10px;
  user-select: none;
  cursor: pointer;
}

.button:active {
  background-color: rgba(255, 255, 255, 0.1);
}

.button-title {
  font-weight: 700;
  margin-bottom: 5px;
}

.mb {
  margin-bottom: 20px;
}
</style>