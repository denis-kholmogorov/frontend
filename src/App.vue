<template lang="pug">
  #app
    component(:is="layout")
      router-view
</template>

<script>
import FormLayout from '@/layouts/FormLayout'
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'

export default {
  name: 'App',
  components: {
    FormLayout,
    MainLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  }
}
</script>

<style lang="stylus">
@import './assets/stylus/main.styl';
</style>
