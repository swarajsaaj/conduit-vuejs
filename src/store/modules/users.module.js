import ApiService from "@/common/api.service";

export default {
  namespaced: true,
  state: {
    errors: {},
    principalUser: null,
    user: {},
    isAuthenticated: false
  },
  getters: {
    errors: state => {
      return state.errors;
    },
    user: state => {
      return state.principalUser;
    },
    token: state => {
      return state.user.token;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.principalUser = payload;
      state.isAuthenticated = true;
      state.errors = null;
      ApiService.setToken(payload.token);
    },
    logoutUser(state) {
      state.principalUser = null;
      state.isAuthenticated = false;
    },
    setErrors(state, payload) {
      state.errors = payload;
    }
  },
  actions: {
    login: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.post("/users/login", { user: payload })
          .then(({ data }) => {
            commit("setUser", data.user);
            resolve(data);
          })
          .catch(({ response }) => {
            commit("setErrors", response.data.errors);
            reject(response);
          });
      });
    },
    register: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.post("/users", { user: payload })
          .then(({ data }) => {
            commit("setUser", data.user);
            resolve(data);
          })
          .catch(({ response }) => {
            commit("setErrors", response.data.errors);
            reject(response);
          });
      });
    },
    logout: function({ commit }) {
      return new Promise(resolve => {
        commit("logoutUser");
        resolve();
      });
    }
  }
};
