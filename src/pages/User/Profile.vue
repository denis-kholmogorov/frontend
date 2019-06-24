<template lang="pug">
  .profile.inner-page
    .inner-page__main
      .profile__info
        profile-info(me online :info="getInfo")
      .profile__news
        .profile__tabs
          span.profile__tab(@click="changeTab('published')" :class="{active: activeTab === 'published'}") Мои публикации (7)
          span.profile__tab(@click="changeTab('queue')" :class="{active: activeTab === 'queue'}") Отложенные публикации (5)
        .profile__add
          news-add
        .profile__news-list
          news-block(edit :deffered="activeTab === 'queue'" v-for="news in activeWall" :key="news.id" :info="news")
    .inner-page__aside
      friends-possible
</template>

<script>
import FriendsPossible from '@/components/Friends/Possible'
import ProfileInfo from '@/components/Profile/Info'
import NewsAdd from '@/components/News/Add'
import NewsBlock from '@/components/News/Block'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Profile',
  components: { FriendsPossible, ProfileInfo, NewsAdd, NewsBlock },
  data: () => ({
    activeTab: 'published'
  }),
  computed: {
    ...mapGetters('profile/info', ['getInfo']),
    ...mapGetters('users/info', ['getWall']),
    activeWall() {
      return this.getWall[this.activeTab]
    }
  },
  methods: {
    ...mapActions('users/info', ['apiWall']),
    changeTab(tab) {
      this.activeTab = tab
      if (tab === 'queue' && this.getWall.queue.length === 0) this.apiWall({ id: this.getInfo.id, queue: true })
    }
  }
}
</script>
