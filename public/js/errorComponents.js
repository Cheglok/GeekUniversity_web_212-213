Vue.component('error', {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    setError(text){
      this.text = text;
    }
  },
  template:
  `<div class="error-container" v-if="text">
<h1 class="error-msg">Ошибка! {{text}}</h1>
<button class="error-close" @click="setError('')">Close</button>
</div>`
});