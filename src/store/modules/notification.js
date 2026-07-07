import { extractErrorMessage } from "../../utils/errors";

let nextId = 1;

const state = () => ({
  items: [],
});

const mutations = {
  ADD(state, notification) {
    state.items.push(notification);
  },
  REMOVE(state, id) {
    state.items = state.items.filter((item) => item.id !== id);
  },
};

const actions = {
  notify({ commit }, { message, type = "info", timeout = 4000 }) {
    const id = nextId++;
    commit("ADD", { id, message, type });
    setTimeout(() => commit("REMOVE", id), timeout);
  },
  dismiss({ commit }, id) {
    commit("REMOVE", id);
  },
  notifyError({ dispatch }, error) {
    const message = extractErrorMessage(error);
    dispatch("notify", { message, type: "error" });
    return message;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
