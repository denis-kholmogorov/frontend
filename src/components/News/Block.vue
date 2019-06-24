<template lang="pug">
  .news-block(:class="{deffered, 'news-block--admin': admin}")
    template(v-if="!admin")
      .edit(v-if="edit")
        simple-svg(:filepath="'/static/img/edit.svg'")
    template(v-else)
      .edit(v-tooltip.bottom="'Разблокировать'" v-if="blocked")
        simple-svg(:filepath="'/static/img/unblocked.svg'")
      .edit(v-tooltip.bottom="'Заблокировать'" v-else)
        simple-svg(:filepath="'/static/img/blocked.svg'")
    .news-block__deffered(v-if="deffered")
      span.news-block__deffered-text Дата и время публикации: {{info.time | moment('DD.MM.YYYY, HH:mm')}} ({{diffTime(info.time)}})
    .news-block__author(v-if="!deffered")
      a.news-block__author-pic(href="#")
        img(src="/static/img/user/1.jpg" alt="Дмитрий Сергеев")
      .news-block__author-info
        a.news-block__author-name(href="#") Дмитрий Сергеев
        span.news-block__author-time {{info.time | moment("from")}}
    .news-block__content
      .news-block__content-main
        h3.news-block__content-title {{info.title}}
        p.news-block__content-text(ref="text" :class="{lotText: isLotText, open: openText}") {{info.post_text}}
        a.news-block__content-more(href="#" v-if="isLotText" @click.prevent="toggleText") 
          template(v-if="openText") Скрыть
          template(v-else) Читать весь пост
      ul.news-block__content-tags
        li.news-block__content-tag #skillbox
        li.news-block__content-tag #книги
        li.news-block__content-tag #книганедели
        li.news-block__content-tag #подарки
        li.news-block__content-tag #skillboxраспродажа
    .news-block__actions(v-if="!deffered && !admin")
      .news-block__actions-block
        like-comment(:quantity="info.likes" width="16px" height="16px" font-size="15px" @click.native="likeAction")
      .news-block__actions-block
        like-comment(:quantity="55" width="16px" height="16px" font-size="15px" comment)
    .news-block__comments(v-if="!deffered")
      comments(:admin="admin")
</template>

<script>
import moment from 'moment'
import Comments from '@/components/Comments'
import LikeComment from '@/components/LikeComment'
export default {
  name: 'NewsBlock',
  components: { Comments, LikeComment },
  props: {
    info: {
      type: Object,
      default: () => ({
        title: 'Дизайн привычных вещей',
        post_text:
          'А вот и «Книга недели от Skillbox и МИФ». Сегодня делимся с вами книгой «Дизайн привычных вещей» автора Дональда Нормана. В ней Дональд рассказывает об основополагающих принципах, которым нужно следовать, чтобы избежать проблем и превратить привычные вещи в приятные товары, доставляющие нам удовольствие А вот и «Книга недели от Skillbox и МИФ». Сегодня делимся с вами книгой «Дизайн привычных вещей» автора Дональда Нормана. В ней Дональд рассказывает об основополагающих принципах, которым нужно следовать, чтобы избежать проблем и превратить привычные вещи в приятные товары, доставляющие нам удовольствие',
        time: 1559751301818,
        likes: 44,
        id: 1
      })
    },
    edit: Boolean,
    deffered: Boolean,
    admin: Boolean,
    blocked: Boolean
  },
  data: () => ({
    isLotText: false,
    openText: false
  }),
  methods: {
    toggleText() {
      this.openText = !this.openText
    },
    diffTime(time) {
      let now = moment()
      let timePost = moment(time)
      console.log('TCL: diffTime -> time', timePost.diff(now, 'hours') % 24)
      return timePost.calendar(null, {
        sameElse: `[через ${timePost.diff(now, 'days')} дней, ${timePost.diff(now, 'hours') % 24} часа]`
      })
    },
    likeAction() {
      console.log('like')
    }
  },
  mounted() {
    this.$refs.text.offsetHeight > 100 ? (this.isLotText = true) : (this.isLotText = false)
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.news-block {
  background: #FFFFFF;
  box-shadow: standart-boxshadow;
  padding: 30px 40px 0;
  position: relative;

  &.deffered {
    padding-bottom: 20px;

    .edit {
      top: 30px;
    }
  }

  &--admin {
    .news-block__comments {
      margin-top: 20px;
    }
  }

  &+& {
    margin-top: 30px;
  }

  @media (max-width: breakpoint-xxl) {
    padding: 20px 30px 0;
  }
}

.news-block__deffered {
  position: relative;
  height: 45px;
  margin-bottom: 20px;
  display: flex;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: -40px;
    right: -40px;
    bottom: 0;
    width: calc(100% + 80px);
    height: 2px;
    background-color: #e7e7e7;
  }

  @media (max-width: breakpoint-xxl) {
    &:after {
      left: -30px;
      width: calc(100% + 60px);
    }
  }
}

.news-block__deffered-text {
  color: #5F5E7A;
  font-size: 16px;
}

.news-block__author {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.news-block__author-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;

  img {
    width: 100%;
  }
}

.news-block__author-name {
  font-weight: 600;
  font-size: 15px;
  color: #000;
  display: block;
  margin-bottom: 5px;
}

.news-block__author-time {
  font-size: 13px;
  color: santas-gray;
}

.news-block__content {
  display: flex;
}

.news-block__content-main {
  padding-bottom: 20px;
  border-bottom: 1px solid #E7E7E7;
  width: 100%;
}

.news-block__content-title {
  font-family: font-exo;
  font-weight: bold;
  font-size: 24px;
  color: #000;
  margin-bottom: 10px;
}

.news-block__content-text {
  font-size: 15px;
  line-height: 25px;
  color: storm-gray;
  overflow: hidden;
  text-align: justify;
  padding-right: 1em;
  position: relative;

  &:before {
    content: '\02026';
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: white;
  }

  &.lotText {
    max-height: 100px;
  }

  &.open {
    max-height: 100%;
    padding-right: 0;
  }
}

.news-block__content-more {
  display: inline-block;
  margin-top: 10px;
  font-size: 13px;
  color: eucalypt;
}

.news-block__content-tags {
  background-color: #F5F7FB;
  padding: 20px;
  max-width: 230px;
  flex: none;
  align-self: flex-start;
  margin-left: 40px;

  @media (max-width: breakpoint-xxl) {
    margin-left: 20px;
  }
}

.news-block__content-tag {
  color: eucalypt;
  font-size: 13px;
  line-height: 22px;
  display: inline-block;
  margin: 0 7px;
}

.news-block__actions {
  display: flex;
  align-items: center;
  margin: 25px 0;
}

.news-block__actions-block {
  &+& {
    margin-left: 30px;
  }
}
</style>
