import { createStore } from "vuex";
import employee from "./modules/employee";
import notification from "./modules/notification";

export default createStore({
  modules: {
    employee,
    notification,
  },
});
