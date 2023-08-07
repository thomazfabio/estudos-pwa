<template>
  <div v-if="isLogged">
    <cardAccount />
  </div>
</template>

<script>
import cardAccount from "../components/CardAccount.vue";

export default {
  components: {
    cardAccount,
  },
  data: () => ({}),
  computed: {
    //esta função que esta sendo utilizada para renderizar ou não o template do app
    isLogged: function () {
      return (this.logged = this.$store.getters.currentUser);
    },
  },
};
</script>