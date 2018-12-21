<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href>Have an account?</a>
          </p>

          <ul class="error-messages" v-if="errors">
            <li v-for="(error,field) in errors" :key="field">{{field}} {{error[0]}}</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                v-model="user.name"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              >
            </fieldset>
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
            <button @click="register" class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {}
    };
  },
  computed: {
    errors() {
      return this.$store.getters["users/errors"];
    }
  },
  methods: {
    register: function() {
      this.$store
        .dispatch("users/register", {
          username: this.user.name,
          password: this.user.password,
          email: this.user.email
        })
        .then(() => this.$router.push({ name: "home" }) );
    }
  }
};
</script>
