<template lang="pug">
  .friends.inner-page
    .inner-page__main
      template(v-if="loading")
        h2.friends__title Загрузка списка друзей
      template(v-else)
        template(v-if="friends.length > 0")
          .friends__header
            h2.friends__title Мои друзья
            .friends__search
              .friends__search-icon
                simple-svg(:filepath="'/static/img/search.svg'")
              input.friends__search-input(placeholder="Начните вводить имя друга...")
          .friends__list
            friends-block(friend v-for="friend in friends" :key="friend.id" :info="friend")
        h2.friends__title(v-else) У вас еще нету друзей
    .inner-page__aside
      friends-possible
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FriendsPossible from '@/components/Friends/Possible'
import FriendsBlock from '@/components/Friends/Block'
export default {
  name: 'Friends',
  components: { FriendsPossible, FriendsBlock },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters('profile/friends', ['getResultById']),
    friends() {
      return this.getResultById('friends')
    }
  },
  methods: {
    ...mapActions('profile/friends', ['apiFriends'])
  },
  mounted() {
    if (this.friends.length === 0)
      this.apiFriends().then(() => {
        this.loading = false
      })
  }
}
</script>
