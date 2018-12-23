import ApiService from "@/common/api.service";

export default {
  namespaced: true,
  state: {
    tags: [],
    isLoading: true
  },
  getters: {
    tags: state => {
      return state.tags;
    }
  },
  mutations: {
    setTags: function(state, payload) {
      state.tags = payload;
      state.isLoading = false;
    }
  },
  actions: {
    fetchTags: function({ commit }) {
      ApiService.get("/tags")
        .then(({ data }) => {
          commit("setTags", data.tags);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
