<template lang="pug">
  .comment-main
    a.comment-main__pic(href="#")
      img(src="/static/img/user/1.jpg" alt="Максим Муратин")
    .comment-main__main
      a.comment-main__author(href="#") Максим Муратин
      p.comment-main__text Текст комментария. Текст комментария. Текст комментария. Текст комментария. Текст комментария. Текст комментария. Текст комментария. Текст.
      .comment-main__actions
        span.comment-main__time сегодня в 13:36
        template(v-if="!admin")
          a.comment-main__review(href="#" @click.prevent="$emit('answer-comment')") Ответить
          like-comment(fill)
</template>

<script>
import LikeComment from '@/components/LikeComment'
export default {
  name: 'CommentMain',
  props: {
    admin: Boolean
  },
  components: { LikeComment }
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
