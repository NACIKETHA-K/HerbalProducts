
<template>
  <div class="container py-5 cart-page-container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="shopping-cart-title">SHOPPING CART</h2>
      <router-link to="/" class="continue-shopping-link">Continue shopping</router-link>
    </div>

    <div v-if="cart.length === 0" class="alert alert-info">Your cart is empty.</div>

    <div v-else class="row">
      <div class="col-lg-8">
        <div class="cart-item-list">
          <div class="row align-items-center cart-item-row py-3" v-for="(item, index) in cart" :key="index">
            <div class="col-md-2 col-4 item-thumbnail">
              <img :src="item.imageUrl" :alt="item.name" class="img-fluid rounded">
            </div>
            <div class="col-md-6 col-8 item-details">
              <h5 class="item-name">{{ item.name }}</h5>
              <p class="mb-1 item-price">€{{ parsePrice(item.price).toFixed(2) }}</p>
              <div class="quantity-controls d-flex align-items-center">
                <span class="mb-0 me-2 quantity-text">Quantity: {{ item.quantity }}</span>
                <button class="btn btn-sm btn-outline-secondary qty-btn" @click="decreaseQuantity(index)">-</button>
                <span class="mx-2 current-qty-display">{{ item.quantity }}</span>
                <button class="btn btn-sm btn-outline-secondary qty-btn" @click="increaseQuantity(index)">+</button>
              </div>
            </div>
            <div class="col-md-4 text-md-end text-start mt-3 mt-md-0 item-total">
              <p class="fw-bold mb-0 total-price">€{{ calculateItemTotal(item) }}</p>
              <button class="btn btn-sm btn-link remove-btn" @click="removeFromCart(index)">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="order-summary-card p-4 rounded shadow-sm">
          <div class="free-shipping-banner mb-3 p-2 text-center rounded">
            You qualified for free shipping!
          </div>

          <div class="d-flex justify-content-between align-items-baseline mb-4 summary-total-line">
            <h4 class="mb-0">TOTAL</h4>
            <h4 class="mb-0 fw-bold">€{{ calculateCartTotal }}</h4>
          </div>

          <button class="btn btn-primary w-100 py-3 mb-3 checkout-main-btn" @click="proceedToCheckout">CHECKOUT! €{{ calculateCartTotal }}</button>

          <p class="shipping-taxes-info text-muted text-center">Shipping and taxes calculated at checkout</p>

          <div class="coupon-section mb-4">
            <label for="couponCode" class="form-label coupon-label">Coupon code</label>
            <div class="input-group">
              <input type="text" id="couponCode" class="form-control coupon-input" placeholder="Enter coupon">
              <button class="btn btn-outline-secondary apply-button" type="button">APPLY</button>
            </div>
          </div>

          <div class="payment-methods text-center">
            <div class="d-flex justify-content-center flex-wrap gap-2 payment-icons">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="Mastercard" class="payment-icon"/>
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_76x48.png" alt="PayPal" class="payment-icon"/>
              <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="Visa" class="payment-icon"/>
              <img src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-bluebox-solid.svg" alt="American Express" class="payment-icon"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/768px-Apple_Pay_logo.svg.png" alt="Apple Pay" class="payment-icon"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/768px-Google_Pay_Logo.svg.png" alt="Google Pay" class="payment-icon"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Shop_Pay_logo.svg/1025px-Shop_Pay_logo.svg.png" alt="Shop Pay" class="payment-icon shop-pay-icon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartPage',
  data() {
    return {
      cart: []
    };
  },
  computed: {
    calculateCartTotal() {
      const total = this.cart.reduce((sum, item) => sum + this.parsePrice(item.price) * (item.quantity || 0), 0);
      return total.toFixed(2);
    }
  },
  methods: {
    parsePrice(priceString) {
      if (typeof priceString !== 'string') {
        console.warn('parsePrice received non-string value:', priceString);
        return parseFloat(String(priceString).replace(/[^\d.]/g, '')) || 0;
      }
      return parseFloat(priceString.replace(/[^\d.]/g, ''));
    },
    calculateItemTotal(item) {
      const total = this.parsePrice(item.price) * (item.quantity || 0);
      return total.toFixed(2);
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCartGlobal();
    },
    increaseQuantity(index) {
      if (this.cart[index]) {
        this.cart[index].quantity = (this.cart[index].quantity || 0) + 1;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartGlobal();
      }
    },
    decreaseQuantity(index) {
      if (this.cart[index]) {
        this.cart[index].quantity -= 1;

        // ✅ Remove item if quantity reaches 0
        if (this.cart[index].quantity <= 0) {
          this.cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartGlobal();
      }
    },
    loadCart() {
      const storedCart = localStorage.getItem('cart');
      this.cart = storedCart ? JSON.parse(storedCart).map(item => ({...item, quantity: item.quantity || 1 })) : [];
    },
    updateCartGlobal() {
      window.dispatchEvent(new Event('cart-updated'));
    },
    proceedToCheckout() {
      localStorage.setItem('totalPrice', this.calculateCartTotal);
      this.$router.push({ name: 'cart-payment' });
    }
  },
  mounted() {
    this.loadCart();
    window.addEventListener('cart-updated', this.loadCart);
  },
  beforeUnmount() {
    window.removeEventListener('cart-updated', this.loadCart);
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

.cart-page-container {
  max-width: 1140px; /* Increased max-width for a wider, less "rushed" look */
  padding-top: 100px;
  font-family: 'Poppins', sans-serif;
}

.shopping-cart-title {
  font-size: 2.2rem;
  font-weight: 300;
  text-transform: uppercase;
}

.continue-shopping-link {
  font-size: 0.9rem;
  color: #000;
  text-decoration: underline;
}



.cart-item-row {
  border-bottom: 1px solid #3498db;
  padding-bottom: 15px;
  margin-bottom: 15px;
  position: relative;
}

.cart-item-row:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.item-thumbnail img {
  width: 100%;
  max-height: 120px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details .item-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.item-details .item-price {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

.quantity-controls {
    font-size: 0.95rem;
    color: #666;
}

.qty-btn {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 4px;
}

.current-qty-display {
    min-width: 25px;
    text-align: center;
}

.item-total .total-price {
  font-size: 1.2rem;
  color: #333;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 0;
  color: #999;
  font-size: 1.2rem;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #dc3545;
}

.order-summary-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

.free-shipping-banner {
  background-color: #d4edda;
  color: #155724;
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid #c3e6cb;
}

.summary-total-line h4 {
  font-size: 1.4rem;
}

.checkout-main-btn {
  background-color: #3498db;
  border-color: #3498db;
  font-weight: 600;
  font-size: 1.2rem;
  transition: background-color 0.2s, border-color 0.2s;
}

.checkout-main-btn:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}

.shipping-taxes-info {
  font-size: 0.85rem;
  color: #777;
}

.coupon-label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.coupon-input {
  border-color: #ccc;
  font-size: 0.9rem;
}

.apply-button {
  background-color: #f8f9fa;
  border-color: #ccc;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
}

.apply-button:hover {
  background-color: #e2e6ea;
  border-color: #adadad;
}

.payment-icons img {
  height: 15px;
  object-fit: contain;
}

.payment-icons .shop-pay-icon {
    height: 15px;
}

@media (max-width: 991.98px) {
  .order-summary-card {
    margin-top: 30px;
  }
}

@media (max-width: 767.98px) {
  .cart-item-row .col-md-6,
  .cart-item-row .col-md-4 {
    text-align: start !important;
    margin-top: 10px;
  }
  .item-details {
    padding-left: 15px;
  }
  .remove-btn {
    position: static;
    display: inline-block;
    margin-left: 0;
  }
}

@media (max-width: 575.98px) {
  .shopping-cart-title {
    font-size: 1.2rem;
  }
  .continue-shopping-link {
    font-size: 0.8rem;
  }
  .item-thumbnail img {
    width: 60px;
    height: 60px;
  }
  .item-details .item-name {
    font-size: 0.9rem;
  }
  .item-price, .quantity-text, .current-qty-display {
    font-size: 0.85rem;
  }
  .total-price {
    font-size: 1rem;
  }
  .free-shipping-banner, .coupon-label, .coupon-input, .apply-button {
    font-size: 0.8rem;
  }
  .checkout-main-btn {
    font-size: 1rem;
    padding: 10px 20px;
  }
  .qty-btn {
      width: 25px;
      height: 25px;
      font-size: 1em;
  }
}
</style>
