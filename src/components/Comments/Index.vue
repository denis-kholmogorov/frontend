<template lang="pug">
  .comments(:class="{open: isOpenComments, 'comments--admin': admin}")
    h4.comments__title
      span Комментарии ({{info.length}})
      a.comments__show(@click.prevent="showComments" href="#" v-if="info.length > 1") {{showText}}
    .comments__list
      comment-block(:admin="admin" @answer-main="onAnswer" v-for="i in info" :key="i.id" :info="i")
      .comments__add(v-if="!admin")
        comment-add(ref="addComment" :id="id")
</template>

<script>
import CommentBlock from '@/components/Comments/Block'
import CommentAdd from '@/components/Comments/Add'
export default {
  name: 'Comments',
  props: {
    admin: Boolean,
    info: Array,
    id: Number
  },
  components: { CommentBlock, CommentAdd },
  data: () => ({
    isOpenComments: false,
    comment: ''
  }),
  computed: {
    showText() {
      return this.isOpenComments ? 'скрыть' : 'показать'
    }
  },
  methods: {
    showComments() {
      this.isOpenComments = !this.isOpenComments
    },
    onAnswer() {
      this.$refs.addComment.$refs.addInput.focus()
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.comments {
  .comment-block:not(:first-child) {
    display: none;
  }

  &.open {
    .comment-block, .comment-block__reviews {
      display: block;
    }
  }

  &.comments--admin {
    padding-bottom: 40px;

    .comment-block {
      &:first-child {
        display: none;
      }

      .edit {
        display: none;
      }
    }

    &.open {
      .comment-block:first-child {
        display: block;
      }
    }
  }
}

.comments__title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  span {
    font-family: font-exo;
    font-weight: bold;
    font-size: 15px;
    color: #000;
    display: block;
    margin-right: 5px;
  }
}

.comments__show {
  font-size: 13px;
  color: eucalypt;
}

.comments__list {
  width: 100%;
  max-width: 580px;
}
</style>
