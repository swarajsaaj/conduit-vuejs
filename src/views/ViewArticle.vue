<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <ArticleMetaItem :article="article"></ArticleMetaItem>
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
        <ArticleMetaItem :article="article"></ArticleMetaItem>
      </div>

      <div class="row">
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
    </div>
  </div>
</template>

<script>
import {FETCH_SINGLE_ARTICLE,FETCH_COMMENTS,POST_COMMENT,DELETE_COMMENT} from "@/constants/actions"
import { mapState } from 'vuex'
import ArticleMetaItem from "@/components/ArticleMetaItem"
import CommentItem from "@/components/CommentItem"

export default {
  components:{ArticleMetaItem,CommentItem},
  data(){
    return {
      newComment:""
    }
  },
  computed:{
    articleSlug(){
      return this.$route.params.article_slug;
    },
    ...mapState({
      article: state=>state.articles.article,
      comments: state=>state.articles.comments
    })
  },
  mounted(){
    this.$store.dispatch(FETCH_SINGLE_ARTICLE,{slug:this.articleSlug});
    this.$store.dispatch(FETCH_COMMENTS,{slug:this.articleSlug});
  },
  methods:{
    postComment:function(){
      this.$store.dispatch(POST_COMMENT,{
        slug:this.articleSlug,
        comment:this.newComment
      });
    },
    deleteComment:function(commentId){
      this.$store.dispatch(DELETE_COMMENT,{
          slug:this.articleSlug,
          commentId:commentId
      });
    },
    editComment:function(commentText){
      //As edit functionality does not exist in APIm adding a dummy reply like functionality
      this.newComment=`--------- \nEdit :: ${commentText}`
    }
  }
}
</script>
