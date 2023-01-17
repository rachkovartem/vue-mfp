<template>
  <v-form class="form" v-model="isValid" @submit.prevent="submit">
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    ></v-text-field>
    <v-btn class="form__button" block elevation="2" type="submit">Login</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "signin-form",
  data: () => ({
    isAuthenticated: false,
    isValid: true,
    email: "",
    password: "",
  }),
  methods: {
    async submit() {
      this.isAuthenticated = true;
    },
  },
  watch: {
    isAuthenticated: {
      handler: function (isAuthenticated) {
        this.$router.push(isAuthenticated ? "/home" : "/signin");
      },
    },
  },
});
</script>

<style scoped>
.form {
  padding: 16px;
}
.form__button {
  margin-top: 20px;
}
</style>
