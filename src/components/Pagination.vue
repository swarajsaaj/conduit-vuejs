<template>
  <nav>
    <ul class="pagination">
      <li
        v-for="page in pages"
        :key="page"
        :class="paginationClass(page)"
        @click.prevent="$emit('select-page',page)"
      >
        <a class="page-link" href v-text="page">{{page}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    pages: Array
  },
  methods: {
    paginationClass(page) {
      return {
        "page-item": true,
        active: this.currentPage === page
      };
    }
  }
};
</script>
