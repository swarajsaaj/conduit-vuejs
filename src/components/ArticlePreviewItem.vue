<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html">
        <img :src="article.author.image">
      </a>
      <div class="info">
        <router-link :to="{name:'profile',params:{username:article.author.username}}" href class="author">{{article.author.username}}</router-link>
        <span class="date">{{article.createdAt | date}}</span>
      </div>
      <button
        class="btn btn-sm pull-xs-right"
        :class="{'btn-outline-primary':!article.favorited,'btn-primary':article.favorited}"
      > 
        <i class="ion-heart"></i>
        {{article.favoritesCount}}
      </button>
    </div>
    <router-link :to="{name:'article',params:{article_slug:article.slug}}" href class="preview-link">
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
export default {
  props: ["article"]
};
</script>
