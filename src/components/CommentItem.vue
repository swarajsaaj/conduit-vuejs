<template>
        <div class="card">
            <div class="card-block">
              <p
                class="card-text"
              >{{comment.body}}</p>
            </div>
            <div class="card-footer">
              <router-link :to="{name:'profile',params:{username:comment.author.username}}" href class="comment-author">
                <img :src="comment.author.image" class="comment-author-img">
              </router-link>
              &nbsp;
              <router-link :to="{name:'profile',params:{username:comment.author.username}}"  href class="comment-author">{{comment.author.username}}</router-link>
              <span class="date-posted">{{comment.createdAt | date}}</span>
              <span class="mod-options">
                <i @click="$emit('edit-comment',comment.body)" v-if="comment.author.username==user.username" class="ion-edit"></i>
                <i @click="$emit('delete-comment',comment.id)" v-if="comment.author.username==user.username || user.username==authorUsername" class="ion-trash-a"></i>
              </span>
            </div>
          </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    props:{
        comment: Object,
        authorUsername: String,
    },
    computed:{
        ...mapGetters({
            user:"users/user"
        })
    }
}
</script>
