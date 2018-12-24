<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link href :to="{name:'profile',params:{username:article.author.username}}">
        <img :src="article.author.image">
      </router-link>
      <div class="info">
        <router-link
          :to="{name:'profile',params:{username:article.author.username}}"
          href
          class="author"
        >{{article.author.username}}</router-link>
        <span class="date">{{article.createdAt | date}}</span>
      </div>
      <button
        class="btn btn-sm pull-xs-right"
        :class="{'btn-outline-primary':!article.favorited,'btn-primary':article.favorited}"
        @click="toggleFavorite(!article.favorited)"
      >
        <i class="ion-heart"></i>
        {{article.favoritesCount}}
      </button>
    </div>
    <router-link
      :to="{name:'article',params:{article_slug:article.slug}}"
      href
      class="preview-link"
    >
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </router-link>
    <div v-if="article.tagList" class="tag-list">
      <span
        v-for="tag in article.tagList"
        :key="tag"
        class="tag-pill tag-default tag-outline"
      >{{tag}}</span>
    </div>
  </div>
</template>

<script>
import { FAVORITE_ARTICLE, UNFAVORITE_ARTICLE } from "@/constants/actions";
import { mapState } from "vuex";
export default {
  props: {
    article: Object
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.users.isAuthenticated
    })
  },
  methods: {
    toggleFavorite(favorite) {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      if (favorite) {
        this.$store.dispatch(FAVORITE_ARTICLE, { slug: this.article.slug });
      } else {
        this.$store.dispatch(UNFAVORITE_ARTICLE, { slug: this.article.slug });
      }
    }
  }
};
</script>
