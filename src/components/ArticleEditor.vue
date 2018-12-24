<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ErrorList :errors="errors"></ErrorList>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tagStr"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keypress.enter.prevent="addTag(tagStr);"
                >
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, itr) of article.tagList"
                    :key="tag + itr"
                  >
                    <i class="ion-close-round" @click="removeTag(tag);"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                @click="submit"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CREATE_ARTICLE, FETCH_SINGLE_ARTICLE,EDIT_ARTICLE } from "@/constants/actions";
import ErrorList from "@/components/ErrorList";
import { mapState } from "vuex";

export default {
  props: {
    editSlug: String
  },
  data() {
    return {
      article: {
        title: "",
        body: "",
        description: "",
        tagList: []
      },
      tagStr: null,
      errors: null
    };
  },
  computed: {
    ...mapState({
      fetchedArticle: state => state.articles.article
    })
  },
  mounted() {
    if (this.editSlug) {
      this.$store.dispatch(FETCH_SINGLE_ARTICLE, { slug: this.editSlug });
      this.article = this.fetchedArticle;
    }
  },
  components: { ErrorList },
  methods: {
    submit() {
      const articleRequest = {
        title: this.article.title,
        body: this.article.body,
        description: this.article.description,
        tagList: this.article.tagList
      };

      const action = this.editSlug?EDIT_ARTICLE:CREATE_ARTICLE;
      this.$store
        .dispatch(action, { article: articleRequest, slug:this.editSlug })
        .then(resp =>
          this.$router.push({
            name: "article",
            params: { article_slug: resp.article.slug }
          })
        )
        .catch(err => (this.errors = err));
    },
    addTag(tag) {
      this.article.tagList.push(tag);
      this.tagStr = null;
    },
    removeTag(tag) {
      this.article.tagList = this.article.tagList.filter(t => t !== tag);
    }
  }
};
</script>
