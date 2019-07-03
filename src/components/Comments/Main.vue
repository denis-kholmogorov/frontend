<template lang="pug">
  .comment-main
    router-link.comment-main__pic(:to="{name: 'ProfileId', params: {id: info.author.id}}")
      img(:src="info.author.photo" :alt="info.author.first_name")
    .comment-main__main
      router-link.comment-main__author(:to="{name: 'ProfileId', params: {id: info.id}}") {{info.author.first_name + ' ' + info.author.last_name}}
      p.comment-main__text {{info.comment_text}}
      .comment-main__actions
        span.comment-main__time {{info.time | moment('from') }}
        template(v-if="!admin")
          a.comment-main__review(href="#" @click.prevent="$emit('answer-comment')") Ответить
          like-comment(fill :active="info.my_like" @click.native="likeAction(info.id, info.post_id, info.my_like)")
</template>

<script>
import { mapActions } from 'vuex'
import LikeComment from '@/components/LikeComment'
export default {
  name: 'CommentMain',
  props: {
    admin: Boolean,
    info: Object
  },
  components: { LikeComment },
  methods: {
    ...mapActions('global/likes', ['putLike', 'deleteLike']),
    likeAction(id, post_id, active) {
      active
        ? this.deleteLike({ item_id: id, post_id, type: 'Comment' })
        : this.putLike({ item_id: id, post_id, type: 'Comment' })
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.comment-main {
  display: flex;
  font-size: 13px;
}

.comment-main__pic {
  flex: none;
  align-self: flex-start;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;

  img {
    width: 100%;
  }
}

.comment-main__main {
  width: 100%;
}

.comment-main__author {
  font-weight: 600;
  color: #000;
  margin-bottom: 5px;
  display: block;
}

.comment-main__text {
  line-height: 21px;
  color: #6A6A80;
  margin-bottom: 5px;
}

.comment-main__actions {
  display: flex;
  align-items: center;
}

.comment-main__time {
  color: santas-gray;
  display: block;
  margin-right: 20px;
}

.comment-main__review {
  color: eucalypt;
  margin-right: auto;
}
</style>
