Vue.component('cart', {
  props: ["cartItems", "visibility", "totalPrice"],
  template: `<div class="modal-cart" v-if="visibility">
              <p class="empty-basket" v-if="!cartItems.length">Корзина пуста</p>
              <item
              v-for="product of cartItems"
              :key="product.id_product"
              :cart-item="product"
              ></item>
              <p class="total-price" v-if="cartItems.length"><b>Total</b><b>\${{ totalPrice }}</b></p>
              <a href="checkout.html" class="checkout-button">Checkout</a>
              <a href="shopping-cart.html" class="go-to-cart">Go&nbsp;to&nbsp;cart</a>
            </div>`
});
Vue.component('item', {
  props: ["cartItem"],
  template: `<div class="item-in-cart">
                <img width="72" height="85" :src="cartItem.src" :alt="cartItem.alt">
                <div class="description">
                  <h3>{{cartItem.product_name}}</h3>
                  <div class="rating-stars"><span class="visually-hidden"> 4,5 stars</span></div>
                  <span>{{cartItem.quantity}}x \${{cartItem.price}}</span>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true" @click = "$parent.$emit('remove', cartItem)"></i>
              </div>`
});