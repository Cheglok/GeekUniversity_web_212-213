Vue.component('error', {
  props: ["error"],
  template:
  `<h1 class="error-msg" v-if="error">Ошибка! {{error}}</h1>`
});