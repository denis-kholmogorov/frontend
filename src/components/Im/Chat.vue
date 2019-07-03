<template lang="pug">
  .im-chat
    .im-chat__user
      router-link.im-chat__user-pic(:to="{name: 'ProfileId', params: {id: info.last_message.recipient.id}}")
        img(:src="info.last_message.recipient.photo" :alt="info.last_message.recipient.first_name")
      router-link.im-chat__user-name(:to="{name: 'ProfileId', params: {id: info.last_message.recipient.id}}") {{info.last_message.recipient.first_name + ' ' + info.last_message.recipient.last_name}}
      span.user-status(:class="{online}") {{statusText}}
    .im-chat__message(ref="messageBlock")
      .im-chat__message-day(v-for="day in messages" :key="day.date")
        h5.im-chat__message-title {{day.date | moment('DD MMMM YYYY')}}
        .im-chat__message-block(v-for="mes in day.messages" :key="mes.id" :class="{me: mes.isSentByMe}")
          p.im-chat__message-text {{mes.message_text}}
          span.im-chat__message-time {{mes.time | moment('hh:mm')}}
    form.im-chat__enter(action="#" @submit.prevent="onSubmitMessage")
      input.im-chat__enter-input(type="text" placeholder="Ваше сообщение..." v-model="mes")
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  name: 'ImChat',
  props: {
    info: Object,
    messages: Array,
    online: Boolean
  },
  data: () => ({
    mes: ''
  }),
  computed: {
    statusText() {
      return this.online
        ? 'Онлайн'
        : 'был в сети ' + moment(this.info.last_message.recipient.last_online_time).fromNow()
    }
  },
  methods: {
    ...mapActions('profile/dialogs', ['postMessage']),
    onSubmitMessage() {
      this.postMessage({ id: this.info.id, message_text: this.mes })
      this.mes = ''
    }
  },
  mounted() {
    this.$refs.messageBlock.scrollTop = this.$refs.messageBlock.scrollHeight
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.im-chat {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
}

.im-chat__user {
  border-bottom: 1px solid #E3E8EE;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 40px;
  font-size: 13px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #F8FAFD;
}

.im-chat__user-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.im-chat__user-name {
  font-weight: 600;
  color: steel-gray;
  margin-right: auto;
}

.im-chat__user-status {
  color: #9EA4AD;

  &.online {
    color: eucalypt;
  }
}

.im-chat__message {
  padding: 80px 40px 50px;
  width: 100%;
  overflow-y: scroll;
  height: 100%;
}

.im-chat__message-day {
  &+& {
    margin-top: 50px;
  }
}

.im-chat__message-title {
  color: #8A94A4;
  font-size: 15px;
  margin-bottom: 55px;
  text-align: center;
  display: block;
  width: 100%;
}

.im-chat__message-block {
  display: flex;
  align-items: center;
  max-width: 460px;

  &+& {
    margin-top: 20px;
  }

  &.me + & {
    margin-top: 30px;
  }

  &.me {
    flex-direction: row-reverse;
    max-width: 450px;
    margin-left: auto;

    .im-chat__message-text {
      background-color: eucalypt;
      color: #fff;
      box-shadow: 0px 4px 15px #D4E8DD;
    }

    .im-chat__message-time {
      margin-right: 15px;
      margin-left: 0;
    }
  }
}

.im-chat__message-text {
  background-color: #FFFFFF;
  box-shadow: 0px 4px 15px #EFF1F6;
  border-radius: 20px;
  padding: 15px 20px;
  color: steel-gray;
  font-size: 15px;
  line-height: 23px;
}

.im-chat__message-time {
  font-size: 13px;
  color: #BAC3D0;
  margin-left: 15px;
}

.im-chat__enter {
  display: block;
  width: 100%;
}

.im-chat__enter-input {
  width: 100%;
  background-color: #fff;
  padding: 0 40px;
  font-size: 15px;
  color: steel-gray;
  height: 60px;

  &::placeholder {
    color: #B0B0BC;
  }
}
</style>
