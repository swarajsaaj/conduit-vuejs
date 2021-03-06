import ApiService from "@/common/api.service";
import {
  FETCH_SINGLE_ARTICLE,
  FETCH_COMMENTS,
  POST_COMMENT,
  CREATE_ARTICLE,
  DELETE_COMMENT,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  FAVORITE_ARTICLE,
  UNFAVORITE_ARTICLE,
  FETCH_ARTICLES
} from "@/constants/actions";

import {
  SET_ARTICLES,
  SET_LOADING_ARTICLE,
  SET_SINGLE_ARTICLE,
  SET_COMMENTS,
  UPDATE_ARTICLE_AUTHOR,
  UPDATE_ARTICLE
} from "@/constants/mutations";

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
    [SET_LOADING_ARTICLE]: function(state, payload) {
      state.isLoading = payload;
    },
    [SET_ARTICLES]: function(state, payload) {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
    },
    [SET_SINGLE_ARTICLE]: function(state, payload) {
      state.article = payload;
    },
    [SET_COMMENTS]: function(state, payload) {
      state.comments = payload;
    },
    [UPDATE_ARTICLE]: function(state, payload) {
      state.articles.forEach(function(article) {
        if (article.slug == payload.slug) {
          (article.favorited = payload.favorited),
            (article.favoritesCount = payload.favoritesCount);
        }
      });
      if (state.article && state.article.slug == payload.slug) {
        state.article.favorited = payload.favorited;
        state.article.favoritesCount = payload.favoritesCount;
      }
    },
    [UPDATE_ARTICLE_AUTHOR]: function(state, payload) {
      if (state.article && state.article.author.username == payload.username) {
        state.article.author.following = payload.following;
      }
    }
  },
  actions: {
    [FETCH_ARTICLES]: function({ commit }, payload) {
      commit(SET_LOADING_ARTICLE, true);
      const url = payload.feedType == "global" ? "/articles" : "/articles/feed";
      ApiService.query(url, { params: payload.filters })
        .then(({ data }) => {
          commit(SET_ARTICLES, data);
          commit(SET_LOADING_ARTICLE, false);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    [FETCH_SINGLE_ARTICLE]: function({ commit }, payload) {
      commit(SET_LOADING_ARTICLE, true);
      ApiService.get(`/articles/${payload.slug}`)
        .then(({ data }) => {
          commit(SET_SINGLE_ARTICLE, data.article);
          commit(SET_LOADING_ARTICLE, false);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    [FETCH_COMMENTS]: function({ commit }, payload) {
      commit(SET_LOADING_ARTICLE, true);
      ApiService.get(`/articles/${payload.slug}/comments`)
        .then(({ data }) => {
          commit(SET_COMMENTS, data.comments);
          commit(SET_LOADING_ARTICLE, false);
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
    },
    [DELETE_COMMENT]: function({ dispatch }, payload) {
      ApiService.delete(
        `/articles/${payload.slug}/comments/${payload.commentId}`
      )
        .then(() => {
          dispatch(FETCH_COMMENTS, payload);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    [CREATE_ARTICLE]: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.post("/articles", { article: payload.article })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response.data.errors);
          });
      });
    },
    [EDIT_ARTICLE]: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.put(`/articles/${payload.slug}`, {
          article: payload.article
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response.data.errors);
          });
      });
    },
    [DELETE_ARTICLE]: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ApiService.delete(`/articles/${payload.slug}`)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response.data.errors);
          });
      });
    },
    [FAVORITE_ARTICLE]: function({ commit }, payload) {
      ApiService.post(`/articles/${payload.slug}/favorite`)
        .then(({ data }) => {
          commit(UPDATE_ARTICLE, data.article);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    [UNFAVORITE_ARTICLE]: function({ commit }, payload) {
      ApiService.delete(`/articles/${payload.slug}/favorite`)
        .then(({ data }) => {
          commit(UPDATE_ARTICLE, data.article);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
