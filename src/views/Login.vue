<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="register">Need an account?</router-link>
          </p>

          <ErrorList :errors="errors"></ErrorList>

          <form>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              >
            </fieldset>
            <button @click="login" class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ErrorList from "@/components/ErrorList";
export default {
  data: function() {
    return {
      user: {},
      errors: {}
    };
  },
  components:{ErrorList},
  methods: {
    login: function() {
      this.$store
        .dispatch("users/login", {
          email: this.user.email,
          password: this.user.password
        })
        .then(() => this.$router.push({ name: "global-feed" }),
        (err)=>this.errors=err);
    }
  }
};
</script>
