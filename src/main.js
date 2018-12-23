import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./assets/main.css";
import ApiService from "./common/api.service";
import DateFilter from "@/filters/date.filter";
import MarkdownFilter from "@/filters/markdown.filter";

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.filter("markdown", MarkdownFilter);
initApp();

function initApp() {
  ApiService.init();
}

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch("users/checkAuth")]).then(next)
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
