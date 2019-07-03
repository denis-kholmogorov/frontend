<template lang="pug">
  .news.inner-page
    .inner-page__main
      .news__add
        news-add(user)
      .news__list
        news-block(v-for="feed in getFeeds" :key="feed.id" :info="feed")
    .inner-page__aside
      friends-possible
 </template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FriendsPossible from '@/components/Friends/Possible'
import NewsBlock from '@/components/News/Block'
import NewsAdd from '@/components/News/Add'
export default {
  name: 'News',
  components: { FriendsPossible, NewsBlock, NewsAdd },
  computed: {
    ...mapGetters('profile/feeds', ['getFeeds'])
  },
  methods: {
    ...mapActions('profile/feeds', ['apiFeeds'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.apiFeeds()
    })
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.news__add {
  margin-bottom: 30px;
}
</style>
