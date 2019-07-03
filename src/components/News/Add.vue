<template lang="pug">
  .news-add(@click="toggleForm" :class="{open: isOpen}")
    .news-add__mask(v-if="!isOpen")
      template(v-if="getInfo")
        .news-add__pic(v-if="user")
          img(:src="getInfo.photo" :alt="getInfo.fullName")
      span.news-add__placeholder Поделитесь новостью...
      .news-add__block.photo
        simple-svg(:filepath="'/static/img/photo.svg'")
      .news-add__block.add
        simple-svg(:filepath="'/static/img/add.svg'")
    add-form(v-else @submit-complete="toggleForm")
</template>

<script>
import { mapGetters } from 'vuex'
import AddForm from '@/components/News/AddForm'

export default {
  name: 'NewsAdd',
  props: {
    user: Boolean
  },
  components: { AddForm },
  data: () => ({
    isOpen: false
  }),
  computed: {
    ...mapGetters('profile/info', ['getInfo'])
  },
  methods: {
    toggleForm() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
