
<template>
  <div>
    <div class="announcement-bar text-center">
      {{ currentMessage }}
    </div>

    <nav class="navbar navbar-expand-lg custom-navbar px-4">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <button class="navbar-toggler d-lg-none" type="button" @click="toggleSidebar">
          <i class="bi bi-list"></i>
        </button>

        <div class="nav-left d-none d-lg-flex gap-4">
          <router-link to="/product" class="nav-link">SHOP</router-link>
          <router-link to="/product" class="nav-link">DISCOVER</router-link>
        </div>

        <div class="navbar-brand nav-center fw-bold fs-4">NIVA</div>

        <div class="nav-right d-flex gap-4 align-items-center">
          <span class="nav-text d-none d-lg-inline">SUBSCRIBE</span>
           <div class="d-flex justify-content-center gap-4 my-auto">
            <i class="bi bi-search"></i>
            <a href="https://www.linkedin.com/in/naciketha-karunanithi-047447277/"><i class="bi bi-person"></i></a>
            <i class="bi bi-bag"></i>
          </div>
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
        <li><router-link to="/product" @click="toggleSidebar">SUBSCRIBE</router-link></li>
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
        { image: "https://liveaevi.com/cdn/shop/files/Aevi-Web-Homepage-CM-01_fe99e66e-1714-46e0-ae25-984a6ab93898.png?v=1741091835&width=2000", alt: "Fashion Model 3" },
      ],
      messageInterval: null,
      navbarMouseEnterHandler: null,
      navbarMouseLeaveHandler: null,
      carouselTextOverlay: null,
      announcementBarHoverTimeout: null,
      isSidebarOpen: false,
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
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      if (this.isSidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

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
  color: #fff;
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
  background-color: #e6f0fa;
  color: #000;
  border-bottom: 1px solid transparent;
}

.custom-navbar {
  position: fixed;
  top: 30px;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 1040;
  transition: all 0.4s ease;
}

.navbar .nav-link,
.navbar .nav-text,
.navbar i {
  color: #000;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-brand {
  font-family: 'LaSegar-Regular';
  opacity: 0;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.custom-navbar:hover,
.custom-navbar.scrolled {
  background-color: white;
}

.custom-navbar:hover .navbar-brand,
.custom-navbar:hover .nav-link,
.custom-navbar:hover .nav-text,
.custom-navbar:hover i,
.custom-navbar.scrolled .navbar-brand,
.custom-navbar.scrolled .nav-link,
.custom-navbar.scrolled .nav-text,
.custom-navbar.scrolled i {
  color: #000;
  opacity: 1;
}

.navbar .nav-link:hover,
.navbar .nav-text:hover,
.navbar i:hover,
.navbar-brand:hover {
  color: #294ea4;
}

.navbar-toggler {
  border: none;
  font-size: 24px;
  padding: 0;
  color: #000;
}
.navbar-toggler:focus {
  box-shadow: none;
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
  padding: 10px 60px;
  font-size: 1.1em;
  cursor: pointer;
  border-radius: 50px;
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
  display: none;
}

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

.sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  max-width: 80vw;
  height: 100%;
  background-color: white;
  z-index: 1100;
  box-shadow: -2px 0 10px rgba(0,0,0,0.3);
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}

.sidebar-open {
  right: 0;
}

.sidebar-close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #000;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  flex-grow: 1;
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
  text-transform: uppercase;
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
  z-index: 1090;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.sidebar-overlay.show-overlay {
  opacity: 1;
  visibility: visible;
}

.main-content {
  transition: transform 0.3s ease-in-out;
}

.main-content.shifted {
  transform: translateX(-300px);
}

@media (min-width: 992px) {
  .navbar-toggler {
    display: none !important;
  }

  .nav-left {
    display: flex !important;
  }
  .sidebar {
      right: -300px !important;
      box-shadow: none;
      pointer-events: none;
  }
  .sidebar-overlay {
      display: none !important;
  }
  .main-content.shifted {
      transform: translateX(0) !important;
  }
}

@media (max-width: 991.98px) {
    .nav-text {
        display: none !important;
    }
}

@media (max-width: 768px) {
  .carousel-text-overlay {
    font-size: 30vw;
    top: 30%;
  }
  .carousel-subtext {
    font-size: clamp(1rem, 2vw, 2rem);
    margin-bottom: 20px;
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
    .carousel-subtext {
    font-size: 5vh;
  }
}

@media (max-width: 576px) {
  .carousel-text-overlay {
    text-align: center;
    font-size: 28vw;
    top: 30%;
  }
  .carousel-subtext {
    font-size: 5vh;
  }
  .shop-now-btn {
    padding: 10px 0px 10px;
    width: 260px;
    border-radius:50px ;
  }

  .moving-bar {
    font-size: 25px;
    padding: 33px 0;
  }
  .announcement-bar {
      font-size: 10px;
      height: 25px;
  }
  .custom-navbar {
      top: 25px;
      padding: 0 15px !important;
  }
  .carousel-bottom-left-content {
      left: 15px;
      bottom: 30%;
      width: calc(100% - 30px);
  }
}
</style>
