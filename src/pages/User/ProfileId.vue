<template lang="pug">
  .profile.inner-page(v-if="getInfo")
    .inner-page__main
      .profile__info
        profile-info(:info="getInfo" :blocked="getInfo.is_blocked" :friend="getInfo.is_friend" :online="getInfo.is_onlined")
      .profile__news
        .profile__tabs
          span.profile__tab.active Публикации {{getInfo.first_name}} ({{getWall.length}})
        .profile__news-list
          news-block(v-for="news in getWall" :key="news.id" :info="news")
    .inner-page__aside
      friends-possible
</template>

<script>
import FriendsPossible from '@/components/Friends/Possible'
import ProfileInfo from '@/components/Profile/Info'
import NewsBlock from '@/components/News/Block'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ProfileId',
  components: { FriendsPossible, ProfileInfo, NewsBlock },
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters('users/info', ['getInfo', 'getWall'])
  },
  methods: {
    ...mapActions('users/info', ['apiInfo'])
  },
  created() {
    if (!this.getInfo || this.getInfo.id !== this.$route.params.id) this.apiInfo(this.$route.params.id)
  }
}
</script>
