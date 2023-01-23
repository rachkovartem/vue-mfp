<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import nutritionApi from "@/api/nutrition-api";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "App",
  methods: {
    ...mapMutations({
      setNutrients: "dishList/setNutrients",
    }),
  },
  async created() {
    nutritionApi
      .getNutrients()
      .then((data) => {
        const nutrients = data.reduce(
          (acc: Record<string, unknown>, value: { id: string }) => {
            acc[value.id] = value;
            return acc;
          },
          {}
        );
        this.setNutrients(nutrients);
      })
      .catch(console.log);
  },
});
</script>
