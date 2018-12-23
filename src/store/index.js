import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users.module";
import home from "./modules/home.module";
import articles from "./modules/articles.module";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const userStorePersistancePlugin = new VuexPersistence({
  storage: window.localStorage,
  modules: ["users"]
});

const store = new Vuex.Store({
  modules: {
    users,
    home,
    articles
  },
  plugins: [userStorePersistancePlugin.plugin]
});

export default store;
