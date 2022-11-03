import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      logged: false,
    };
  },
  mutations: {
    updateStatus() {
      this.state.logged = !this.state.logged;
    },
  },
});
