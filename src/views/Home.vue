<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{name : 'user-feed'}"
                  class="nav-link"
                  active-class="active"
                >Your Feed</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name : 'global-feed'}"
                  exact
                  class="nav-link"
                  active-class="active"
                >Global Feed</router-link>
              </li>
              <li class="nav-item" v-if="tag">
                <router-link
                  :to="{name : 'tag-feed',tag:tag} "
                  exact
                  class="nav-link"
                  active-class="active"
                >#{{tag}}</router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <span v-if="isLoading">Loading Tags</span>
            <div v-if="tags" class="tag-list">
              <router-link
                :to="{name:'tag-feed', params: { tag } }"
                v-for="tag in tags"
                :key="tag"
                href
                class="tag-pill tag-default"
              >{{tag}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ArticleList from "@/components/ArticleList.vue";

export default {
  name: "home",
  components: { ArticleList },
  computed: {
    ...mapGetters({
      isAuthentnicated: "users/isAuthenticated",
      tags: "home/tags"
    }),
    ...mapState({
      isLoading: state => state.home.isLoading
    }),
    tag() {
      return this.$route.params.tag;
    }
  },
  mounted: function() {
    this.$store.dispatch("home/fetchTags");
  },
  data: function() {
    return {};
  }
};
</script>

<style>
</style>
