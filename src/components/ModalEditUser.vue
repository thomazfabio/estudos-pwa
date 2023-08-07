<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-container>
          <v-card-title class="primary--text">Alterar {{ dataUser.name }}</v-card-title>
          <v-card-text class="pb-0" v-if="dataUser.name == 'nome'">
            <v-row>
              <v-col>
                <v-text-field label="Seu nome*" v-model="dataEdited.firstName" :placeholder="dataUser.value.split(' ')[0]"
                  outlined dense required></v-text-field>
                <v-text-field label="Seu sobrenome*" v-model="dataEdited.lastName"
                  :placeholder="dataUser.value.split(' ').slice(1).join(' ')" outlined dense required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text class="pb-0" v-if="dataUser.name == 'telefone'">
            <v-row>
              <v-col>
                <v-text-field v-model="dataEdited.cellPhone" name="input-cell-phone" label="Seu telefone celular*"
                  v-mask="'+55 (##) 9 ####-####'" placeholder="+55 (00) 9 0000-0000" outlined dense
                  required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text class="pb-0" v-if="dataUser.name == 'email'">
            <v-row>
              <v-col>
                <p>O email <strong>não pode ser alterado</strong></p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>
        <v-card-actions class="pt-0 pr-5">
          <v-spacer></v-spacer>
          <v-card-text v-if="isLoadingSuccess">
            atualizando...
            <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
          </v-card-text>
          <div v-else>
            <v-btn color="personal_action_2 darken-1" text @click="$emit('closeModal')">
              Fechar
            </v-btn>
            <v-btn v-if="dataUser.name != 'email'" color="personal_action_1 darken-1" text
              @click="$emit('updateUser', dataEdited)">
              Salvar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
//importado como diretiva local
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
  data: () => ({
    dialog: true,
    isLoading: false,
    isLoadingSuccess: false,
    dataEdited: {
      firstName: null,
      lastName: null,
      cellPhone: null,
      email: null,
    },
    rules: [],
  }),
  props: {
    dataUser: Object,
  },

  computed: {
    getUpdateUserPerfilStatus: function () {
      let status = this.$store.getters.updateUserPerfilStatus;
      return status;
    },
  },
  watch: {
    getUpdateUserPerfilStatus: function (val) {
      if (val == "success") {
        this.isLoading = false;
        this.isLoadingSuccess = true;
        this.$store.dispatch("setStatusUpdateUserProfile", null);
        setTimeout(() => {
          this.$emit("closeModal");
        }, 1000);
      }
    },
  },
};
</script>