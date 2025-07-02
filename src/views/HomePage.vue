<template>
  <div>
    <div class="announcement-bar text-center">
      {{ currentMessage }}
    </div>

    <nav class="navbar navbar-expand-lg custom-navbar px-4">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div class="nav-left d-flex gap-4">
          <router-link to="/product"  class="nav-link">SHOP</router-link>
          <router-link to="/product"  class="nav-link">DISCOVER</router-link>

        </div>
        <div class="navbar-brand nav-center fw-bold fs-4">HEVI</div>
        <div class="nav-right d-flex gap-4 align-items-center">
          <span class="nav-text">UNITED STATES / USD</span>
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
            class="carousel-bg d-flex align-items-center justify-content-center"
            :style="{ backgroundImage: `url(${item.image})` }"
          >
            <div class="carousel-text-overlay">
              Hevi

              <!-- NORDIC SKINCARE FOR <br /> SENSITIVE SKIN -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="moving-bar">
      <div class="marquee">
        GENTLEMAN'S JOURNAL &nbsp;&nbsp;&nbsp; GET THE GLOSS &nbsp;&nbsp;&nbsp; GLAMOUR &nbsp;&nbsp;&nbsp; STYLIST &nbsp;&nbsp;&nbsp; GENTLEMAN'S JOURNAL &nbsp;&nbsp;&nbsp; GET THE GLOSS &nbsp;&nbsp;&nbsp; GLAMOUR &nbsp;&nbsp;&nbsp; STYLIST
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
  color: white;


  font-size: 12px;
  font-weight: 600;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.announcement-bar:hover{
    background-color: #d5e2f5;
    color: #043f7a;

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
.navbar i,
.navbar-brand {
  color: white;
  font-weight: 500;
  transition: color 0.3s ease;
}

.custom-navbar:hover,
.custom-navbar.scrolled {
  background-color: white;
}

.custom-navbar:hover .nav-link,
.custom-navbar:hover .nav-text,
.custom-navbar:hover .navbar-brand,
.custom-navbar:hover i,
.custom-navbar.scrolled .nav-link,
.custom-navbar.scrolled .nav-text,
.custom-navbar.scrolled .navbar-brand,
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
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 200px;
  text-align: center;
  z-index: 10;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}







.moving-bar {
  background-color: #194dc3;
  color: white;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
  padding: 33px 0;
  font-family: 'Poppins', sans-serif;
  z-index: 1060;
  position: fixed;
  bottom: 0;
  font-family:'LaSegar-Regular' ;

  width: 100%;
  text-transform: uppercase;
  font-size: 25px;
}

.marquee {
  display: inline-block;
  white-space: nowrap;
  animation: scroll-left 20s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.carousel-control-prev,
.carousel-control-next,
.carousel-indicators {
  display: none;
}
.navbar-brand{
  font-family: 'LaSegar-Regular';

}
.carousel-text-overlay{
  font-family: 'LaSegar-Regular';

}
</style>