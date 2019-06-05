Vue.component('products', {
  props: ["products"],
  template:
    `<ul class="products-list">
        <product
        v-for="product of products"
        :key="product.id_product"
        :product="product"
        ></product>
      </ul>`
});
Vue.component('product', {
    props: ["product"],
    template: `<li class="products-list-item">
                <a href="item.html" class="product-list-item-link">
                  <img width = "261" height = "280" :src="product.src" :alt="product.alt">
                    <p>{{product.product_name}}<br>
                    <span>'$'{{product.price}}</span></p>
                  <div class="buy-shadow"></div>
                </a>
                <div class="product-list-item-options">
                  <button type="button" class="products-buy" @click="$parent.$emit('add-product', product)">Add to Cart</button>
                </div>
              </li>`
}
);