<template lang="pug">
  .search-filter
    .search-filter__block.name
      label.search__label(for="search-people-name") Имя:
      input.search__input(type="text" id="search-people-name" v-model="first_name")
    .search-filter__block.lastname
      label.search__label(for="search-people-lastname") Фамилия:
      input.search__input(type="text" id="search-people-lastname" v-model="last_name")
    .search-filter__block.age
      label.search__label Возраст:
      .search__row
        select.select.search-filter__select(v-model.number="age_from")
          option(value="null" disabled) От
          option(value="31") От 31
          option(value="32") От 32 
          option(value="33") От 33 
        span.search__age-defis —
        select.select.search-filter__select(v-model.number="age_to")
          option(value="null" disabled) До
          option(value="34") До 34
          option(value="35") До 35
          option(value="36") До 36
    .search-filter__block.region
      label.search__label Регион:
      .search__row
        select.select.search-filter__select(v-model.number="country_id")
          option(value="null" disabled) Страна
          option(value="1") Россия
          option(value="2") Англия
          option(value="3") США
        select.select.search-filter__select(v-model.number="city_id")
          option(value="null" disabled) Город
          option(value="1") Москва
          option(value="2") Лондон
          option(value="3") Техас
    .search-filter__block.btn-news(@click.prevent="onSearchUsers")
      button-hover Применить
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SearchFilterUsers',
  data: () => ({
    first_name: null,
    last_name: null,
    age_from: null,
    age_to: null,
    country_id: null,
    city_id: null,
    offset: 0,
    itemPerPage: 20
  }),
  methods: {
    ...mapActions('global/search', ['searchUsers']),
    onSearchUsers() {
      let { first_name, last_name, age_from, age_to, country_id, city_id } = this
      this.searchUsers({ first_name, last_name, age_from, age_to, country_id, city_id })
    }
  }
}
</script>
