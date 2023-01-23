import dayjs from "dayjs";
import daysOfWeek from "@/utils/daysOfWeek";

type ListsByDays = Record<
  string,
  {
    breakfast: [];
    lunch: [];
    dinner: [];
    snacks: [];
  }
>;

type Nutrients = Record<string, unknown>;

interface State {
  listsByDays: ListsByDays | null;
  listsLoading: boolean;
  selectedDay: string;
  nutrients: Nutrients | null;
}

export const dishListModule = {
  state: (): State => ({
    listsByDays: null,
    listsLoading: false,
    selectedDay: dayjs().format("DD-MM-YYYY"),
    nutrients: null,
  }),
  getters: {
    tabs() {
      return Array.from({ length: 15 }).map((_, index, array) => {
        const offset = index - array.length + 3;
        const date =
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
  mutations: {
    setListByDays(state: State, lists: ListsByDays) {
      state.listsByDays = lists;
    },
    setListsLoading(state: State, value: boolean) {
      state.listsLoading = value;
    },
    setSelectedDay(state: State, value: string) {
      state.selectedDay = value;
    },
    setNutrients(state: State, value: Nutrients) {
      state.nutrients = value;
    },
  },
  actions: {
    async saveDish({ state, commit }: { state: State; commit: any }) {
      try {
        commit("setListsLoading", true);
      } catch (e) {
        console.log(e);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  namespaced: true,
};
