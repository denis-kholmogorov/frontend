<template lang="pug">
  .main-layout
    main-layout-sidebar
    .main-layout__main
      main-layout-header
      main.main-layout__page
        router-view
</template>

<script>
import MainLayoutHeader from '@/components/MainLayout/Header'
import MainLayoutSidebar from '@/components/MainLayout/Sidebar'
export default {
  components: {
    MainLayoutHeader,
    MainLayoutSidebar
  }
}
</script>

<style lang="stylus">
@import '../assets/stylus/base/vars.styl';

.main-layout {
  display: flex;
  height: 100%;
}

.main-layout__main {
  width: 100%;
  margin-left: sidebar-width;
  height: 100%;

  @media (max-width: breakpoint-xxl) {
    margin-left: sidebar-width-xl;
  }
}

.main-layout__page {
  padding-top: header-height;
  background-color: white-lilac;
  min-height: 100%;
  position: relative;
  z-index: 1;
}
</style>
