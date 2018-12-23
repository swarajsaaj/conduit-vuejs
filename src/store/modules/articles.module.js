import ApiService from "@/common/api.service";
import { FETCH_ARTICLES } from "@/constants/actions";
import { FETCH_SINGLE_ARTICLE, FETCH_COMMENTS } from "@/constants/actions";
import { POST_COMMENT } from "../../constants/actions";

export default {
  state: {
    articles: [],
    article: null,
    comments: null,
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
    },
    setArticle: function(state, payload) {
      state.article = payload;
    },
    setComments: function(state, payload) {
      state.comments = payload;
    }
  },
  actions: {
    [FETCH_ARTICLES]: function({ commit }, payload) {
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
    },
    [FETCH_SINGLE_ARTICLE]: function({ commit }, payload) {
      commit("setLoading", true);
      ApiService.get(`/articles/${payload.slug}`)
        .then(({ data }) => {
          commit("setArticle", data.article);
          commit("setLoading", false);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    [FETCH_COMMENTS]: function({ commit }, payload) {
      commit("setLoading", true);
      ApiService.get(`/articles/${payload.slug}/comments`)
        .then(({ data }) => {
          commit("setComments", data.comments);
          commit("setLoading", false);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    [POST_COMMENT]: function({ dispatch }, payload) {
      ApiService.post(`/articles/${payload.slug}/comments`, {
        comment: { body: payload.comment }
      })
        .then(() => {
          dispatch(FETCH_COMMENTS, payload);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
