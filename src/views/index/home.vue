<template>
  <Header>
    <a-carousel class="homepage" autoplay ref="carousel">
      <div v-for="(item, index) in carouselItems" :key="index" class="carousel-item">
        <img :src="item.image" class="carousel-image" />
        <div class="carousel-text">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </a-carousel>
</template>

<script setup lang="ts">
import carousel01 from "/@/assets/images/carousel01.jpg"
import carousel02 from "/@/assets/images/carousel02.jpg"
import Header from '/@/views/index/components/header.vue'
const carouselItems = [
  {
    image: carousel01,
    title: "",
    description: ""
  },
  {
    image: carousel02,
    title: "",
    description: " "
  }
]

</script>

<style scoped>
.ant-carousel .carousel-item {
  position: relative;
  text-align: center;
}

.ant-carousel .carousel-image {
  width: 95%;
  max-height: 70%;
  display: block;
  margin: auto;
}

.homepage {
  width: 100%;
  height: 90%;
}

.ant-carousel .carousel-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.ant-carousel .carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.ant-carousel .carousel-control.prev {
  left: 10px;
}

.ant-carousel .carousel-control.next {
  right: 10px;
}
</style>
