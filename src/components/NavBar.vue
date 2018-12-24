<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/" href>conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link to="/" class="nav-link active" href>Home</router-link>
        </li>
        <li class="nav-item" v-show="isAuthenticated">
          <router-link to="/editor" class="nav-link" href>
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li class="nav-item" v-show="isAuthenticated">
          <router-link to="/settings" class="nav-link" href>
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item" v-show="!isAuthenticated">
          <router-link to="/login" class="nav-link" href>Sign in</router-link>
        </li>
        <li class="nav-item" v-show="!isAuthenticated">
          <router-link to="/register" class="nav-link" href>Sign up</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link
            :to="{name:'profile',params:{ 'username':user.username }}"
            class="nav-link"
            href
          >{{user.username}}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapState} from "vuex";
export default {
  computed: {
    ...mapState({
      isAuthenticated: state=>state.users.isAuthenticated
    }),
    user: function() {
      return this.$store.getters["user"];
    }
  }
};
</script>
