<template lang="pug">
  .im
    .im__dialogs
      im-dialog(v-for="dialog in dialogs"
      :key="dialog.id"
      :info="dialog"
      :push="countPush(dialog.unread_count)"
      :me="dialog.last_message.isSentByMe"
      :active="activeDialog && dialog.id === activeDialog.id"
      :online="checkOnlineUser(dialog.last_message.recipient.last_online_time)"
      @click.native="clickOnDialog(dialog.id)")
    .im__chat(v-if="activeDialog")
      im-chat(:info="activeDialog" :messages="getMessages"
      :online="checkOnlineUser(activeDialog.last_message.recipient.last_online_time)" )
    real-time-updater
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import ImDialog from '@/components/Im/Dialog'
import ImChat from '@/components/Im/Chat'
import RealTimeUpdater from '@/components/RealTimeUpdater'
export default {
  name: 'Im',
  components: { ImDialog, ImChat, RealTimeUpdater },
  // data: () => ({
  //   intervalForMessages: null
  // }),
  computed: {
    ...mapGetters('profile/dialogs', ['getMessages', 'activeDialog', 'dialogs', 'dialogsLoaded']),
  },
  methods: {
    ...mapActions('profile/dialogs', ['apiDialogs', 'dialogsMessages', 'switchDialog']),
    countPush(unread) {
      return unread > 0 ? unread : null
    },
    checkOnlineUser(time) {
      return moment().diff(moment(time), 'seconds') <= 60
    },
    clickOnDialog(dialogId) {
      this.$router.push({ name: 'Im', query: { activeDialog: dialogId } })
    },
    selectDialogByRoute(route, vm) {
      if (route.query.activeDialog) {
          vm.switchDialog(route.query.activeDialog);
      } else if (vm.dialogs.length > 0) {
          vm.$router.push({ name: 'Im', query: { activeDialog: vm.dialogs[0].id } })
      } else {
        console.log("No dialogs at all")
      }
  }
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      if (!vm.dialogsLoaded) {
        await vm.apiDialogs(vm.to)
      }
      vm.selectDialogByRoute(to, vm);
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.selectDialogByRoute(to, this);
    next();
  },
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
