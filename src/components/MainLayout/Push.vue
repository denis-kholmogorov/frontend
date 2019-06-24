<template lang="pug">
  .push(:class="{open: isOpen}")
    .push__overlay(@click.stop="closePush")
    .push__wrap(:class="{open: isOpen}" ref="wrap")
      .push__list(ref="list")
        .push__item
          .push__img
            img(src="/static/img/user/1.jpg" alt="Артём Иващенко")
          p.push__content
            span.push__content-name Артём Иващенко 
            | опубликовал новую запись 
            span.push__content-preview «Зачем дизайнеру аркебуза?»
          span.push__time Вчера в 18:51
        .push__item
          .push__img
            img(src="/static/img/user/1.jpg" alt="Артём Иващенко")
          p.push__content
            span.push__content-name Артём Иващенко 
            | опубликовал новую запись 
            span.push__content-preview «Зачем дизайнеру аркебуза?»
          span.push__time Вчера в 18:51
        .push__item
          .push__img
            img(src="/static/img/user/1.jpg" alt="Артём Иващенко")
          p.push__content
            span.push__content-name Артём Иващенко 
            | опубликовал новую запись 
            span.push__content-preview «Зачем дизайнеру аркебуза?»
          span.push__time Вчера в 18:51
        .push__item
          .push__img
            img(src="/static/img/user/1.jpg" alt="Артём Иващенко")
          p.push__content
            span.push__content-name Артём Иващенко 
            | опубликовал новую запись 
            span.push__content-preview «Зачем дизайнеру аркебуза?»
          span.push__time Вчера в 18:51
        .push__item
          .push__img
            img(src="/static/img/user/1.jpg" alt="Артём Иващенко")
          p.push__content
            span.push__content-name Артём Иващенко 
            | опубликовал новую запись 
            span.push__content-preview «Зачем дизайнеру аркебуза?»
          span.push__time Вчера в 18:51
        .push__item
          .push__img
            img(src="/static/img/user/1.jpg" alt="Артём Иващенко")
          p.push__content
            span.push__content-name Артём Иващенко 
            | опубликовал новую запись 
            span.push__content-preview «Зачем дизайнеру аркебуза?»
          span.push__time Вчера в 18:51
      a.push__btn(href="#") Показать еще (19)
</template>

<script>
export default {
  name: 'Push',
  props: {
    isOpen: Boolean
  },
  watch: {
    isOpen(val) {
      if (val) this.$refs.list.scrollTop = 0
    }
  },
  methods: {
    closePush() {
      if (!this.isOpen) return
      this.$emit('close-push')
    }
  },
  mounted() {
    if (window.innerHeight - this.$refs.wrap.getBoundingClientRect().top - this.$refs.wrap.offsetHeight < 0) {
      this.$refs.wrap.style.maxHeight = `${window.innerHeight - this.$refs.wrap.getBoundingClientRect().top}px`
    }
    window.onscroll = () => {
      this.closePush()
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.push {
  .push__overlay {
    display: none;
  }

  &.open {
    .push__overlay {
      display: block;
    }
  }
}

.push__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  cursor: default;
}

.push__wrap {
  position: fixed;
  background: #FFf;
  box-shadow: 0px 2px 60px rgba(0, 0, 0, 0.1);
  right: 50px;
  top: header-height;
  width: 100%;
  max-width: 710px;
  max-height: 675px;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: all 0.2s;
  overflow-y: auto;

  &.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  &:before, &:after {
    content: '';
    display: block;
    width: 19px;
    height: 38px;
    position: absolute;
    top: -16px;
  }

  &:before {
    background-image: linear-gradient(115deg, transparent 50%, #fff 50%);
    right: 223px;
  }

  &:after {
    background-image: linear-gradient(245deg, transparent 50%, #fff 50%);
    right: 205px;
  }
}

.push__list {
  overflow-y: auto;
  max-height: 543px;
}

.push__item {
  display: flex;
  align-items: center;
  padding: 35px 0;
  margin: 0 40px;

  &+& {
    border-top: 1px solid #E7E7E7;
  }
}

.push__img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;

  img {
    width: 100%;
  }
}

.push__content {
  width: 100%;
  max-width: 350px;
  margin-right: auto;
  color: steel-gray;
  font-size: 15px;
  line-height: 22px;
}

.push__content-name {
  color: #000;
  font-weight: 600;
}

.push__content-preview {
  color: eucalypt;
  font-weight: 600;
}

.push__time {
  font-size: 15px;
  line-height: 22px;
  color: #5A5A5A;
}

.push__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 0.01em;
  color: eucalypt;
  border-top: 1px solid #E7E7E7;
  height: 85px;
}
</style>
