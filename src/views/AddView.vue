<template>
  <div class="add-form">
    <v-autocomplete
      class="add-form__autocomplete"
      filled
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      color="gray"
      hide-no-data
      hide-selected
      item-text="showedDescription"
      placeholder="Start typing to Search"
      return-object
    ></v-autocomplete>
  </div>
</template>

<script>
import nutritionApi from "@/api/nutrition-api";
import debounce from "lodash/debounce";
import { mapState } from "vuex";

export default {
  name: "add-view",
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    items() {
      return this.entries.map((entry) => {
        const showedDescription =
          entry.description.length > this.descriptionLimit
            ? entry.description.slice(0, this.descriptionLimit) + "..."
            : entry.description;

        return Object.assign({}, entry, { showedDescription });
      });
    },
    ...mapState({
      nutrients: (state) => state.dishList.nutrients,
    }),
  },
  created() {
    this.debouncedSearchFood = debounce(
      async (value) => {
        try {
          if (this.isLoading) return;

          this.isLoading = true;

          if (!value) return;
          const result = await nutritionApi.searchFood({ query: value });
          this.entries = result.items;
        } catch (err) {
          console.log(err);
        } finally {
          this.isLoading = false;
        }
      },
      1000,
      {
        leading: false,
      }
    );
  },
  watch: {
    search(value) {
      this.debouncedSearchFood(value);
    },
    async model(value) {
      if (value) {
        const result = await nutritionApi.getFood(value.id);
        console.log(result.data);
      }
    },
    nutrients(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
.add-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 12px;
}
.add-form__autocomplete {
  width: 100%;
}
</style>
