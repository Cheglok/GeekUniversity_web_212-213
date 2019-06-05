Vue.component('shoppingCart', {
  props: ["products"],
  template:
    `<table class="basket-contents-table">
        <tr>
          <th>Product details</th>
          <th>Unite price</th>
          <th>Quantity</th>
          <th>Shipping</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
        <product
        v-for="product of products"
        :key="product.id_product"
        :product="product"
        ></product>
</table>
`
});

Vue.component('product', {
  props: ["product"],
  template:
    `<tr>
          <td class="basket-contents-item">
            <img :src="product.src" :alt="product.alt" width="100" height="115">
            <h4>{{product.product_name}}</h4>
            <div class="rating-stars"></div>
            <p>Color:<span class="value">Red</span></p>
            <p>Size:<span class="value">XLL</span></p>
          </td>
          <td>\${{product.price}}</td>
          <td><input type="number" min="1" max="10" step="1" v-model.number="product.quantity"
           @keydown.prevent=""></td>
          <td>Free</td>
          <td>\${{product.price * product.quantity}}</td>
          <td>
            <i class="fa fa-times-circle" aria-hidden="true" @click = "$parent.$emit('remove', product)"></i>            
          </td>
        </tr>`
});