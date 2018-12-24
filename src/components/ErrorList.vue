<template>
  <ul class="error-messages" v-if="errors">
    <span v-for="(errors,field) in errors" :key="field">
      <li v-for="error in errors" :key="error">{{field}} {{error}}</li>
    </span>
  </ul>
</template>

<script>
export default {
  props: {
    errors: Object
  }
};
</script>
