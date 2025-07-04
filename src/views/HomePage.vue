
<template>
  <div>
    <div class="announcement-bar text-center">
      {{ currentMessage }}
    </div>

    <nav class="navbar navbar-expand-lg custom-navbar px-4">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div class="nav-left d-flex gap-4">
          <router-link to="/product" class="nav-link">SHOP</router-link>
          <router-link to="/product" class="nav-link">DISCOVER</router-link>
        </div>
        <div class="navbar-brand nav-center fw-bold fs-4">NIVA</div>
        <div class="nav-right d-flex gap-4 align-items-center">
          <span class="nav-text">SUBSCRIBE</span>
          <i class="fas fa-search"></i>
          <i class="fas fa-user"></i>
          <i class="fas fa-shopping-cart"></i>
        </div>
      </div>
    </nav>

    <div
      id="carouselExample"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div class="carousel-inner">
        <div
          v-for="(item, index) in bannerImages"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <div
            class="carousel-bg"
            :style="{ backgroundImage: `url(${item.image})` }"
          >
            <div class="carousel-text-overlay">
              NIVA
            </div>
            <div class="carousel-bottom-left-content">
              <div class="carousel-subtext">
                ORGANIC SKINCARE FOR <br /> SENSITIVE SKIN
              </div>
              <button class="shop-now-btn">SHOP NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="moving-bar">
      <div class="marquee">
        <span>VANITY FAIR &nbsp;&nbsp;&nbsp; ROBB REPORT &nbsp;&nbsp;&nbsp; TIROLERIN &nbsp;&nbsp;&nbsp; GENTLEMAN'S JOURNAL</span><span>VANITY FAIR &nbsp;&nbsp;&nbsp; ROBB REPORT &nbsp;&nbsp;&nbsp; TIROLERIN &nbsp;&nbsp;&nbsp; GENTLEMAN'S JOURNAL</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
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
        { image: "girl1.png", alt: "Fashion Model 1" },
        { image: "https://liveaevi.com/cdn/shop/files/Aevi-Web-Homepage-07.png?v=1741127078&width=2000", alt: "Fashion Model 2" },
        { image: "https://liveaevi.com/cdn/shop/files/Aevi-Web-Homepage-CM-01_fe99e65e-1714-46e0-ae25-984a6ab93898.png?v=1741091835&width=2000", alt: "Fashion Model 3" },
      ],
      messageInterval: null,
      navbarMouseEnterHandler: null,
      navbarMouseLeaveHandler: null,
      carouselTextOverlay: null,
      announcementBarHoverTimeout: null,
    };
  },
  mounted() {
    this.currentMessage = this.messages[this.currentIndex];
    this.messageInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      this.currentMessage = this.messages[this.currentIndex];
    }, 2000);

    window.addEventListener("scroll", this.handleScroll);

    const announcementBar = document.querySelector(".announcement-bar");
    const customNavbar = document.querySelector(".custom-navbar");
    this.carouselTextOverlay = document.querySelector(".carousel-text-overlay");

    if (customNavbar && announcementBar) {
      this.navbarMouseEnterHandler = () => {
        if (this.carouselTextOverlay) {
          this.carouselTextOverlay.classList.add("hidden");
        }

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

        if (this.carouselTextOverlay) {
          this.carouselTextOverlay.classList.remove("hidden");
        }
      };

      customNavbar.addEventListener("mouseenter", this.navbarMouseEnterHandler);
      customNavbar.addEventListener("mouseleave", this.navbarMouseLeaveHandler);
    }
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
/* Assuming you have 'LaSegar-Regular' font defined/imported globally or via another @font-face rule */
/* If not, you'll need to define it or replace it with a Google Font */

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

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
  transition: background-color 0.3s ease, color 0.3s ease, border-bottom 0.3s ease; /* Added transition */
}
/* This rule now covers both direct hover and JS-triggered "hover" from navbar */
.announcement-bar:hover,
.announcement-bar.is-hovered {
  background-color: #e6f0fa; /* Light blue/off-white as per screenshot */
  color: #000; /* Black text on hover as per screenshot */
  border-bottom: 1px solid transparent;
}

.custom-navbar {
  position: fixed;
  top: 30px;
  left: 0;
  width: 100%;
  background-color: transparent; /* Reverted to transparent initially */
  z-index: 1040;
  transition: all 0.4s ease;
}

.navbar .nav-link,
.navbar .nav-text,
.navbar i,
.navbar-brand {
  color: #000; /* Black initially */
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-brand {
  font-family: 'LaSegar-Regular';
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Navbar background changes to white on hover or scroll */
.custom-navbar:hover,
.custom-navbar.scrolled {
  background-color: white;
}

/* Ensure text/icons remain black when navbar background is white */
.custom-navbar:hover .navbar-brand,
.custom-navbar:hover .nav-link,
.custom-navbar:hover .nav-text,
.custom-navbar:hover i,
.custom-navbar.scrolled .navbar-brand,
.custom-navbar.scrolled .nav-link,
.custom-navbar.scrolled .nav-text,
.custom-navbar.scrolled i {
  color: #000;
}

.navbar .nav-link:hover,
.navbar .nav-text:hover,
.navbar i:hover,
.navbar-brand:hover {
  color: #294ea4;
}

.carousel-bg {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.carousel-text-overlay {
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 15vw;
  text-align: center;
  z-index: 10;
  font-family: 'LaSegar-Regular';
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 0.9;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.carousel-text-overlay.hidden {
  opacity: 0;
}

.carousel-bottom-left-content {
  position: absolute;
  bottom: 25%;
  left: 5%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.carousel-subtext {
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(1.5rem, 3vw, 3rem);
  text-align: left;
  line-height: 1.2;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 25px;
  width: 100%;
  max-width: 600px;
}

.shop-now-btn {
  background-color: rgba(178, 206, 237, 0.7);
  color: white;
  border: 1px solid white;
  padding: 15px 30px;
  font-size: 1.1em;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.shop-now-btn:hover {
  background-color: rgba(178, 206, 237, 1);
  border-color: rgba(178, 206, 237, 1);
}

.moving-bar {
  background-color: #194dc3;
  color: white;
  overflow: hidden; /* Essential to hide the overflowing content */
  font-weight: bold;
  padding: 33px 0;
  z-index: 1060;
  position: fixed;
  bottom: 0;
  font-family: 'LaSegar-Regular';
  width: 100%;
  text-transform: uppercase;
  font-size: 25px;
  
  /* Use flexbox to correctly contain the marquee */
  display: flex;
  justify-content: flex-start; /* Ensure content starts from the left */
}

.marquee {
  display: flex; /* Make marquee itself a flex container for its span children */
  white-space: nowrap; /* Prevent text within spans from wrapping */
  animation: scroll-left 20s linear infinite;
  /* flex-basis: content; or similar is implicitly handled by flex-shrink:0 on children */
}

.marquee span {
  flex-shrink: 0; /* Prevent the individual text blocks from shrinking */
  /* No additional margin-right needed here if the &nbsp;&nbsp;&nbsp; within the text
     already provides the desired spacing. The key is NO whitespace between </span><span> in HTML. */
}

@keyframes scroll-left {
  0% {
    transform: translateX(0); /* Start at the very beginning of the content */
  }
  100% {
    /* Translate by exactly half the total width of the .marquee element.
       Since .marquee contains two identical span children with flex-shrink:0,
       50% of its width will be the exact width of one of the span children,
       ensuring a perfect loop. */
    transform: translateX(-50%);
  }
}

.carousel-control-prev,
.carousel-control-next,
.carousel-indicators {
  display: none;
}

@media (max-width: 992px) {
  .carousel-text-overlay {
    font-size: 10vw;
  }
  .carousel-subtext {
    font-size: clamp(1.2rem, 2.5vw, 2.5rem);
  }
  .shop-now-btn {
    padding: 12px 25px;
    font-size: 1em;
  }
  .carousel-bottom-left-content {
      left: 2%;
      width: 90%;
  }
}

@media (max-width: 768px) {
  .carousel-text-overlay {
    font-size: 8vw;
    top: 30%;
  }
  .carousel-subtext {
    font-size: clamp(1rem, 2vw, 2rem);
    margin-bottom: 20px;
  }
  .shop-now-btn {
    padding: 10px 20px;
    font-size: 0.9em;
  }
  .moving-bar {
    font-size: 18px;
    padding: 20px 0;
  }
  .navbar .nav-link, .navbar .nav-text, .navbar i {
    font-size: 0.9em;
  }
  .navbar-brand {
      font-size: 1.5em !important;
  }
  .nav-left, .nav-right {
      gap: 15px !important;
  }
}

@media (max-width: 576px) {
  .carousel-text-overlay {
    font-size: 7vw;
    top: 25%;
  }
  .carousel-subtext {
    font-size: clamp(0.9rem, 1.8vw, 1.8rem);
  }
  .shop-now-btn {
    padding: 8px 15px;
    font-size: 0.8em;
  }
  .moving-bar {
    font-size: 14px;
    padding: 15px 0;
  }
  .announcement-bar {
      font-size: 10px;
      height: 25px;
  }
  .custom-navbar {
      top: 25px;
      padding: 0 15px !important;
  }
  .nav-right span {
      display: none;
  }
  .carousel-bottom-left-content {
      left: 15px;
      bottom: 8%;
      width: calc(100% - 30px);
  }
}
</style>
