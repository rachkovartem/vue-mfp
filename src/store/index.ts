import Vue from "vue";
import Vuex from "vuex";
import { dishListModule } from "@/store/dishListModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { dishList: dishListModule },
});
