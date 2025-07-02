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
          <i class="fas fa-shopping-cart"></i>
        </div>
      </div>
    </nav>

    <div class="container products-container mt-5 pt-5">
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in products" :key="product.name">
          <router-link :to="`/product/${product.name}`" class="text-decoration-none text-dark">


          <div class="card h-100 product-card border-0 shadow-sm rounded-0">
            <div class="product-badges">
              <div v-for="badge in product.badges" :key="badge" class="badge bg-light text-dark mb-1">
                {{ badge }}
              </div>
              <img v-if="product.name === 'NOURISHING FACE OIL' && product.awardImages[0]" :src="product.awardImages[0]" alt="GetGloss Award 2023" class="award-badge top-right-award">
              <img v-if="product.name === 'NOURISHING FACE OIL' && product.awardImages[1]" :src="product.awardImages[1]" alt="GetGloss Award 2024" class="award-badge bottom-right-award">
              <img v-if="product.name === 'HYALURONIC ACID FACE SERUM' && product.awardImages[0]" :src="product.awardImages[0]" alt="As Seen In Glamour" class="award-badge glamour-award">
            </div>
            <img :src="product.imageUrl" :alt="product.name" class="card-img-top product-image">
            <div class="card-body d-flex flex-column text-center pt-2 pb-3">
              <h5 class="card-title product-name mb-1">{{ product.name }}</h5>
              <p class="card-text product-description text-muted mb-2">{{ product.description }}</p>
              <div class="product-rating mb-2">
                <span v-for="n in 5" :key="n" :class="{ 'filled-star': n <= product.rating }">&#9733;</span>
                <span class="review-count text-muted small">({{ product.reviews }})</span>
              </div>
              <p class="product-price fw-bold mb-3 mt-auto">{{ product.price }}</p>
              <button class="btn add-to-bag-button py-2 rounded-0">
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
      bannerImages: [
        { image: "girl2.png", alt: "Fashion Model 1" },
        { image: "girl1.png", alt: "Fashion Model 2" },
        { image: "girl1.png", alt: "Fashion Model 3" },
      ],
      messageInterval: null,
      products: [
        {
          name: "NOURISHING FACE OIL",
          price: "$98.00",
          description: "Radiance Enhancing Nordic Super Berries",
          rating: 5,
          reviews: 20,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw6eebc922/img/tolerianepurifyingfoamingfacialwash/LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATFPackshotFront-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image from your screenshot
          badges: ["BESTSELLER"],
          awardImages: [ // GETGLOSS BEAUTY AWARDS GOLD 2024
          ],
          buttonText: "ADD TO BAG" // Added button text
        },
        {
          name: "HYALURONIC ACID FACE SERUM",
          price: "$94.00",
          description: "Super Hydrating Seaweed + Tremella",
          rating: 5,
          reviews: 10,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw85a71660/img/3337875660570/LaRochePosay-Product-Skincare-PureVitaminC12-30ml-3337875909235-PackshotFront-shadow-1500x1500-Rev.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image from your screenshot
          badges: ["BESTSELLER"],
          awardImages: [// AS SEEN IN GLAMOUR
          ],
          buttonText: "ADD TO BAG" // Added button text
        },
        {
          name: "CLARIFYING CLAY MASK",
          price: "$38.00",
          description: "Detoxifying Natural Blue Clays",
          rating: 1, // Based on the single star shown
          reviews: 1,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwdd860fb8/product/March%202023%20packshot%20updates/883140020899-1_Anthelios50_TintedMineral_LightFluid_50ml.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image from your screenshot
          badges: ["NEW"],
          buttonText: "ADD TO BAG",
          awardImages: []
        },
        {
          name: "EYE ELIXIR",
          price: "$62.00",
          description: "Awakening Tea Extracts + Brightening Berries",
          rating: 2, // Based on the two stars shown
          reviews: 2,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwc5151070/img/3337875731409/1_Hydraphase-HA-Rich.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70", // Image from your screenshot
          badges: [],
          buttonText: "ADD TO BAG", // Added button text
          awardImages: []
        }
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
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

/* Global Styles & Header */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Montserrat', sans-serif; /* Apply Montserrat to body */
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
  top: 30px; /* Below the announcement bar */
  left: 0;
  width: 100%;
  background-color: transparent; /* Initially transparent */
  z-index: 1040;
  transition: all 0.4s ease;
  padding-top: 15px; /* Add some padding to the navbar */
  padding-bottom: 15px;
}

/* Navbar background on scroll */
.custom-navbar.scrolled {
  background-color: #fff; /* White background when scrolled */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.navbar .nav-link,
.navbar .nav-text,
.navbar i {
  font-weight: 500;
  transition: color 0.3s ease;
  color: #333; /* Default text color for navbar links */
}
.navbar-brand {
    font-family: 'LaSegar-Regular', sans-serif; /* Assuming LaSegar-Regular is imported or defined */
    color: #333; /* Default color for brand */
    font-weight: bold;
}


.navbar .nav-link:hover,
.navbar .nav-text:hover,
.navbar i:hover,
.navbar-brand:hover {
  color: #294ea4; /* Hover color */
}

/* Product Cards Container */
/* Using Bootstrap's container and row for layout */
.products-container {
  padding-top: 100px; /* Top padding to clear fixed header */
  padding-bottom: 50px; /* Bottom padding for space */
}

/* Individual Product Card */
.product-card {
  position: relative; /* For absolute positioning of badges */
  overflow: hidden; /* To contain absolutely positioned children */
  display: flex; /* Make it a flex container */
  flex-direction: column; /* Stack children vertically */
}

.product-card:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important; /* More pronounced shadow on hover */
}

/* Product Badges (BESTSELLER, NEW) */
.product-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px; /* Space between badges */
  align-items: flex-start;
  z-index: 5; /* Ensure badges are above image */
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

/* Award Badges (Images) */
.award-badge {
    position: absolute;
    width: 65px; /* Adjust size as needed */
    height: auto;
    z-index: 6; /* Ensure award badges are above text badges */
    /* Remove transformX, rely on right positioning */
}

.top-right-award {
    top: 0px; /* Position relative to the top of the card */
    right: 0px; /* Position relative to the right of the card */
    left: auto; /* Ensure it's not influenced by left positioning */
}

.bottom-right-award {
    top: 70px; /* Position below the first award badge */
    right: 0px;
    left: auto;
}

.glamour-award {
    top: 0px;
    right: 0px;
    left: auto;
}


/* Product Image */
.product-image {
  max-width: 100%;
  height: auto;
  /* Removed margin-bottom, let card-body padding handle spacing */
}

/* Product Information */
/* Using Bootstrap's card-body with d-flex and flex-column */
.product-info {
  /* No custom styles needed here, Bootstrap classes handle it */
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

/* Product Rating (Stars) */
.product-rating {
  color: #ccc; /* Default star color (unfilled) */
  font-size: 1.2em; /* Size of stars */
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-rating .filled-star {
  color: #ffc107; /* Gold for filled stars */
}

.review-count {
  font-size: 0.8em;
  color: #888;
  margin-left: 5px;
}

/* Add to Bag Button */
.add-to-bag-button {
  background-color: #d5e2f5;
  color: #043f7a;
  border: none;
  /* Removed padding, using Bootstrap's py-2 */
  /* Removed margin-top, using Bootstrap's mb-3 */
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%; /* Take full width of parent column */
}

.add-to-bag-button:hover {
  background-color: #043f7a;
  color: #fff;
}
</style>