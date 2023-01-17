<template>
  <div class="wrapper">
    <dates-tabs v-model="selectedDate" />
    <v-progress-circular
      :rotate="90"
      :size="170"
      :width="15"
      :value="progressInPercents"
      color="primary"
    >
      <div>
        <p class="progress__text">Total calories</p>
        <p class="progress__text">{{ totalKcal }}</p>
      </div>
    </v-progress-circular>
  </div>
</template>

<script>
import DatesTabs from "@/components/DatesTabs.vue";

export default {
  name: "home-view",
  components: { DatesTabs },
  data() {
    return {
      selectedDate: 12,
      totalKcal: 1300,
      maxKcal: 1500,
    };
  },
  computed: {
    progressInPercents() {
      return Math.round((this.totalKcal / this.maxKcal) * 100);
    },
  },
  watch: {
    selectedDate(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
.progress__text {
  margin: 0;
  text-align: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
