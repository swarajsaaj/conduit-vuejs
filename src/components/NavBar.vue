<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link to="/" class="nav-link active" href>Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to ="/editor" class="nav-link" href>
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/settings" class="nav-link" href>
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item" v-show="!user">
          <router-link to="/login" class="nav-link" href>Sign in</router-link>
        </li>
        <li class="nav-item" v-show="!user">
          <router-link to="/register" class="nav-link" href>Sign up</router-link>
        </li>
         <li class="nav-item" v-if="user">
          <router-link to="/profile" class="nav-link" href>{{user.username}}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed:{
    user: function(){
      return this.$store.getters["users/user"];
    }
  }
}
</script>
