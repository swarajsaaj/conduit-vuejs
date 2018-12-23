<template>
  <div>
      <ArticleList :params="{type:'global',author:username}"></ArticleList>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList";
export default {
  computed:{
      username(){
          return this.$route.params.username;
      }
  },
  components: { ArticleList }
};
</script>
