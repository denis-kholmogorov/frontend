<template lang="pug">
  .settings-sidebar
    h2.settings-sidebar__title Настройки
    ul.settings-sidebar__list
      li.settings-sidebar__item(v-for="item in list" :key="item.component" :class="{active: item.component === value}" @click="changeComponent(item)") {{item.text}}
</template>

<script>
export default {
  name: 'SettingsSidebar',
  props: {
    value: String
  },
  data: () => ({
    list: [
      { component: 'settings-main', text: 'Основные' },
      { component: 'settings-push', text: 'Настройка оповещений' },
      { component: 'settings-security', text: 'Безопасность' },
      { component: 'settings-delete', text: 'Удалить профиль' }
    ]
  }),
  methods: {
    changeComponent(item) {
      this.$emit('change-component', item)
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.settings-sidebar {
  background: #fff;
  box-shadow: standart-boxshadow;
  padding: 30px 40px 0;

  @media (max-width: breakpoint-xl) {
    background: transparent;
    box-shadow: none;
    padding: 0;
  }
}

.settings-sidebar__title {
  margin-bottom: 15px;
  font-family: font-exo;
  font-size: 24px;
  font-weight: 600;

  @media (max-width: breakpoint-xl) {
    display: none;
  }
}

.settings-sidebar__list {
  @media (max-width: breakpoint-xl) {
    display: flex;
  }
}

.settings-sidebar__item {
  color: rgba(#000, 0.5);
  font-size: 15px;
  padding: 30px 0;
  border-top: 1px solid #e6e6e6;
  cursor: pointer;

  &.active {
    cursor: default;
    font-weight: 600;
    color: eucalypt;
  }

  @media (max-width: breakpoint-xl) {
    padding: 0;
    color: steel-gray;
    border-top: none;
    display: block;
    padding: 20px;
    flex: auto;
  }
}
</style>
