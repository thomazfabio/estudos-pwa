<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          <slot name="title"></slot>
        </v-card-title>
        <v-card-text class="text-justify" ><slot name="text"></slot></v-card-text>
        <v-card-actions>
          <slot name="btn1"></slot>
          <v-spacer></v-spacer>
          <slot name="btn2"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  name: "ModalCardAccount",
  data() {
    return {
      dialog: true,
    };
  },
};
</script>