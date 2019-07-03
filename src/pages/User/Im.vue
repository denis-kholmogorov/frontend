<template lang="pug">
  .im
    .im__dialogs
      im-dialog(v-for="dialog in dialogs"
      :key="dialog.id" 
      :info="dialog" 
      :push="countPush(dialog.unread_count)" 
      :me="dialog.last_message.isSentByMe" 
      :active="dialog.id === activeDialogId" 
      :online="checkOnlineUser(dialog.last_message.recipient.last_online_time)" 
      @click.native="changeDialog(dialog.id)")
    .im__chat(v-if="activeDialog")
      im-chat(:info="activeDialog" :messages="getMessages" 
      :online="checkOnlineUser(activeDialog.last_message.recipient.last_online_time)" )
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import ImDialog from '@/components/Im/Dialog'
import ImChat from '@/components/Im/Chat'
export default {
  name: 'Im',
  components: { ImDialog, ImChat },
  data: () => ({
    activeDialogId: null,
    activeDialog: null,
    intervalForMessages: null
  }),
  computed: {
    ...mapGetters('profile/dialogs', ['getResultById', 'getMessages']),
    dialogs() {
      return this.getResultById('dialogs')
    }
  },
  methods: {
    ...mapActions('profile/dialogs', ['apiDialogs', 'dialogsMessages']),
    countPush(unread) {
      return unread > 0 ? unread : null
    },
    checkOnlineUser(time) {
      return moment().diff(moment(time), 'seconds') <= 60
    },
    changeDialog(id) {
      this.activeDialogId = id
      this.activeDialog = this.dialogs.find(el => el.id === id)
      this.intervalForMessages = setInterval(() => {
        this.dialogsMessages(id)
      }, 2000)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.apiDialogs().then(() => {
        vm.$route.query.activeDialog
          ? (vm.activeDialogId = vm.$route.query.activeDialog)
          : (vm.activeDialogId = vm.dialogs[0].id)
        vm.activeDialog = vm.dialogs.find(el => el.id === vm.activeDialogId)
        vm.intervalForMessages = setInterval(() => {
          vm.dialogsMessages(vm.activeDialogId)
        }, 2000)
      })
    })
  },
  beforeRouteLeave(to, from, next) {
    this.intervalForMessages = null
    next()
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
