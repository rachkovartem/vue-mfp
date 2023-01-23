<template>
  <v-tabs show-arrows center-active :value="indexOfValue" @change="updateValue">
    <v-tab class="tab" :key="tab.index" v-for="tab in tabs">
      <p class="tab__day">{{ tab.day.slice(0, 3) }}</p>
      <p class="tab__date">{{ tab.date }}</p></v-tab
    >
  </v-tabs>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("change-day", this.tabs[value].value);
    },
  },
  computed: {
    indexOfValue() {
      return this.tabs.findIndex((tab) => tab.value === this.value);
    },
    ...mapGetters({
      tabs: "dishList/tabs",
    }),
  },
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  flex-direction: column;
  .tab__day {
    margin: 0 0 5px;
  }
  .tab__date {
    margin: 0;
  }
}
</style>
