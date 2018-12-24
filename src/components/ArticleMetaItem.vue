<template>
  <div class="article-meta">
    <router-link :to="{name:'profile',params:{username:article.author.username}}" href>
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

    <span v-if="!isArticleAuthor">
      <button
        v-if="!isArticleAuthor"
        class="btn btn-sm btn-outline-secondary action-btn"
        @click="toggleFollow(!article.author.following)"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        <span v-if="!article.author.following">Follow {{article.author.username}}</span>
        <span v-else>Unfollow {{article.author.username}}</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm"
        :class="{'btn-outline-primary':!article.favorited,'btn-primary':article.favorited}"
        @click="toggleFavorite(!article.favorited)"
      >
        <i class="ion-heart"></i>
        &nbsp;
        <span v-if="!article.favorited">Favorite Article</span>
        <span v-else>Unfavorite Article</span>
        <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </span>
    <span v-else>
      <button
        @click="$emit('edit',article.slug)"
        class="btn btn-outline-secondary btn-sm btn-outline-primary"
      >
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        @click="$emit('delete',article.slug)"
        class="btn btn-outline-danger btn-sm btn-outline-primary"
      >
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FAVORITE_ARTICLE, UNFAVORITE_ARTICLE, FOLLOW_USER,UNFOLLOW_USER} from "@/constants/actions";
export default {
  props: {
    article: Object
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
    isArticleAuthor() {
      return this.user.username == this.article.author.username;
    }
  },
  methods: {
    toggleFavorite(favorite) {
      if (favorite) {
        this.$store.dispatch(FAVORITE_ARTICLE, { slug: this.article.slug });
      } else {
        this.$store.dispatch(UNFAVORITE_ARTICLE, { slug: this.article.slug });
      }
    },
    toggleFollow(follow) {
      const payload = {
        username: this.article.author.username
      };
      if (follow) {
        this.$store.dispatch(FOLLOW_USER, payload);
      } else {
        this.$store.dispatch(UNFOLLOW_USER, payload);
      }
    }
  }
};
</script>
