import ApiService from "@/common/api.service";
import { FETCH_TAGS } from "@/constants/actions";
import { SET_TAGS } from "@/constants/mutations";

export default {
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
    [SET_TAGS]: function(state, payload) {
      state.tags = payload;
      state.isLoading = false;
    }
  },
  actions: {
    [FETCH_TAGS]: function({ commit }) {
      ApiService.get("/tags")
        .then(({ data }) => {
          commit(SET_TAGS, data.tags);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
