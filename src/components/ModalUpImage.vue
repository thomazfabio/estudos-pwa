<template>
  <v-dialog v-model="dialog" persistent :width="width">
    <v-card class="pa-2" v-if="isLoading">
      <v-card-title class="primary--text"> Carregando Imagem... </v-card-title>
      <v-progress-linear
        indeterminate
        color="yellow darken-2"
      ></v-progress-linear>
    </v-card>

    <v-card class="pa-2" v-if="isLoadSucess">
      <v-card-title class="green--text">
        Sucesso
        <v-icon large color="green darken-2"> mdi-check</v-icon>
      </v-card-title>
    </v-card>

    <v-card v-if="isAvatarOn">
      <v-container class="">
        <v-row class="pa-2">
          <v-btn block depressed color="personal_action_2" style="color: white;">
            <v-icon>mdi-camera</v-icon> Camera</v-btn
          >
        </v-row>
        <v-row class="pa-2">
          <v-btn block depressed color="personal_action_1" style="color: white;" @click="showCropper = true">
            <v-icon>mdi-upload</v-icon> Upload</v-btn
          ></v-row
        >
        <v-row class="pa-2">
          <v-btn block depressed color="error" style="color: white;" @click="$emit('closeModal')">
            <v-icon>mdi-cancel</v-icon> Cancelar</v-btn
          ></v-row
        >
      </v-container>

      <imgCropper
        v-model="showCropper"
        :labels="{ submit: 'OK', cancel: 'CANCELAR' }"
        :upload-handler="imgUpFirebase"
      >
      </imgCropper>
    </v-card>
  </v-dialog>
</template>

<script>
import imgCropper from "vue-avatar-cropper";
export default {
  components: {
    imgCropper,
  },
  name: "ModalUpImage",

  props: {
    width: String,
    refImage: String,
    nameImage: String,
    typeImage: String,
    isAvatar: Boolean,
  },

  data() {
    return {
      showCropper: false,
      dialog: true,
      isAvatarOn: this.isAvatar,
      isLoading: false,
      isLoadSucess: false,
      isLoadError: false,
    };
  },
  computed: {
    getuploadImageStatus: function () {
      let msg = this.$store.getters.uploadImageStatus;
      return msg;
    },
  },
  methods: {
    cancelUpImg: function () {
      return (this.dialog = false);
    },
    imgUpFirebase: function (data) {
      data.getCroppedCanvas().toBlob(async (blob) => {
        let file = await blob;
        let imgUp = {
          RefImg: this.refImage,
          nameImg: this.nameImage,
          img: file,
        };
        this.$store.dispatch("upImgFirebase", imgUp);
      }, "image/" + this.typeImage);
    },
  },

  //monitora a mudança de status do uploading
  watch: {
    getuploadImageStatus: function (Newdata, oldData) {
      if (Newdata === null) {
        console.log(Newdata);
      }
      if (Newdata === "uploading") {
        console.log(Newdata);
        this.isLoading = true;
        this.isAvatarOn = false;
      }
      if (Newdata === "success") {
        console.log(Newdata);
        this.$store.dispatch("setStatusUploadImage", null);
        this.isLoading = false;
        this.isLoadSucess = true;
        setTimeout(() => {
          this.$emit("closeModal");
        }, 1000);
      }
      if (Newdata === "error") {
        console.log(Newdata);
        this.$emit("closeModal");
      }
    },
  },
};
</script>