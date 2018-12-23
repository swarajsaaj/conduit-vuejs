import ApiService from "@/common/api.service";

export default {
  namespaced: true,
  state: {
    articles: [],
    isLoading: true,
    articlesCount: 0
  },
  getters: {
    articles: state => {
      return state.articles;
    }
  },
  mutations: {
    setLoading: function(state, payload) {
      state.isLoading = payload;
    },
    setArticles: function(state, payload) {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
    }
  },
  actions: {
    fetchArticles: function({ commit }, payload) {
      commit("setLoading", true);
      const url = payload.feedType == "global" ? "/articles" : "/articles/feed";
      ApiService.query(url, { params: payload.filters })
        .then(({ data }) => {
          commit("setArticles", data);
          commit("setLoading", false);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
