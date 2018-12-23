<template>
  <div class="article-meta">
    <a href>
      <img :src="article.author.image">
    </a>
    <div class="info">
      <a href class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt | date}}</span>
    </div>

    <span v-if="!isArticleAuthor">
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow {{article.author.username}}
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post
        <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </span>
    <span v-else>
      <button @click="$emit('edit',article.slug)" class="btn btn-outline-secondary btn-sm btn-outline-primary">
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </button>
      &nbsp;&nbsp;
      <button @click="$emit('delete',article.slug)" class="btn btn-outline-danger btn-sm btn-outline-primary">
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    article: Object
  },
  computed: {
    ...mapGetters({
      user: "users/user"
    }),
    isArticleAuthor() {
      return this.user.username == this.article.author.username;
    }
  }
};
</script>
