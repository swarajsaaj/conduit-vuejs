<template>
  <div>
    <ArticleEditor :edit-slug="slug"></ArticleEditor>
  </div>
</template>

<script>
import ArticleEditor from "@/components/ArticleEditor";
export default {
  computed:{
    slug(){
      return this.$route.params.article_slug;
    }
  },
  components:{ArticleEditor}
};
</script>
