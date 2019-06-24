<template lang="pug">
  .im
    .im__dialogs
      im-dialog(online :push="4")
      im-dialog(active)
      im-dialog(online me)
      im-dialog
    .im__chat
      im-chat
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ImDialog from '@/components/Im/Dialog'
import ImChat from '@/components/Im/Chat'
export default {
  name: 'Im',
  components: { ImDialog, ImChat },
  computed: {
    ...mapGetters('profile/dialogs', ['getResultById']),
    dialogs() {
      return this.getResultById('dialogs')
    }
  },
  methods: {
    ...mapActions('profile/dialogs', ['apiDialogs'])
  },
  mounted() {
    if (this.dialogs.length === 0) this.apiDialogs()
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.im {
  display: flex;
  height: 'calc(100vh - %s)' % header-height;
}

.im__dialogs {
  width: 100%;
  max-width: 39.13%;
  overflow-y: auto;
  max-height: 100%;
  height: 100%;
  background-color: #F2F5F9;

  @media (max-width: breakpoint-xl) {
    max-width: 120px;
  }
}

.im__chat {
  width: 100%;
  flex: auto;
  height: 100%;
  background-color: #F8FAFD;
}
</style>
