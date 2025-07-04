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
          <i class="fa-solid fa-bag-shopping"></i> </div>
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
                <router-link to="/product"><button class="shop-now-btn">SHOP NOW</button></router-link>
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
      isSidebarOpen: false, // New: Controls sidebar visibility
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

    // Close sidebar if route changes (good for SPA navigation)
    this.$router.afterEach(() => {
      if (this.isSidebarOpen) {
        this.toggleSidebar();
      }
    });
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
    // New: Method to toggle sidebar visibility
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      if (this.isSidebarOpen) {
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
      } else {
        document.body.style.overflow = ''; // Re-enable body scrolling
      }
    },
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

/* Carousel Section */
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

.carousel-control-prev,
.carousel-control-next,
.carousel-indicators {
  display: none; /* Hide default carousel controls */
}

/* Moving Bar Section */
.moving-bar {
  background-color: #194dc3;
  color: white;
  overflow: hidden;
  font-weight: bold;
  padding: 33px 0;
  z-index: 1060;
  position: fixed;
  bottom: 0;
  font-family: 'LaSegar-Regular';
  width: 100%;
  text-transform: uppercase;
  font-size: 25px;
  display: flex;
  justify-content: flex-start;
}

.marquee {
  display: flex;
  white-space: nowrap;
  animation: scroll-left 20s linear infinite;
}

.marquee span {
  flex-shrink: 0;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
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


/* --- Media Queries for Responsiveness --- */

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
@media (max-width: 991.98px) {
    .nav-text {
        display: none !important; /* Hide 'SUBSCRIBE' text on smaller screens */
    }
}

/* Tablet portrait and smaller (max-width: 768px) */
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

/* Mobile portrait (max-width: 576px) */
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
  /* On very small screens, adjust carousel bottom left content */
  .carousel-bottom-left-content {
      left: 15px;
      bottom: 8%;
      width: calc(100% - 30px);
  }
}
</style>