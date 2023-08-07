<template>
  <div id="spinner" class="text-center" v-if="isVisible">
    <div id="spinner" class="text-center" v-if="isVisible">
    <v-progress-circular
      :size="100"
      :width="5"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
  </div>
</template>
  
<script>
export default {
  name: "Spinner",
  data: () => ({
    visible: null,
  }),
  methods: {
    setVisible() {
      this.visible = this.$store.getters.isSpinnerVisible;
    },
  },
  created() {
    this.setVisible();
  },
  computed: {
    isVisible: function () {
      return this.$store.getters.isSpinnerVisible;
    },
  },
};
</script>

<style >
.v-progress-circular {
  margin: 1rem;
}

#spinner {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}
</style>
