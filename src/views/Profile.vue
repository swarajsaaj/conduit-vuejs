<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img">
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>
            <router-link
              v-if="isCurrentUser"
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{name:'settings'}"
            >
              <i class="ion-settings"></i>
              &nbsp;
              Edit Profile
            </router-link>
            <button
              v-if="!isCurrentUser"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="toggleFollow(!profile.following)"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              <span v-if="!profile.following">
              Follow {{profile.username}}
              </span>
              <span v-else>
               Unfollow {{profile.username}}
               </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link :to="{name:'profile',params:{'username':profile.username}}" class="nav-link" active-class="active" exact href>My Articles</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name:'profile-favorite-articles',params:{'username':profile.username}}" class="nav-link" active-class="active" exact href>Favorited Articles</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import { FETCH_PROFILE,FOLLOW_USER,UNFOLLOW_USER } from "@/constants/actions";
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      profile: state => state.users.profile
    }),
    ...mapGetters({
      user: "user"
    }),
    isCurrentUser() {
      return this.user.username == this.profile.username;
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, this.$route.params);
  },
  methods:{
    toggleFollow(follow){
      const payload = {
        username: this.profile.username
      }
      if(follow){
        this.$store.dispatch(FOLLOW_USER,payload);
      }else{
        this.$store.dispatch(UNFOLLOW_USER,payload);
      }
    }
  }
};
</script>
