<template>
  <div>
    <div class="announcement-bar text-center">
      {{ currentMessage }}
    </div>

    <nav class="navbar navbar-expand-lg custom-navbar px-4">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <button class="navbar-toggler d-lg-none" type="button" @click="toggleSidebar">
          <i class="fa-solid fa-bars"></i>
        </button>

        <div class="nav-left d-none d-lg-flex gap-4">
          <router-link to="/product" class="nav-link">SHOP</router-link>
          <router-link to="/product" class="nav-link">DISCOVER</router-link>
        </div>

        <div class="navbar-brand nav-center fw-bold fs-4">NIVA</div>

        <div class="nav-right d-flex gap-4 align-items-center">
          <span class="nav-text d-none d-lg-inline">SUBSCRIBE</span>
          <i class="fa-solid fa-magnifying-glass fs-8 my-auto" style="margin-right: 10px;"></i>
          <i class="fa-regular fa-user"></i>
          <router-link to="/cart">
            <i class="fa-solid fa-bag-shopping position-relative">
              <span v-if="cartItemCount > 0" class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle fs-6">
                {{ cartItemCount }}
              </span>
            </i>
          </router-link>
        </div>
      </div>
    </nav>

    <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <button class="sidebar-close-btn" @click="toggleSidebar">
        <i class="fa-solid fa-times"></i>
      </button>
      <ul class="sidebar-nav">
        <li><router-link to="/product" @click="toggleSidebar">SHOP</router-link></li>
        <li><router-link to="/product" @click="toggleSidebar">DISCOVER</router-link></li>
        <li><router-link to="/subscribe" @click="toggleSidebar">SUBSCRIBE</router-link></li>
      </ul>
      <div class="sidebar-socials">
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-pinterest"></i>
      </div>
    </div>

    <div :class="['sidebar-overlay', { 'show-overlay': isSidebarOpen }]" @click="toggleSidebar"></div>

    <div class="main-content" :class="{ 'shifted': isSidebarOpen }">
      <div class="container mt-5 pt-5" v-if="product">
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-3">
                <div class="d-flex flex-column align-items-center">
                  <img
                    v-for="(thumb, index) in product.thumbnailImages"
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
                    :src="selectedImage || product.imageUrl"
                    alt="Main Product Image"
                    class="img-fluid main-product-image"
                  />
                  <span
                    v-if="product.badges?.includes('BESTSELLER')"
                    class="badge-overlay"
                  >BESTSELLER</span>
                </div>
                <div v-if="product.customerQuote" class="customer-quote mt-3 p-3 bg-light rounded">
                  <p class="mb-1">"{{ product.customerQuote.text }}"</p>
                  <footer class="blockquote-footer mt-1">{{ product.customerQuote.author }}</footer>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h1>{{ product.name }}</h1>
              <span v-if="product.inStock" class="text-success small">
                <span class="dot bg-success me-1"></span> In stock
              </span>
            </div>

            <div class="d-flex align-items-center mb-3">
              <div class="rating-stars me-2">
                <span
                  v-for="n in 5"
                  :key="n"
                  :class="{ 'filled-star': n <= product.rating }"
                  class="star"
                  >★</span
                >
              </div>
              <span class="small text-muted">({{ product.reviews }} Reviews)</span>
            </div>

            <p class="h4 mb-4">{{ product.price }}</p>

            <div class="d-flex flex-wrap mb-3">
              <span
                v-for="benefit in product.benefits"
                :key="benefit"
                class="badge text-uppercase me-2 mb-2 product-badge"
                >{{ benefit }}</span
              >
            </div>

            <div class="mb-4">
              <p class="small text-uppercase fw-bold mb-1">Skin Types:</p>
              <p class="mb-0">{{ product.skinTypes.join(', ') }}</p>
            </div>

            <p class="mb-4">{{ product.description }}</p>

            <div class="card p-3 mb-4 subscription-options">
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="purchaseOption"
                  id="subscribe"
                  value="subscribe"
                  checked
                />
                <label class="form-check-label fw-bold" for="subscribe">
                  Subscribe + save 15%
                  <a href="#" class="text-decoration-underline ms-1">Learn more</a>
                </label>
              </div>
              <select class="form-select mb-3" style="width: auto">
                <option value="30">every 30 days</option>
                <option value="60">every 60 days</option>
                <option value="90">every 90 days</option>
              </select>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="purchaseOption"
                  id="oneTime"
                  value="oneTime"
                />
                <label class="form-check-label fw-bold" for="oneTime">
                  One time delivery
                </label>
              </div>
            </div>

            <div class="d-flex align-items-center mb-4">
              <div class="input-group quantity-selector me-3" style="width: 120px">
                <button class="btn btn-outline-secondary" type="button" @click="decreaseQuantity">
                  -
                </button>
                <input type="text" class="form-control text-center" v-model.number="quantity" readonly />
                <button class="btn btn-outline-secondary" type="button" @click="increaseQuantity">
                  +
                </button>
              </div>
              <button class="btn btn-dark add-to-bag-btn me-2 flex-grow-1" @click="addToCart">
                {{ product.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center mt-5 pt-5">
        <h4 class="text-danger">Product not found</h4>
        <p>Please check the URL or try navigating from the product listing page.</p>
        <router-link to="/product" class="btn btn-primary mt-3">Go to Products</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductPage", // Added component name
  data() {
    return {
      product: null,
      quantity: 1,
      selectedImage: null,
      allProducts: [
        {
          name: "Toleriane Purifying Foaming Face Wash".toUpperCase(),
          slug: "product1",
          price: "$98.00",
          description:
            "Toleriane Purifying Foaming Facial Cleanser is a daily face wash for normal to oily, sensitive skin. Formulated with La Roche-Posay prebiotic thermal spring water, niacinamide, and ceramide-3.",
          rating: 5,
          reviews: 20,
          inStock: true,
          imageUrl:
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw6eebc922/img/tolerianepurifyingfoamingfacialwash/LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATFPackshotFront-1500x1500.jpg",
          thumbnailImages: [
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw6bff9255/img/tolerianepurifyingfoamingfacialwash/02_La-Roche-Posay_TolerianeHydrating-Cleanser_refill_ingredient_1500x1500-REV.jpg",
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw9b93f27b/img/tolerianepurifyingfoamingfacialwash/007%20Update/LaRochePosay-Product-Toleriane-Toleriane-Purifying-foaming-cleanser-OLD-PACK-400ml-3337875545822-ATFClinical-1500x1500.jpg",
          ],
          badges: ["BESTSELLER"],
          benefits: ["CALMS IRRITATION", "DEEPLY NOURISHING"],
          skinTypes: ["Dry Skin", "Sensitive Skin"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "I adore this face oil! It absorbs beautifully and feels luxurious.",
            author: "Kelly Winter-Smith",
          },
        },
        {
          name: "Hyaluronic Acid Eye Cream".toLocaleUpperCase(),
          slug: "product3",
          price: "$38.00",
          description: "This hyaluronic acid eye cream moisturizes immediately and provides long-lasting hydration. Visibly diminishes the look of under-eye bags and puffiness.",
          rating: 4,
          reviews: 15,
          inStock: true,
          imageUrl:
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw57e32c17/product/La-Roche-Posay-Hydraphase-HA-Yeux-15ml-BD-000-3337872412646-Front-FSS.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          thumbnailImages: [
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwbcfd7dd6/product/La-Roche-Posay-Hydraphase-Key-Dermatological-Ingredients.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwa79fbc56/product/La-Roche-Posay-Hydraphase-HA-Yeux-15ml-BD-000-3337872412646-Back-BLS.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          ],
          badges: [],
          benefits: ["PORE CLEANING", "GENTLE DETOX"],
          skinTypes: ["Oily", "Acne-Prone"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "Leaves my skin super soft and refreshed!",
            author: "Priya M.",
          },
        },
        {
          name: "CLARIFYING CLAY MASK",
          slug: "product2",
          price: "$38.00",
          description: "Detoxifying Natural Blue Clays and Minerals",
          rating: 4,
          reviews: 15,
          inStock: true,
          imageUrl:
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwdd860fb8/product/March%202023%20packshot%20updates/883140020899-1_Anthelios50_TintedMineral_LightFluid_50ml.jpg",
          thumbnailImages: [
            "https://via.placeholder.com/100x100?text=Mask1",
            "https://via.placeholder.com/100x100?text=Mask2",
          ],
          badges: [],
          benefits: ["PORE CLEANING", "GENTLE DETOX"],
          skinTypes: ["Oily", "Acne-Prone"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "Leaves my skin super soft and refreshed!",
            author: "Priya M.",
          },
        },
        {
          name: "Mela B3 Facial Gel Cleanser".toLocaleUpperCase(),
          slug: "product4",
          price: "$26.00",
          description: "This gentle micro-peeling cleanser exfoliates to reveal a more even skin tone. Powered by Melasyl™, the newest, exclusive La Roche-Posay ingredient, Niacinamide, and PHA.",
          rating: 3,
          reviews: 12,
          inStock: true,
          imageUrl:
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw63cb814c/img/3337875890069/1_La%20Roche%20Posay-Mela-%20B3-Cleanser-PACKSHOT.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70",
          thumbnailImages: [
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw9b89f4b2/img/3337875890069/2_La-roche-Posay-Mela-B3-cleanser-KEY-DERMATOLOGICAL-INGREDIENT-REV.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70",
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwa8203f83/img/3337875890069/3_LaRochePosay-Product-MelaB3-MelaB3Cleanser-200ml-03337875890069-Texture-REV.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70",
          ],
          badges: [],
          benefits: ["PORE CLEANING", "GENTLE DETOX"],
          skinTypes: ["Oily", "Acne-Prone"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "Leaves my skin super soft and refreshed!",
            author: "Priya M.",
          },
        },
        {
          name: "Multi-Target Blemish Patches".toLocaleUpperCase(),
          slug: "product5",
          price: "$12.99",
          description: "This invisible multi-targeted blemish patch helps reduce the appearance of blemishes & post-acne marks. Hydrocolloid patch with 420-micron thickness creates a reinforced barrier on skin.",
          rating: 4,
          reviews: 15,
          inStock: true,
          imageUrl:
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dweb8d5979/img/3337875924887/LaRochePosay-Product-Skincare-Effaclar-Duo+M-Patch-3337875924887-ATF-PIM-packshot-front-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70",
          thumbnailImages: [
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw15df2539/img/3337875924887/LaRochePosay-Product-Skincare-Effaclar-Duo+M-Patch-3337875924887-ATF-PIM-ingredients-science-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70",
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw46d47427/img/3337875924887/LaRochePosay-Product-Skincare-Effaclar-Duo+M-Patch-3337875924887-ATF-PIM-benefits-1500x1500.jpg?sw=1080&sh=1080&sm=cut&sfrm=jpg&q=70",
          ],
          badges: [],
          benefits: ["PORE CLEANING", "GENTLE DETOX"],
          skinTypes: ["Oily", "Acne-Prone"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "Leaves my skin super soft and refreshed!",
            author: "Priya M.",
          },
        },
        {
          name: "Hyaluronic Acid Face Cream".toLocaleUpperCase(),
          slug: "product6",
          price: "$39.00",
          description: "This rich face cream is formulated with naturally derived hyaluronic acid from Green Technology* and La Roche-Posay Thermal Spring Water to moisturize and soothe dehydrated skin. Apply this hyaluronic acid face cream for dry skin daily for 72Hr hydration and an immediate plump for radiant-looking skin.",
          rating: 4,
          reviews: 12,
          inStock: true,
          imageUrl:
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwc5151070/img/3337875731409/1_Hydraphase-HA-Rich.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          thumbnailImages: [
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw205dcdfb/img/3337875731409/2_Hydraphase-HA-Rich_Secondary-Packaging.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw5c51cfd1/img/3337875731409/3_Hydraphase-HA-Rich_Secondary-Packaging.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          ],
          badges: [],
          benefits: ["PORE CLEANING", "GENTLE DETOX"],
          skinTypes: ["Oily", "Acne-Prone"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "Leaves my skin super soft and refreshed!",
            author: "Priya M.",
          },
        },
        {
          name: "Hydraphase Intense Serum ".toLocaleUpperCase(),
          slug: "product7",
          price: "$36.00",
          description: "This serum with hyaluronic acid intensely hydrates, soothes, and visibly plumps skin. The lightweight texture absorbs quickly to leave skin feeling rehydrated.",
          rating: 4,
          reviews: 15,
          inStock: true,
          imageUrl:
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw70bd25fd/img/3337872413353/la-roche-posay-hydraphase-serum-with-hyaluronic-acid-3337872413353-1.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          thumbnailImages: [
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw8bfd62b0/img/3337872413353/la-roche-posay-hydraphase-serum-with-hyaluronic-acid-3337872413353-2.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw3fd0c05d/img/3337872413353/la-roche-posay-hydraphase-serum-with-hyaluronic-acid-3337872413353-4.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          ],
          badges: [],
          benefits: ["PORE CLEANING", "GENTLE DETOX"],
          skinTypes: ["Oily", "Acne-Prone"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "Leaves my skin super soft and refreshed!",
            author: "Priya M.",
          },
        },
        {
          name: "Effaclar Micellar Water".toLocaleUpperCase(),
          slug: "product8",
          price: "$17.99",
          description: "This micellar water for oily skin is a no-rinse cleanser that purifies skin and cleanses down to microscopic pollution particles. Dirt-encapsulating micelles in the formula attract dirt, oil, and makeup, making it easy to gently wipe them away.",
          rating: 4.5,
          reviews: 8,
          inStock: true,
          imageUrl:
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw859507f3/img/effaclarmicellarwaterultra/la-roche-posay-effaclar-micellar-water-for-oily-skin-3337872412516-1.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          thumbnailImages: [
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dw93c16615/img/effaclarmicellarwaterultra/la-roche-posay-effaclar-micellar-water-for-oily-skin-3337872412516-2.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
            "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwd314a581/img/effaclarmicellarwaterultra/la-roche-posay-effaclar-micellar-water-for-oily-skin-3337872412516-4.jpg?sw=678&sh=678&sm=cut&sfrm=jpg&q=70",
          ],
          badges: [],
          benefits: ["PORE CLEANING", "GENTLE DETOX"],
          skinTypes: ["Oily", "Acne-Prone"],
          buttonText: "ADD TO BAG",
          customerQuote: {
            text: "Leaves my skin super soft and refreshed!",
            author: "Priya M.",
          },
        },
        // REMOVE THESE EMPTY OBJECTS OR FILL THEM WITH ACTUAL PRODUCT DATA
        // {
        //   name: "",
        //   slug: "product",
        //   price: "$.00",
        //   description: "",
        //   rating: 4,
        //   reviews: 15,
        //   inStock: true,
        //   imageUrl:
        //     "",
        //   thumbnailImages: [
        //     "",
        //     "",
        //   ],
        //   badges: [],
        //   benefits: ["PORE CLEANING", "GENTLE DETOX"],
        //   skinTypes: ["Oily", "Acne-Prone"],
        //   buttonText: "ADD TO BAG",
        //   customerQuote: {
        //     text: "Leaves my skin super soft and refreshed!",
        //     author: "Priya M.",
        //   },
        // },
        // {
        //   name: "",
        //   slug: "product",
        //   price: "$.00",
        //   description: "",
        //   rating: 4,
        //   reviews: 15,
        //   inStock: true,
        //   imageUrl:
        //     "",
        //   thumbnailImages: [
        //     "",
        //     "",
        //   ],
        //   badges: [],
        //   benefits: ["PORE CLEANING", "GENTLE DETOX"],
        //   skinTypes: ["Oily", "Acne-Prone"],
        //   buttonText: "ADD TO BAG",
        //   customerQuote: {
        //     text: "Leaves my skin super soft and refreshed!",
        //     author: "Priya M.",
        //   },
        // },
      ],
      // Data properties for announcement bar and navbar from HomePage
      currentIndex: 0,
      currentMessage: "",
      messages: [
        "ENJOY FREE SHIPPING OVER €150 | SHOP NOW",
        "SIGN UP TO OUR NEWSLETTER FOR 10% OFF",
        "BEST FACE OIL OF 2024 | NOURISHING FACE OIL",
      ],
      messageInterval: null,
      navbarMouseEnterHandler: null,
      navbarMouseLeaveHandler: null,
      carouselTextOverlay: null, // This might not be needed in ProductPage, but keeping for consistency if other elements rely on it
      announcementBarHoverTimeout: null,
      isSidebarOpen: false, // New: Controls sidebar visibility
      cartItemCount: 0, // New: To display cart item count in the navbar
    };
  },
  created() {
    const routeSlug = this.$route.params.name;
    // Check if routeSlug exists before calling toLowerCase()
    if (routeSlug) {
      this.product = this.allProducts.find(
        (p) => p.slug.toLowerCase() === routeSlug.toLowerCase()
      );
    } else {
      this.product = null; // Or handle the case where no slug is provided, e.g., redirect to product list
    }

    if (this.product) {
      this.selectedImage = this.product.imageUrl;
    }
  },
  mounted() {
    // Logic for announcement bar messages
    this.currentMessage = this.messages[this.currentIndex];
    this.messageInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      this.currentMessage = this.messages[this.currentIndex];
    }, 2000);

    // Logic for navbar scroll behavior
    window.addEventListener("scroll", this.handleScroll);

    const announcementBar = document.querySelector(".announcement-bar");
    const customNavbar = document.querySelector(".custom-navbar");

    if (customNavbar && announcementBar) {
      this.navbarMouseEnterHandler = () => {
        if (this.announcementBarHoverTimeout) {
          clearTimeout(this.announcementBarHoverTimeout);
        }
        this.announcementBarHoverTimeout = setTimeout(() => {
          announcementBar.classList.add("is-hovered");
        }, 10);
      };

      this.navbarMouseLeaveHandler = () => {
        if (this.announcementBarHoverTimeout) {
          clearTimeout(this.announcementBarHoverTimeout);
          this.announcementBarHoverTimeout = null;
        }
        announcementBar.classList.remove("is-hovered");
      };

      customNavbar.addEventListener("mouseenter", this.navbarMouseEnterHandler);
      customNavbar.addEventListener("mouseleave", this.navbarMouseLeaveHandler);
    }

    // Close sidebar if route changes (good for SPA navigation)
    this.$router.afterEach(() => {
      if (this.isSidebarOpen) {
        this.toggleSidebar();
      }
    });

    // Load initial cart count when component mounts
    this.updateCartItemCount();
    // Listen for custom event from CartPage or other components to update cart count
    window.addEventListener('cart-updated', this.updateCartItemCount);
  },
  beforeUnmount() {
    clearInterval(this.messageInterval);
    window.removeEventListener("scroll", this.handleScroll);

    const customNavbar = document.querySelector(".custom-navbar");
    if (customNavbar && this.navbarMouseEnterHandler) {
      customNavbar.removeEventListener("mouseenter", this.navbarMouseEnterHandler);
      customNavbar.removeEventListener("mouseleave", this.navbarMouseLeaveHandler);
    }
    if (this.announcementBarHoverTimeout) {
      clearTimeout(this.announcementBarHoverTimeout);
      this.announcementBarHoverTimeout = null;
    }
    // Ensure body scroll is re-enabled on component unmount
    document.body.style.overflow = '';
    window.removeEventListener('cart-updated', this.updateCartItemCount);
  },
  methods: {
    selectImage(image) {
      this.selectedImage = image;
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    handleScroll() {
      const navbar = document.querySelector(".custom-navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      if (this.isSidebarOpen) {
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
      } else {
        document.body.style.overflow = ''; // Re-enable body scrolling
      }
    },
    addToCart() {
      if (!this.product) {
        console.warn("No product selected to add to cart.");
        return;
      }

      let cart = JSON.parse(localStorage.getItem('cart') || '[]');

      const existingItemIndex = cart.findIndex(item => item.slug === this.product.slug);

      if (existingItemIndex > -1) {
        // Item already in cart, update quantity
        cart[existingItemIndex].quantity += this.quantity;
      } else {
        // Add new item to cart
        cart.push({
          slug: this.product.slug,
          name: this.product.name,
          price: this.product.price,
          imageUrl: this.product.imageUrl,
          quantity: this.quantity,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      this.updateCartItemCount(); // Update the cart icon badge

      // Optionally, provide user feedback (e.g., a toast notification)
      alert(`${this.quantity} x ${this.product.name} added to cart!`);
    },
    updateCartItemCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    }
  },
};
</script>

<style scoped>
/* Ensure you have Font Awesome imported in your main.js or index.html for icons to show */
/* Example for main.js: import '@fortawesome/fontawesome-free/css/all.min.css'; */

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
/* Assuming 'LaSegar-Regular' font is defined/imported elsewhere (e.g., public/index.html or a global CSS file) */

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Announcement Bar */
.announcement-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
  color: #fff; /* White initially */
  background-color: transparent;
  border-bottom: 1px solid white;
  font-size: 12px;
  font-weight: 600;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, border-bottom 0.3s ease;
}
.announcement-bar:hover,
.announcement-bar.is-hovered {
  background-color: #e6f0fa; /* Light blue/off-white as per screenshot */
  color: #000; /* Black text on hover as per screenshot */
  border-bottom: 1px solid transparent;
}

/* Custom Navbar */
.custom-navbar {
  position: fixed;
  top: 30px;
  left: 0;
  width: 100%;
  background-color: transparent; /* Transparent initially */
  z-index: 1040;
  transition: all 0.4s ease;
}

.navbar .nav-link,
.navbar .nav-text,
.navbar i {
  color: #000; /* Black initially */
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-brand {
  font-family: 'LaSegar-Regular';
  opacity: 0; /* Starts invisible */
  transition: opacity 0.3s ease, color 0.3s ease; /* Add color transition */
}

/* Navbar background changes to white on hover or scroll */
.custom-navbar:hover,
.custom-navbar.scrolled {
  background-color: white;
}

/* Ensure brand, text, and icons remain black and become visible when navbar background is white */
.custom-navbar:hover .navbar-brand,
.custom-navbar:hover .nav-link,
.custom-navbar:hover .nav-text,
.custom-navbar:hover i,
.custom-navbar.scrolled .navbar-brand,
.custom-navbar.scrolled .nav-link,
.custom-navbar.scrolled .nav-text,
.custom-navbar.scrolled i {
  color: #000;
  opacity: 1; /* Make the brand visible */
}

.navbar .nav-link:hover,
.navbar .nav-text:hover,
.navbar i:hover,
.navbar-brand:hover {
  color: #294ea4;
}

/* Cart Icon Badge */
.fa-bag-shopping {
  position: relative;
}

.fa-bag-shopping .badge {
  font-size: 0.6em; /* Adjust size as needed */
  padding: 0.3em 0.5em;
  line-height: 1;
  border-radius: 50%;
  top: -5px; /* Adjust vertical position */
  left: calc(100% - 5px); /* Adjust horizontal position */
  transform: translate(-50%, -50%); /* Center the badge */
}


/* Hamburger Toggler Button */
.navbar-toggler {
  border: none;
  font-size: 24px;
  padding: 0;
  color: #000; /* Color of the hamburger icon */
}
.navbar-toggler:focus {
  box-shadow: none; /* Remove focus outline */
}

/* --- Sidebar Styles --- */
.sidebar {
  position: fixed;
  top: 0;
  right: -300px; /* Hidden by default */
  width: 300px; /* Width of the sidebar */
  max-width: 80vw; /* Max width for very small screens */
  height: 100%;
  background-color: white;
  z-index: 1100; /* Higher than navbar and overlay */
  box-shadow: -2px 0 10px rgba(0,0,0,0.3);
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding-top: 60px; /* Space from top for close button */
}

.sidebar-open {
  right: 0; /* Slide in when open */
}

.sidebar-close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px; /* Larger icon */
  cursor: pointer;
  color: #000;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  flex-grow: 1; /* Allows nav to take available space */
}

.sidebar-nav li {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.sidebar-nav li:last-child {
  border-bottom: none;
}

.sidebar-nav a {
  text-decoration: none;
  color: #000;
  font-size: 1.1em;
  font-weight: bold;
  display: block;
  transition: color 0.2s ease;
  text-transform: uppercase; /* Match navbar style */
}

.sidebar-nav a:hover {
  color: #294ea4;
}

.sidebar-socials {
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  border-top: 1px solid #eee;
}
.sidebar-socials i {
  font-size: 20px;
  color: #555;
  cursor: pointer;
  transition: color 0.2s ease;
}
.sidebar-socials i:hover {
  color: #294ea4;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1090; /* Below sidebar, above other content */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.sidebar-overlay.show-overlay {
  opacity: 1;
  visibility: visible;
}

/* Shift main content when sidebar is open */
.main-content {
  transition: transform 0.3s ease-in-out;
}

.main-content.shifted {
  transform: translateX(-300px); /* Adjust based on sidebar width */
}


/* --- Product Page Specific Styles (Original) --- */
.dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
}

.rating-stars .star {
  color: lightgray;
  font-size: 1.2em;
}

.rating-stars .filled-star {
  color: black;
}

.product-badge {
  background-color: #e0e0e0;
  color: #333;
  padding: 0.5em 0.8em;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 0.75em;
}

.thumbnail-image {
  cursor: pointer;
  max-width: 100px;
  opacity: 0.7;
  transition: 0.2s;
}

.thumbnail-image:hover,
.thumbnail-image.border {
  opacity: 1;
  border: 2px solid #333 !important;
}

.main-product-image {
  max-width: 100%;
}

.badge-overlay {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: white;
  color: black;
  padding: 0.4em 0.8em;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 0.8em;
  text-transform: uppercase;
}

.customer-quote {
  background-color: #f8f9fa;
  border-left: 5px solid #ccc;
  font-style: italic;
}

.subscription-options {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}

.add-to-bag-btn {
  background-color: black;
  color: white;
}

.add-to-bag-btn:hover {
  background-color: #333;
}


/* --- Media Queries for Responsiveness (from HomePage and ProductPage merged) --- */

/* Larger screens (min-width: 992px) - Desktop */
@media (min-width: 992px) {
  .navbar-toggler {
    display: none !important; /* Hide hamburger icon on desktop */
  }

  .nav-left {
    display: flex !important; /* Show Shop/Discover links */
  }
  .sidebar {
    right: -300px !important; /* Ensure sidebar is hidden on desktop */
    box-shadow: none; /* Remove shadow if hidden */
    pointer-events: none; /* Make it unclickable when hidden */
  }
  .sidebar-overlay {
    display: none !important; /* Hide overlay on desktop */
  }
  .main-content.shifted {
    transform: translateX(0) !important; /* No shift on desktop */
  }
}

/* Medium screens and smaller (max-width: 991.98px) - Tablet and Mobile */
</style>