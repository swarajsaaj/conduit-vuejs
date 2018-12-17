import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/Settings.vue")
    },
    {
      path: "/article/:article_slug",
      name: "article",
      component: () => import("@/views/ViewArticle.vue")
    },
    {
      path: "/profile/:username",
      name: "profile",
      component: () => import("@/views/Profile.vue")
    },
    {
      path: "/editor",
      name: "createArticle",
      component: () => import("@/views/CreateArticle.vue")
    },
    {
      path: "/editor/:article_slug",
      name: "editArticle",
      component: () => import("@/views/EditArticle.vue")
    }
  ]
});
