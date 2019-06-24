import Vue from 'vue'

Vue.filter('phone', phone => {
  if (!phone) return ''
  return phone.substr(0, 1) == 8 ?
    `${phone.substr(0, 1)} ${phone.substr(2, 3)} ${phone.substr(4, 3)}-${phone.substr(7, 2)}-${phone.substr(9, 2)}` :
    `${phone.substr(0, 2)} ${phone.substr(2, 3)} ${phone.substr(5, 3)}-${phone.substr(8, 2)}-${phone.substr(10, 2)}`
})
