
<template>
  <div class="main">
    <div class="announcement-bar text-center">
      {{ currentMessage }}
    </div>

    <nav class="navbar navbar-expand-lg custom-navbar px-4">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div class="nav-left d-flex gap-4">
          <router-link to="/product" class="nav-link">SHOP</router-link>
          <router-link to="/product" class="nav-link">DISCOVER</router-link>
        </div>
        <div class="navbar-brand nav-center fw-bold fs-4">HEVI</div>
        <div class="nav-right d-flex gap-4 align-items-center">
          <span class="nav-text d-none d-lg-inline">UNITED STATES / USD</span>
          <span class="nav-text d-none d-md-inline">SUBSCRIBE</span>
          <i class="fas fa-search"></i>
          <i class="fas fa-user"></i>
          <router-link to="/Cart"><i class="fas fa-shopping-cart"></i></router-link>
        </div>
      </div>
    </nav>

    <div class="container products-container mt-5 pt-5">
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in products" :key="product.slug">
          <router-link :to="`/product/${product.slug}`" class="text-decoration-none text-dark">
            <div class="card h-100 product-card border-0 shadow-sm rounded-0">
              <img :src="product.imageUrl" :alt="product.name" class="card-img-top product-image">
              <div class="card-body d-flex flex-column text-left pt-2 pb-3">
                <h5 class="card-title product-name">{{ product.name }}</h5>
                <p class="card-text product-description text-muted">{{ product.description }}</p>
                <div class="product-price-wrapper d-flex justify-content-between align-items-center">
                  <p class="product-price fw-bold mb-0">{{ product.price }}</p>
                  <div class="product-rating">
                    <span v-for="n in 5" :key="n" :class="{ 'filled-star': n <= product.rating }">★</span>
                    <span class="review-count text-muted small">({{ product.reviews }})</span>
                  </div>
                </div>
                <button class="btn add-to-bag-button py-2 rounded-0 mt-3" @click.prevent="addToCart(product)">
                  {{ product.buttonText }}
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      currentMessage: "",
      messages: [
        "ENJOY FREE SHIPPING OVER €150 | SHOP NOW",
        "SIGN UP TO OUR NEWSLETTER FOR 10% OFF",
        "BEST FACE OIL OF 2024 | NOURISHING FACE OIL",
      ],
      messageInterval: null,
      products: [
        {
          name: "Tolerian Purifying cleanser".toUpperCase(),
          slug: "product1",
          price: "$98.00",
          description: "Face Wash for Normal to Oily Skin",
          rating: 5,
          reviews: 20,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw6eebc922/img/tolerianepurifyingfoamingfacialwash/LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATFPackshotFront-1500x1500.jpg",
          buttonText: "ADD TO BAG"
        },
        {
          name: "Sunscreen for Face with SPF".toUpperCase(),
          slug: "product2",
          price: "$38.00",
          description: "Tinted Mineral Sunscreen for Face",
          rating: 1,
          reviews: 1,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwdd860fb8/product/March%202023%20packshot%20updates/883140020899-1_Anthelios50_TintedMineral_LightFluid_50ml.jpg",
          buttonText: "ADD TO BAG"
        },
        {
          name: "Hyaluronic Acid Eye Cream".toLocaleUpperCase(),
          slug: "product3",
          price: "$62.00",
          description: "Hyaluronic Acid Eye Cream",
          rating: 3,
          reviews: 12,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw57e32c17/product/La-Roche-Posay-Hydraphase-HA-Yeux-15ml-BD-000-3337872412646-Front-FSS.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          buttonText: "ADD TO BAG"
        },
        {
          name: "Mela B3 Facial Gel Cleanser".toLocaleUpperCase(),
          slug: "product4",
          price: "$26.00",
          description: "Anti-Aging Facial Cleanser ",
          rating: 2,
          reviews: 2,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw63cb814c/img/3337875890069/1_La%20Roche%20Posay-Mela-%20B3-Cleanser-PACKSHOT.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70",
          buttonText: "ADD TO BAG"
        },
        {
          name: "Multi-Target Patches".toLocaleUpperCase(),
          slug: "product5",
          price: "$12.99",
          description: "Multi-Targeted Patches for Blemishes",
          rating: 4,
          reviews: 15,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dweb8d5979/img/3337875924887/LaRochePosay-Product-Skincare-Effaclar-Duo+M-Patch-3337875924887-ATF-PIM-packshot-front-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70",
          buttonText: "ADD TO BAG"
        },
        {
          name: "Hyaluronic Acid Face Cream".toLocaleUpperCase(),
          slug: "product6",
          price: "$39.00",
          description: "Natural Hyaluronic Acid Face Cream",
          rating: 4,
          reviews: 12,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwc5151070/img/3337875731409/1_Hydraphase-HA-Rich.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          buttonText: "ADD TO BAG"
        },
        {
          name: "Hydraphase Intense Serum ".toLocaleUpperCase(),
          slug: "product7",
          price: "$36.00",
          description: "Rehydrating Serum ",
          rating: 4,
          reviews: 15,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw70bd25fd/img/3337872413353/la-roche-posay-hydraphase-serum-with-hyaluronic-acid-3337872413353-1.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          buttonText: "ADD TO BAG"
        },
        {
          name: "Effaclar Micellar Water".toLocaleUpperCase(),
          slug: "product8",
          price: "$17.99",
          description: "Micellar Water Cleanser for Oily Skin",
          rating: 4.5,
          reviews: 8,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw859507f3/img/effaclarmicellarwaterultra/la-roche-posay-effaclar-micellar-water-for-oily-skin-3337872412516-1.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          buttonText: "ADD TO BAG"
        },
      ]
    };
  },
  mounted() {
    this.currentMessage = this.messages[this.currentIndex];
    this.messageInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      this.currentMessage = this.messages[this.currentIndex];
    }, 2000);

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    clearInterval(this.messageInterval);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbar = document.querySelector(".custom-navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProductIndex = cart.findIndex(item => item.slug === product.slug);

      if (existingProductIndex > -1) {
        // Product already in cart, increment quantity
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 0) + 1;
      } else {
        // Product not in cart, add with quantity 1
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Dispatch a custom event to notify other components (like Navbar) about cart update
      window.dispatchEvent(new Event('cart-updated'));

      console.log('Product added to cart:', product.name, 'Current cart:', cart);
      // Optional: Add a small visual feedback to the user, e.g., a toast notification
      alert(`${product.name} added to cart!`); // For demonstration, consider a more subtle UI feedback in a real app
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Montserrat', sans-serif;
}

.announcement-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
  background-color: #d5e2f5;
  color: #043f7a;
  font-size: 12px;
  font-weight: 600;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-navbar {
  position: fixed;
  top: 30px;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 1040;
  transition: all 0.4s ease;
  padding-top: 15px;
  padding-bottom: 15px;
}

.custom-navbar.scrolled {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.navbar .nav-link,
.navbar .nav-text,
.navbar i {
  font-weight: 500;
  transition: color 0.3s ease;
  color: #333;
}
.navbar-brand {
    font-family: 'LaSegar-Regular', sans-serif;
    color: #333;
    font-weight: bold;
}

.navbar .nav-link:hover,
.navbar .nav-text:hover,
.navbar i:hover,
.navbar-brand:hover {
  color: #294ea4;
}

.products-container {
  padding-top: 100px;
  padding-bottom: 50px;
}

.product-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important;
}

.product-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  z-index: 5;
}

.badge {
  background-color: #f0f0f0;
  color: #333;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 3px;
  white-space: nowrap;
  text-transform: uppercase;
}

.award-badge {
    position: absolute;
    width: 65px;
    height: auto;
    z-index: 6;
}

.top-right-award {
    top: 0px;
    right: 0px;
    left: auto;
}

.bottom-right-award {
    top: 70px;
    right: 0px;
    left: auto;
}

.glamour-award {
    top: 0px;
    right: 0px;
    left: auto;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-name {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
}

.product-description {
  font-size: 0.9em;
  color: #666;
}

.product-price {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
}

.product-rating {
  color: #ccc;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-rating .filled-star {
  color: black;
}

.review-count {
  font-size: 0.8em;
  color: #888;
  margin-left: 5px;
}

.add-to-bag-button {
  background-color: #d5e2f5;
  color: #043f7a;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;
}

.add-to-bag-button:hover {
  background-color: #043f7a;
  color: #fff;
}
</style>
