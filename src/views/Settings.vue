<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ErrorList :errors="errors"></ErrorList>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
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
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateProfile"
              >Update Settings</button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="logout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorList from "@/components/ErrorList";
import {LOGOUT,UPDATE_PROFILE} from "@/constants/actions";
export default {
  data(){
    return {
      errors: {}
    }
  },
  computed: {
    user: function() {
      var userCopy = Object.assign({},this.$store.getters["users/user"]);
      return userCopy;
    }
  },
  components : {ErrorList},
  methods: {
    logout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "global-feed" }));
    },
    updateProfile() {
      var updatedUser = {
        username: this.user.username,
        bio: this.user.bio,
        email: this.user.email,
        image: this.user.image
      };
      if (this.user.password) {
        updatedUser.password = this.user.password;
      }
      this.$store
        .dispatch(UPDATE_PROFILE, updatedUser)
        .then(() => this.$router.push({ name: "global-feed" }),
        (err)=>this.errors=err);
    }
  }
};
</script>
