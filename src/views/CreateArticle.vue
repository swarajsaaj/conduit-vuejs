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
                  v-model="article.tagStr"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                >
                <div class="tag-list"></div>
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
import { CREATE_ARTICLE } from "@/constants/actions";
import ErrorList from "@/components/ErrorList";

export default {
  data() {
    return {
      article: {
        title:"",
        body:"",
        description:"",
        tagStr:""
      },
      errors: null
    };
  },
  components: { ErrorList },
  methods: {
    submit() {
      const articleRequest = {
        title:this.article.title,
        body:this.article.body,
        description:this.article.description,
      }
      if (this.article.tagStr) {
        articleRequest.tagList = this.article.tagStr.split(" ");
      }
      this.$store
        .dispatch(CREATE_ARTICLE, { article: articleRequest })
        .then(resp =>
          this.$router.push({
            name: "article",
            params: { article_slug: resp.article.slug }
          })
        )
        .catch(err => (this.errors = err));
    }
  }
};
</script>
