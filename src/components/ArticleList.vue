<template>
  <div>
    <span v-if="!isLoading && articlesCount==0">No Articles yet!</span>

    <div v-if="isLoading">Loading Articles</div>
    <div v-else>
      <ArticlePreviewItem
        v-for="article in articles"
        :article="article"
        :key="article.id"
        :select-page="changePage"
      ></ArticlePreviewItem>
      <Pagination :current-page="currentPage" :pages="pages" @select-page="changePage"></Pagination>
    </div>
  </div>
</template>

<script>
import ArticlePreviewItem from "@/components/ArticlePreviewItem";
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
import { FETCH_ARTICLES } from "@/constants/actions";

export default {
  name: "ArticleList",
  props: {
    params: Object
  },
  components: { ArticlePreviewItem, Pagination },
  mounted: function() {
    this.getArticles();
  },
  data: function() {
    return {
      currentPage: 1
    };
  },
  computed: {
    ...mapState({
      articles: state => state.articles.articles,
      articlesCount: state => state.articles.articlesCount,
      isLoading: state => state.articles.isLoading
    }),
    pages() {
      return this.articlesCount
        ? [...Array(Math.ceil(this.articlesCount / 10)).keys()].map(
            key => key + 1
          )
        : [1];
    }
  },
  methods: {
    getArticles(pageNumber) {
      if (pageNumber) {
        this.currentPage = pageNumber ? pageNumber : 1;
      }
      var fetchParams = {
        feedType: this.params.type,
        filters: {
          offset: (this.currentPage - 1) * 10,
          limit: 10
        }
      };
      if (this.params.tag) {
        fetchParams.filters.tag = this.params.tag;
      }
      if (this.params.author) {
        fetchParams.filters.author = this.params.author;
      }
      if (this.params.favorited) {
        fetchParams.filters.favorited = this.params.favorited;
      }

      this.$store.dispatch(FETCH_ARTICLES, fetchParams);
    },
    changePage(newPage) {
      this.currentPage = newPage;
      this.getArticles();
    }
  },
  watch: {
    params() {
      this.getArticles();
    }
  }
};
</script>
