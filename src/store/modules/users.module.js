import ApiService from "@/common/api.service";
import { FETCH_PROFILE } from "@/constants/actions";

export default {
  namespaced: true,
  state: {
    principalUser: null,
    profile: {},
    isAuthenticated: false
  },
  getters: {
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
      ApiService.clearToken();
    },
    setProfile(state, payload) {
      state.profile = payload;
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
            reject(response.data.errors);
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
            reject(response.data.errors);
          });
      });
    },
    logout: function({ commit }) {
      return new Promise(resolve => {
        commit("logoutUser");
        resolve();
      });
    },
    checkAuth: function({ state }) {
      if (state.isAuthenticated) {
        ApiService.setToken(state.principalUser.token);
      }
    },
    fetchProfile: function({ commit }, payload) {
      ApiService.query("/profiles/" + payload.username)
        .then(({ data }) => {
          commit("setProfile", data.profile);
        })
        .catch(({ response }) => {
          throw new Error(response.data.errors);
        });
    },
    update: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.put("/user", payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response.data.errors);
          });
      });
    }
  }
};
