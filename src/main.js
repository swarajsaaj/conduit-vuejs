import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./assets/main.css";
import ApiService from "./common/api.service";

Vue.config.productionTip = false;

initApp();

function initApp(){
  ApiService.init();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
