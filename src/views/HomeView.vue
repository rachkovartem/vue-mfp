<template>
  <div class="wrapper">
    <dates-tabs v-model="selectedDay" v-on:change-day="setSelectedDay" />
    <v-progress-circular
      :rotate="90"
      :size="170"
      :width="15"
      :value="progressInPercents"
      color="primary"
    >
      <div>
        <p class="progress__text">Total</p>
        <p class="progress__text">{{ totalKcal }} kcal</p>
      </div>
    </v-progress-circular>
    <div class="list">
      <p>Breakfast</p>
      <div>
        <v-btn
          class="list__add-button"
          elevation="2"
          small
          @click="$router.push(`/add/${selectedDay}/breakfast`)"
          >+</v-btn
        >
      </div>
      <p>Lunch</p>
      <p>Dinner</p>
      <p>Snacks</p>
    </div>
  </div>
</template>

<script>
import DatesTabs from "@/components/DatesTabs.vue";
import { DB } from "@/utils/indexedDB";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "home-view",
  components: { DatesTabs },
  data() {
    return {
      totalKcal: 1300,
      maxKcal: 1500,
    };
  },
  methods: {
    ...mapMutations({
      setSelectedDay: "dishList/setSelectedDay",
    }),
  },
  computed: {
    progressInPercents() {
      return Math.round((this.totalKcal / this.maxKcal) * 100);
    },
    ...mapState({
      selectedDay: (state) => state.dishList.selectedDay,
    }),
    ...mapGetters({
      tabs: "dishList/tabs",
    }),
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

.list {
  width: 100%;
  padding: 0 12px;
}

.list__add-button {
  width: 100%;
}
</style>
