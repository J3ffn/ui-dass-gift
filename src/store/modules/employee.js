import employeeService from "../../services/employee.service";

const state = () => ({
  items: [],
  loading: false,
  error: null,
});

const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async fetchEmployees({ commit, dispatch }, filters) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const { data } = await employeeService.getAll(filters);
      commit("SET_ITEMS", data);
    } catch (error) {
      const message = await dispatch("notification/notifyError", error, { root: true });
      commit("SET_ERROR", message);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createEmployee({ dispatch }, payload) {
    const { data } = await employeeService.create(payload);
    dispatch(
      "notification/notify",
      { message: "Funcionário cadastrado com sucesso.", type: "success" },
      { root: true },
    );
    return data;
  },

  async updateEmployee({ dispatch }, { id, payload }) {
    const { data } = await employeeService.update(id, payload);
    dispatch(
      "notification/notify",
      { message: "Funcionário atualizado com sucesso.", type: "success" },
      { root: true },
    );
    return data;
  },

  async deleteEmployee({ dispatch, commit, state }, id) {
    try {
      await employeeService.remove(id);
      commit(
        "SET_ITEMS",
        state.items.filter((employee) => employee.id !== id),
      );
      dispatch(
        "notification/notify",
        { message: "Funcionário removido.", type: "success" },
        { root: true },
      );
    } catch (error) {
      dispatch("notification/notifyError", error, { root: true });
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
