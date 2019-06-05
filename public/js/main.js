const API = 'https://raw.githubusercontent.com/Cheglok/JS-Professional/lesson6/db';
const APIGB = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalog.json',
    basketUrl: '/basket.json',
    products: [],
    productsBasket: [],
    catalogProducts: [],
    itemProducts: [],
    isVisibleCart: true,
  },
  mounted() {
    this.getJson(`/api/catalog`)
      .then(data => {
        for (let el of data) {
          if (this.products.length < 8) {
            this.products.push(el);
          }
        }
      })
      .catch(error =>{
        this.$refs.error.setError(error);
      });
    this.getJson(`/api/basket`)
      .then(data => {
        for (let el of data) {
          this.productsBasket.push(el);
        }
      })
      .catch(error =>{
        this.$refs.error.setError(error);
      });
    this.getJson(`/api/catalog`)
      .then(data => {
        for (let el of data) {
          if (el.sex === "man" && this.catalogProducts.length < 9) {
          this.catalogProducts.push(el);
          }
        }
      })
      .catch(error =>{
        this.$refs.error.setError(error);
      });
    this.getJson(`/api/catalog`)
      .then(data => {
        for (let el of data) {
          if (el.sex === "woman" && this.itemProducts.length < 4) {
            this.itemProducts.push(el);
          }
        }
      })
      .catch(error =>{
        this.$refs.error.setError(error);
      });
  },
  computed: {
    totalPrice() {
      return this.productsBasket.reduce((accum, el) => accum += el.price * el.quantity, 0);
    },
    totalQuantity() {
      return this.productsBasket.reduce((accum, el) => accum += el.quantity, 0);
    }
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        })
    },
    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        })
    },
    putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        })
    },
    deleteJson(url, data) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application.json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        })
    },
    addProduct(product) {
      let find = this.productsBasket.find(el => el.id_product === product.id_product);
      if (find) {
        console.log(find);
        this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
          .then(data => {
            if (data.result) {
              find.quantity++;
            }
          })
      } else {
        console.log("Это новый товар");
        let cartProd = Object.assign({quantity: 1}, product);
        this.postJson(`/api/cart`, cartProd)
          .then(data => {
            if (data.result) {
              this.productsBasket.push(cartProd);
            }
          })
      }
    },
    delProduct(product) {
      if (product.quantity > 1) {
        this.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
          .then(data => {
            if (data.result) {
              product.quantity--;
            }
          })
      } else {
        this.deleteJson(`/api/cart/${product.id_product}`)
          .then(data => {
            if (data.result) {
              this.productsBasket.splice(this.productsBasket.indexOf(product), 1);
            }
          })
      }
    },
    clearBasket(){
      this.productsBasket = [];
    },
    message(product){
      console.log("message");
    }
  }
});
