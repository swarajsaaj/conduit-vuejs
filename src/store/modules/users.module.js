import ApiService from "@/common/api.service";
import {
  FETCH_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  UPDATE_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_PROFILE,
  UPDATE_ARTICLE_AUTHOR
} from "@/constants/actions";

export default {
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
    },
    [UPDATE_USER](state, payload) {
      state.profile.following = payload.following;
    }
  },
  actions: {
    [LOGIN]: function({ commit }, payload) {
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
    [REGISTER]: function({ commit }, payload) {
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
    [LOGOUT]: function({ commit }) {
      return new Promise(resolve => {
        commit("logoutUser");
        resolve();
      });
    },
    [CHECK_AUTH]: function({ state }) {
      if (state.isAuthenticated) {
        ApiService.setToken(state.principalUser.token);
      }
    },
    [FETCH_PROFILE]: function({ commit }, payload) {
      ApiService.query("/profiles/" + payload.username)
        .then(({ data }) => {
          commit("setProfile", data.profile);
        })
        .catch(({ response }) => {
          throw new Error(response.data.errors);
        });
    },
    [UPDATE_PROFILE]: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.put("/user", payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response.data.errors);
          });
      });
    },
    [FOLLOW_USER]: function({ commit }, payload) {
      ApiService.post(`/profiles/${payload.username}/follow`)
        .then(({ data }) => {
          commit(UPDATE_USER, data.profile);
          commit(UPDATE_ARTICLE_AUTHOR, data.profile);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    [UNFOLLOW_USER]: function({ commit }, payload) {
      ApiService.delete(`/profiles/${payload.username}/follow`)
        .then(({ data }) => {
          commit(UPDATE_USER, data.profile);
          commit(UPDATE_ARTICLE_AUTHOR, data.profile);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
