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
    errorMessage: "",
  },
  mounted() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          if (this.products.length < 8) {
            this.products.push(el);
          }
        }
      });
    this.getJson(`${API + this.basketUrl}`)
      .then(data => {
        for (let el of data) {
          this.productsBasket.push(el);
        }
      });
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          if (el.sex === "man" && this.catalogProducts.length < 9) {
          this.catalogProducts.push(el);
          }
        }
      });
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          if (el.sex === "woman" && this.itemProducts.length < 4) {
            this.itemProducts.push(el);
          }
        }
      });
  },
  computed: {
    totalPrice() {
      return this.productsBasket.reduce((accum, el) => accum += el.price * el.quantity, 0);
    }
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          this.errorMessage = error;
        })
    },
    addProduct(product) {
      this.getJson(`${APIGB}/addToBasket.json`)
        .then(data => {
          if (data.result) {
            let find = this.productsBasket.find(el => el.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              let cartProd = Object.assign({quantity: 1}, product);
              this.productsBasket.push(cartProd);
            }
          }
        })
    },
    delProduct(product){
      this.getJson(`${APIGB}/deleteFromBasket.json`)
        .then(data => {
          if(data.result){
            if(product.quantity > 1){
              product.quantity--;
            } else {
              this.productsBasket.splice(this.productsBasket.indexOf(product), 1);
            }
          }
        })
    },
    filterGoods() {
      this.filteredProducts =[];
      let regExp = new RegExp( '(?:^|\\s)' + this.searchLine, 'i');
      this.filteredProducts = this.products.filter(el => regExp.test(el.product_name));
    },
    closeFiltered() {
      this.filteredProducts =[];
    },
  }
});
