<template>
  <div>
      <ArticleList :params="{type:'global'}"></ArticleList>
  </div>
</template>


<script>
import ArticleList from "@/components/ArticleList"
export default {
    components: {ArticleList},
}
</script>
