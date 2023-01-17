<template>
  <v-tabs show-arrows center-active :value="value" @input="updateModelValue">
    <v-tab class="tab" :key="tab.index" v-for="tab in tabs">
      <p class="tab__day">{{ tab.day.slice(0, 3) }}</p>
      <p class="tab__date">{{ tab.date }}</p></v-tab
    >
  </v-tabs>
</template>

<script>
import daysOfWeek from "@/utils/daysOfWeek";
import dayjs from "dayjs";

export default {
  props: {
    value: {
      type: Number,
    },
  },
  methods: {
    updateModelValue(event) {
      this.$emit("input", event.target.value);
    },
  },
  computed: {
    tabs() {
      return Array.from({ length: 15 }).map((_, index, array) => {
        const offset = index - array.length + 3;
        let date =
          offset < 0
            ? dayjs().subtract(Math.abs(offset), "day")
            : dayjs().add(offset, "day");
        return {
          key: index,
          value: date.format("DD-MM-YYYY"),
          date: date.date(),
          day: daysOfWeek(date.day()),
        };
      });
    },
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
