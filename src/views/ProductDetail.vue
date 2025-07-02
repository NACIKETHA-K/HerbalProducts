<template>
  <div class="container mt-5 pt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-3">
            <div class="d-flex flex-column align-items-center">
              <img
                v-for="(thumb, index) in product?.thumbnailImages"
                :key="index"
                :src="thumb"
                alt="Product thumbnail"
                class="img-fluid mb-2 thumbnail-image"
                :class="{ 'border border-dark': selectedImage === thumb }"
                @click="selectImage(thumb)"
              />
            </div>
          </div>
          <div class="col-9">
            <div class="main-image-container position-relative">
              <img
                :src="selectedImage || product?.imageUrl"
                alt="Main Product Image"
                class="img-fluid main-product-image"
              />
              <span v-if="product?.badges && product.badges.includes('BESTSELLER')" class="badge-overlay">BESTSELLER</span>
            </div>
            <div v-if="product?.customerQuote" class="customer-quote mt-3 p-3 bg-light rounded">
              <p class="mb-1">"{{ product.customerQuote.text }}"</p>
              <footer class="blockquote-footer mt-1">{{ product.customerQuote.author }}</footer>
            </div>
             <div class="mt-4 text-center">
                <img :src="product?.secondPersonQuote?.imageUrl" alt="Person" class="img-fluid rounded-circle" style="width: 80px; height: 80px; object-fit: cover;">
                <p class="mt-2" style="font-size: 0.9em;">"{{ product?.secondPersonQuote?.text }}"</p>
                <footer class="blockquote-footer mt-1" style="font-size: 0.8em;">{{ product?.secondPersonQuote?.author }}</footer>
             </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h1>{{ product?.name }}</h1>
          <span v-if="product?.inStock" class="text-success small">
            <span class="dot bg-success me-1"></span> In stock
          </span>
        </div>

        <div class="d-flex align-items-center mb-3">
          <div class="rating-stars me-2">
            <span v-for="n in 5" :key="n" :class="{ 'filled-star': n <= product?.rating }" class="star">★</span>
          </div>
          <span class="small text-muted">({{ product?.reviews }} Reviews)</span>
        </div>

        <p class="h4 mb-4">{{ product?.price }}</p>

        <div class="d-flex flex-wrap mb-3">
          <span
            v-for="benefit in product?.benefits"
            :key="benefit"
            class="badge text-uppercase me-2 mb-2 product-badge"
          >
            {{ benefit }}
          </span>
        </div>

        <div class="mb-4">
          <p class="small text-uppercase fw-bold mb-1">Skin Types:</p>
          <p class="mb-0">{{ product?.skinTypes.join(', ') }}</p>
        </div>

        <p class="mb-4">{{ product?.description }}</p>

        <div class="card p-3 mb-4 subscription-options">
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="purchaseOption" id="subscribe" value="subscribe" checked>
            <label class="form-check-label fw-bold" for="subscribe">
              Subscribe + save 15% <a href="#" class="text-decoration-underline ms-1">Learn more</a>
            </label>
          </div>
          <select class="form-select mb-3" style="width: auto;">
            <option value="30">every 30 days</option>
            <option value="60">every 60 days</option>
            <option value="90">every 90 days</option>
          </select>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="purchaseOption" id="oneTime" value="oneTime">
            <label class="form-check-label fw-bold" for="oneTime">
              One time delivery
            </label>
          </div>
        </div>

        <div class="d-flex align-items-center mb-4">
          <div class="input-group quantity-selector me-3" style="width: 120px;">
            <button class="btn btn-outline-secondary" type="button" @click="decreaseQuantity">-</button>
            <input type="text" class="form-control text-center" v-model.number="quantity" readonly>
            <button class="btn btn-outline-secondary" type="button" @click="increaseQuantity">+</button>
          </div>
          <button class="btn btn-dark add-to-bag-btn me-2 flex-grow-1">
            {{ product?.buttonText }}
          </button>
          <button class="btn btn-outline-dark shop-pay-btn">
            <img src="https://shop.app/cdn/shopifycloud/shop/assets/svg/shop-logo-dark.svg" alt="Shop Pay" style="height: 20px; vertical-align: middle;">
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      quantity: 1,
      selectedImage: null, // To manage which image is displayed in the main view
      allProducts: [
        {
          name: "NOURISHING FACE OIL",
          price: "$98.00",
          description: "A blend of radiance boosting Nordic super berries and therapeutic flowers: replenishing Lingonberry, soothing Sea Buckthorn, calming Chamomile and an abundance of antioxidants, vitamins and Omega-3, -6, -7 and -9.",
          rating: 5,
          reviews: 20,
          inStock: true,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw6eebc922/img/tolerianepurifyingfoamingfacialwash/LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATFPackshotFront-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Main product image URL
          thumbnailImages: [ // Replace with actual thumbnail image URLs
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw6bff9255/img/tolerianepurifyingfoamingfacialwash/02_La-Roche-Posay_TolerianeHydrating-Cleanser_refill_ingredient_1500x1500-REV.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image of woman looking up
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw9b93f27b/img/tolerianepurifyingfoamingfacialwash/007%20Update/LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATFClinical-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image of woman holding bottle close
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwee52b007/img/tolerianepurifyingfoamingfacialwash/007%20Update/La-Roche-Posay-Face-Cleanser-Toleriane-Purifying-Foaming-Cleanser-400ml-000-3337875545822-howto_REV-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image of hands holding bottle
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwafa5c612/img/tolerianepurifyingfoamingfacialwash/Refill/10_LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATF-size-REV-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image of product being dispensed
          ],
          badges: ["BESTSELLER"],
          benefits: ["CALMS IRRITATION", "SOOTHES SENSITIVITY", "DEEPLY NOURISHING", "BOOSTS REPAIR", "BARRIER STRENGTHENING", "NON-COMEDOGENIC"],
          skinTypes: ["Dry Skin", "Dull Skin", "Sensitive or Reactive Skin", "Winter and Sun-Damage"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "I adore the Nourishing Face Oil! It has such a beautiful consistency, it absorbs and cushions the skin barrier so nicely.",
            author: "Kelly Winter-Smith",
          },
          secondPersonQuote: {
            imageUrl: "https://via.placeholder.com/80x80/E0E0E0/000000?text=Person", // Replace with actual image URL for the second person
            text: "This product changed my skin completely!",
            author: "Another Happy Customer"
          }
        },

        {
          name: "NOURISHING FACE",
          price: "$98.00",
          description: "A blend of radiance boosting Nordic super berries and therapeutic flowers: replenishing Lingonberry, soothing Sea Buckthorn, calming Chamomile and an abundance of antioxidants, vitamins and Omega-3, -6, -7 and -9.",
          rating: 5,
          reviews: 20,
          inStock: true,
          imageUrl: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw85a71660/img/3337875660570/LaRochePosay-Product-Skincare-PureVitaminC12-30ml-3337875909235-PackshotFront-shadow-1500x1500-Rev.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Main product image URL
          thumbnailImages: [ 
            "", 
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw9b93f27b/img/tolerianepurifyingfoamingfacialwash/007%20Update/LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATFClinical-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image of woman holding bottle close
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwee52b007/img/tolerianepurifyingfoamingfacialwash/007%20Update/La-Roche-Posay-Face-Cleanser-Toleriane-Purifying-Foaming-Cleanser-400ml-000-3337875545822-howto_REV-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image of hands holding bottle
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwafa5c612/img/tolerianepurifyingfoamingfacialwash/Refill/10_LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATF-size-REV-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70", // Image of product being dispensed
          ],
          badges: ["BESTSELLER"],
          benefits: ["CALMS IRRITATION", "SOOTHES SENSITIVITY", "DEEPLY NOURISHING", "BOOSTS REPAIR", "BARRIER STRENGTHENING", "NON-COMEDOGENIC"],
          skinTypes: ["Dry Skin", "Dull Skin", "Sensitive or Reactive Skin", "Winter and Sun-Damage"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "I adore the Nourishing Face Oil! It has such a beautiful consistency, it absorbs and cushions the skin barrier so nicely.",
            author: "Kelly Winter-Smith",
          },
          secondPersonQuote: {
            imageUrl: "https://via.placeholder.com/80x80/E0E0E0/000000?text=Person", // Replace with actual image URL for the second person
            text: "This product changed my skin completely!",
            author: "Another Happy Customer"
          }
        },
        // ... other products if you have them, with similar detailed data
      ],
    };
  },
  mounted() {
    // In a real application, you'd get the product name/ID from the route (e.g., this.$route.params.id)
    // For this example, we'll directly load the "NOURISHING FACE OIL" product.
    this.product = this.allProducts.find(p => p.name === "NOURISHING FACE OIL");
    if (this.product && this.product.imageUrl) {
        this.selectedImage = this.product.imageUrl; // Set the main image initially
    }
  },
  methods: {
    selectImage(image) {
      this.selectedImage = image;
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
};
</script>

<style scoped>
/* General Styles */
.container {
  font-family: Arial, sans-serif; /* Example font */
}

/* In Stock Dot */
.dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
}

/* Rating Stars */
.rating-stars .star {
  color: lightgray; /* Empty star color */
  font-size: 1.2em;
}

.rating-stars .filled-star {
  color: black; /* Filled star color - based on image */
}

/* Product Badges (CALMS IRRITATION, etc.) */
.product-badge {
  background-color: #e0e0e0; /* Light gray background */
  color: #333; /* Dark text */
  padding: 0.5em 0.8em;
  border-radius: 0.25rem; /* Slightly rounded corners */
  font-weight: bold;
  font-size: 0.75em; /* Smaller font size */
}

/* Thumbnail Images */
.thumbnail-image {
  cursor: pointer;
  max-width: 100px; /* Adjust as needed */
  height: auto;
  opacity: 0.7; /* Slightly faded when not selected */
  transition: opacity 0.2s ease-in-out, border 0.2s ease-in-out;
}

.thumbnail-image:hover,
.thumbnail-image.border {
  opacity: 1;
  border: 1px solid #333 !important; /* Darker border when selected or hovered */
}

/* Main Product Image Container */
.main-image-container {
  height: 100%; /* Ensures the container takes full height */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Hide overflow if image is larger */
}

.main-product-image {
  max-width: 100%;
  height: auto;
  display: block; /* Remove extra space below image */
}


/* BESTSELLER Badge Overlay on Image */
.badge-overlay {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: white; /* White background as in the image */
  color: black; /* Black text */
  padding: 0.4em 0.8em;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 0.8em;
  text-transform: uppercase;
}

/* Customer Quote */
.customer-quote {
  background-color: #f8f9fa; /* Light gray background */
  border-left: 5px solid #ccc; /* Gray border on the left */
  font-style: italic;
}

.customer-quote p {
  font-size: 0.95em;
}

.customer-quote .blockquote-footer {
  font-size: 0.85em;
  color: #6c757d;
}

/* Subscription Options Card */
.subscription-options {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}

.add-to-bag-btn {
  background-color: black;
  color: white;
  border-color: black;
}

.add-to-bag-btn:hover {
  background-color: #333;
  border-color: #333;
}

.shop-pay-btn {
  border: 1px solid black;
}

.shop-pay-btn img {
    height: 20px; /* Adjust as needed for Shop Pay logo */
}
</style>