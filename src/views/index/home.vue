<template>
  <a-carousel autoplay>
    <div>
      <img src="../../assets/images/carousel01.jpg" />
    </div>
    <div>
      <img src="../../assets/images/carousel02.jpg" />
    </div>
    <div>
      <img src="../../assets/images/carousel03.jpg" />
    </div>
  </a-carousel>
</template>
<script>
export default {}
</script>
<style scoped>
/* For demo */
.ant-carousel>>>.slick-dots {
  height: auto;
}

.ant-carousel>>>.slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}

.ant-carousel>>>.slick-thumb {
  bottom: -45px;
}

.ant-carousel>>>.slick-thumb li {
  width: 60px;
  height: 45px;
}

.ant-carousel>>>.slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}

.ant-carousel>>>.slick-thumb li.slick-active img {
  filter: grayscale(0%);
}</style>