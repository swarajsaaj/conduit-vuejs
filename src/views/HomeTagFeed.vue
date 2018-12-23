<template>
  <div>
    <ArticleList :params="{type:'global',tag:tag}"></ArticleList>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList";
export default {
  components: { ArticleList },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
