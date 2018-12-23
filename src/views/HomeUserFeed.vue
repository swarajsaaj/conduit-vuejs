<template>
  <div>
      <ArticleList :params="{type:'user'}"></ArticleList>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList"
export default {
    components: {ArticleList},
}
</script>
