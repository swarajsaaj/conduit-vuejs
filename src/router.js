import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "",
          name: "global-feed",
          component: () => import("@/views/HomeGlobalFeed.vue")
        },
        {
          path: "/userfeed",
          name: "user-feed",
          component: () => import("@/views/HomeUserFeed.vue")
        },
        {
          path: "/tagfeed/:tag",
          name: "tag-feed",
          component: () => import("@/views/HomeTagFeed.vue")
        }
      ]
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
      path: "/profile/@:username",
      component: () => import("@/views/Profile.vue"),
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("@/views/ProfileUserArticles.vue")
        },
        {
          path: "favorites",
          name: "profile-favorite-articles",
          component: () => import("@/views/ProfileFavoriteArticles.vue")
        }
      ]
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
