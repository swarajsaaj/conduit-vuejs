<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <ArticleMetaItem :article="article" @edit="editArticle($event)" @delete="deleteArticle($event)"></ArticleMetaItem>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <span v-html="$options.filters.markdown(article.body)"></span>
        </div>
      </div>

      <hr>

      <div class="article-actions">
        <ArticleMetaItem :article="article" @edit="editArticle($event)" @delete="deleteArticle($event)"></ArticleMetaItem>
      </div>

      <div class="row" v-if="isAuthenticated">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                v-model="newComment"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="article.author.image" class="comment-author-img">
              <button @click="postComment" class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>
          <CommentItem
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :authorUsername="article.author.username"
            @delete-comment="deleteComment($event)"
            @edit-comment="editComment($event)"
          ></CommentItem>
        </div>
      </div>
      <div v-else>
       <router-link :to="{name:'login'}">Sign in</router-link> or 
       <router-link :to="{name:'register'}">Sign up</router-link> to add comments on this article. 
      </div>
    </div>
  </div>
</template>

<script>
import {
  FETCH_SINGLE_ARTICLE,
  FETCH_COMMENTS,
  POST_COMMENT,
  DELETE_COMMENT,
  DELETE_ARTICLE
} from "@/constants/actions";
import { mapState } from "vuex";
import ArticleMetaItem from "@/components/ArticleMetaItem";
import CommentItem from "@/components/CommentItem";

export default {
  components: { ArticleMetaItem, CommentItem },
  data() {
    return {
      newComment: ""
    };
  },
  computed: {
    articleSlug() {
      return this.$route.params.article_slug;
    },
    ...mapState({
      article: state => state.articles.article,
      comments: state => state.articles.comments,
      isAuthenticated: state=>state.users.isAuthenticated
    })
  },
  mounted() {
    this.$store.dispatch(FETCH_SINGLE_ARTICLE, { slug: this.articleSlug });
    this.$store.dispatch(FETCH_COMMENTS, { slug: this.articleSlug });
  },
  methods: {
    postComment: function() {
      this.$store.dispatch(POST_COMMENT, {
        slug: this.articleSlug,
        comment: this.newComment
      });
    },
    deleteComment: function(commentId) {
      this.$store.dispatch(DELETE_COMMENT, {
        slug: this.articleSlug,
        commentId: commentId
      });
    },
    editComment: function(commentText) {
      //As edit functionality does not exist in APIm adding a dummy reply like functionality
      this.newComment = `--------- \nEdit :: ${commentText}`;
    },
    editArticle: function(articleSlug) {
      this.$router.push({
        name: "edit-article",
        params: { article_slug: articleSlug }
      });
    },
    deleteArticle: function(articleSlug){
      this.$store.dispatch(DELETE_ARTICLE, {
        slug: this.articleSlug
      })
      .then(()=>this.$router.push({name:'global-feed'}));
    }
  }
};
</script>
