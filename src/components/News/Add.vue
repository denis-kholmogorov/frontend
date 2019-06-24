<template lang="pug">
  .news-add(@click="openForm" :class="{open: isOpen}")
    .news-add__mask(v-if="!isOpen")
      template(v-if="getInfo")
        .news-add__pic(v-if="user")
          img(:src="getInfo.photo" :alt="getInfo.fullName")
      span.news-add__placeholder Поделитесь новостью...
      .news-add__block.photo
        simple-svg(:filepath="'/static/img/photo.svg'")
      .news-add__block.add
        simple-svg(:filepath="'/static/img/add.svg'")
    form.news-add__main(action="#" @submit.prevent="" ref="form" v-else)
      .news-add__text
        input.news-add__text-title(type="text" placeholder="Дайте тему" v-model="title")
        editor-content.news-add__text-main(:editor="editor")
        editor-menu-bar.news-add__actions(:editor="editor" v-slot="{ commands, isActive, getMarkAttrs, menu }" @mouseleave.native="hideLinkMenu")
          .news-add__actions-buttons
            button.bold(:class="{ 'is-active': isActive.bold() }" @click="commands.bold") ж
            button.italic(:class="{ 'is-active': isActive.italic() }" @click="commands.italic") к
            button.underline(:class="{ 'is-active': isActive.underline() }" @click="commands.underline") ч
            .news-add__actions-link
              .news-add__actions-link-hidden(:class="{'is-active': isOpenLinkMenu}")
                form(@submit.prevent="setLinkUrl(commands.link, linkUrl)")
                  input(type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu")
                  button(type="button" @click="setLinkUrl(commands.link, linkUrl)")
                    simple-svg(:filepath="'/static/img/add.svg'")
              button.link(:class="{ 'is-active': isActive.link() }" @click="openLinkMenu(getMarkAttrs('link'))")
                simple-svg(:filepath="'/static/img/link.svg'")
      .news-add__settings
        h4.news-add__settings-title Настройка публикации
        add-tags(:tags="tags" @change-tags="onChangeTags")
        button-hover.news-add__planning(variant="white" bordered @click.native="openModal") Запланировать
        button-hover(@click.native="submitForm") Опубликовать
    modal.news-add__modal(v-model="modalShow")
      v-date-picker(v-model="planingTime" title-position="left" :min-date='new Date()' is-inline :attributes='attrs' :key="componentKey")
      .news-add__modal-selects
        select.select.news-add__modal-select.day(v-model="day" @change="changeDate")
          option(v-for="d in days" :key="d") {{d}}
        select.select.news-add__modal-select.month(v-model="month" @change="changeDate")
          option(v-for="month in months" :key="month.val" :value="month") {{month.text}}
        select.select.news-add__modal-select.year(v-model="year" @change="changeDate")
          option(v-for="i in years" :key="i") {{i}}
        select.select.news-add__modal-select.time(v-model="time")
          option(v-for="t in times" :key="t") {{t}}
      template(slot="actions")
        button-hover(@click.native="onPlaning") Планировать
        button-hover(variant="red" bordered @click.native="closeModal") Отмена
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Bold, Italic, Underline, Link } from 'tiptap-extensions'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import AddTags from '@/components/News/AddTags'
import Modal from '@/components/Modal'

export default {
  name: 'NewsAdd',
  props: {
    user: Boolean
  },
  components: { AddTags, EditorContent, EditorMenuBar, Modal },
  data: () => ({
    title: '',
    isOpen: false,
    tags: ['решай', 'победа', 'очевидноже'],
    editor: null,
    linkUrl: '',
    isOpenLinkMenu: false,
    modalShow: false,
    isPlaning: false,
    planingTime: new Date(),
    componentKey: 0,
    attrs: [
      {
        key: 'weekends',
        content: 'weekends',
        dates: {
          start: new Date(2018, 0, 1),
          end: new Date(2022, 0, 1),
          weekdays: [1, 7]
        }
      }
    ],
    day: 1,
    month: { val: 1, text: 'Января' },
    year: 2000,
    months: [
      { val: 1, text: 'Января' },
      { val: 2, text: 'Февраля' },
      { val: 3, text: 'Марта' },
      { val: 4, text: 'Апреля' },
      { val: 5, text: 'Мая' },
      { val: 6, text: 'Июня' },
      { val: 7, text: 'Июля' },
      { val: 8, text: 'Августа' },
      { val: 9, text: 'Сентября' },
      { val: 10, text: 'Октября' },
      { val: 11, text: 'Ноября' },
      { val: 12, text: 'Декабря' }
    ],
    time: '12:00',
    times: [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00'
    ]
  }),
  computed: {
    ...mapGetters('profile/info', ['getInfo']),
    years() {
      return Array.from({ length: 60 }, (value, index) => 1970 + index)
    },
    days() {
      return this.month.val === 2
        ? this.year & 3 || (!(this.year % 25) && this.year & 15)
          ? 28
          : 29
        : 30 + ((this.month.val + (this.month.val >> 3)) & 1)
    }
  },
  methods: {
    ...mapActions('profile/feeds', ['newFeed']),
    onPlaning() {
      this.isPlaning = true
      this.submitForm()
    },
    openForm() {
      this.isOpen = true
    },
    onChangeTags(tags) {
      this.tags = tags
    },
    submitForm() {
      if (this.title.length <= 6 || this.editor.getHTML().length <= 7) {
        this.isOpen && this.closeModal()
        alert('Введите тему или текст')
        return
      }
      this.newFeed({
        route: this.$route.name,
        id: this.getInfo.id,
        title: this.title,
        post_text: this.editor.getHTML(),
        publish_date:
          this.isPlaning &&
          moment({
            years: this.year,
            months: this.month.val,
            date: this.day,
            hours: this.time.substring(0, 2)
          }).valueOf()
      })
    },
    openLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.isOpenLinkMenu = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.isOpenLinkMenu = false
      this.editor.focus()
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.isOpenLinkMenu = false
    },
    openModal() {
      this.modalShow = true
    },
    closeModal() {
      this.modalShow = false
      this.isPlaning = false
    },
    setInfo(val) {
      this.day = moment(val).date()
      this.month = this.months[moment(val).month()]
      this.year = moment(val).year()
    },
    changeDate() {
      this.componentKey += 1
      this.planingTime = new Date(this.year, this.month.val - 1, this.day)
    }
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>к черту добрые слова!</p>',
      extensions: [new Bold(), new Italic(), new Underline(), new Link()]
    })
    this.day = moment().date()
    this.month = this.months[moment().month()]
    this.year = moment().year()
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.news-add {
  background: #FFFFFF;
  box-shadow: standart-boxshadow;
  cursor: pointer;

  &.open {
    cursor: default;
  }
}

.news-add__mask {
  padding: 0 25px 0 40px;
  height: 60px;
  display: flex;
  align-items: center;
}

.news-add__pic {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.news-add__placeholder {
  color: #B0B0BC;
  font-size: 13px;
  display: block;
  margin-right: auto;
}

.news-add__block {
  cursor: pointer;

  &+& {
    margin-left: 15px;
  }

  &.photo {
    .simple-svg-wrapper {
      width: 22px;
      height: 22px;
    }
  }

  &.add {
    margin-top: -5px;

    .simple-svg-wrapper {
      width: 15px;
      height: 15px;
    }
  }
}

.news-add__main {
  display: flex;
  height: auto;
  min-height: 380px;
  padding: 35px 35px 20px;
}

.news-add__text {
  margin-right: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  border-right: 1px solid #E6E6E6;
}

.news-add__text-title {
  font-family: font-exo;
  font-weight: bold;
  font-size: 24px;
  color: steel-gray;
  margin-bottom: 20px;
  display: block;
  width: 100%;

  &::placeholder {
    color: #CFCFCF;
  }
}

.news-add__text-main {
  font-size: 15px;
  line-height: 26px;
  color: #747487;
  display: block;
  margin-bottom: 10px;
  width: 100%;
  flex: auto;

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  a {
    color: eucalypt;
    font-weight: 600;
    cursor: pointer;
  }
}

.news-add__actions {
  padding-top: 20px;
  border-top: 1px solid #E6E6E6;
}

.news-add__actions-buttons {
  display: flex;
  align-items: center;

  button {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F5F7FB;
    color: #747487;
    cursor: pointer;
    transition: all 0.2s;

    &.is-active {
      background-color: #747487;
      color: #F5F7FB;

      .simple-svg {
        fill: #F5F7FB;
      }
    }

    &.bold {
      font-weight: bold;
    }

    &.italic {
      font-style: italic;
    }

    &.underline {
      text-decoration: underline;
    }

    .simple-svg-wrapper {
      width: 12px;
      height: 12px;
      margin-top: -12px;
    }

    .simple-svg {
      fill: #747487;
    }
  }

  button + button {
    margin-left: 10px;
  }
}

.news-add__actions-link {
  position: relative;
  margin-left: 20px;
}

.news-add__actions-link-hidden {
  position: absolute;
  bottom: calc(100% + 7px);
  left: -20px;
  width: 200px;
  opacity: 0;
  visibility: hidden;
  z-index: 10;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  form {
    display: flex;
    border: 1px solid #e6e6e6;
  }
}

.news-add__settings {
  max-width: 172px;
  width: 100%;
  flex: none;
  display: flex;
  flex-direction: column;
}

.news-add__settings-title {
  font-size: 24px;
  font-family: font-exo;
  color: #4E4D4D;
  margin-bottom: 25px;
}

.news-add__planning {
  margin-bottom: 10px;
}

.news-add__modal {
  .modal__wrapper {
    max-width: 415px;
    padding: 35px 40px;
  }

  .modal__body {
    margin: 0;
    margin-bottom: 30px;
    max-width: 100%;
  }

  .vc-container {
    border: none;
    width: 100%;
  }

  .vc-text-weekends-900 {
    color: wild-watermelon;

    &.vc-text-gray-400 {
      color: rgba(wild-watermelon, 0.5);
    }
  }
}

.news-add__modal-selects {
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  border-top: 1px solid #E6E6E6;
}

.news-add__modal-select {
  font-size: 13px;
  padding: 0 10px;

  &.day {
    width: 55px;
  }

  &.month {
    width: 100px;
  }

  &.year {
    width: 70px;
  }

  &.time {
    width: 70px;
  }
}
</style>
