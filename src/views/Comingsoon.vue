<template>
  <div class="trending">
    <div>
      <div>
        <h4 class="title">Coming soon</h4>
      </div>
      <div class="no-result">
        <img
          class="img"
          src="https://firebasestorage.googleapis.com/v0/b/jcmoviee.appspot.com/o/drink.png?alt=media&token=f6ea3a03-3ffa-4731-820e-18a8812f0582&_gl=1*ydldf6*_ga*MTg3MDczNTI2NS4xNjg1NTA5OTY0*_ga_CW55HF8NVT*MTY5NTk1OTIyOS4zNi4xLjE2OTU5NTkyNTkuMzAuMC4w"
          alt="opps"
        />
        <span>Opps!!! Coming soon...</span>
      </div>
      <!-- <div class="card-list">
          <div class="card" v-for="movie in movies" :key="movie.title">
            <div>
              <div class="card-item">
                <div class="card-img">
                  <img class="img" :src="movie.thumbnail" alt="" />
                </div>
                <button class="btn-fav"><i class="far fa-heart"></i></button>
  
                <div class="card-movie">
                  <h5 class="name ellipsis">{{ movie.title }}</h5>
                  <p class="desc">{{ movie.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style scoped>
.trending {
  padding-top: 7rem;
  /* max-height: calc(102vh - 100px); */
  max-height: 102vh;
  overflow: scroll;
  background-color: var(--dark-bg);
}
.title {
  padding: 1rem 1.2rem 0.8rem 1.2rem;
  font-size: 1.2rem;
  color: white;
}
.card-list {
  display: flex;
  flex-wrap: wrap;
}
.card {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  transition: all 1s linear;
  width: 20%;
}
.card-item:hover .card-img {
  transform: scale(1.1);
}
.card-item {
  position: relative;
  cursor: pointer;
  margin-bottom: 1rem;
}
.btn-fav {
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 5px;
  border: none;
  padding-top: 3px;
  background-color: rgb(255, 255, 255, 0.8);
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s linear;
}
.btn-fav:hover {
  transform: scale(1.1);
  color: var(--primary-color);
}
.btn-fav i {
  color: var(--primary-color);
}
.card-movie {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.3rem 0;
  background-color: rgba(11, 11, 11, 0.9);
  color: white;
  text-align: center;
  /* left: calc(50% - (104px / 2)); */
}
.card .name {
  font-size: 1rem;
}
.card .desc {
  font-size: 0.8rem;
  opacity: 0.7;
}
.card-item {
  border-radius: 10px;
  overflow: hidden;
}
.img {
  object-fit: cover;
  width: 100%;
  height: 150px;
}
.card-img {
  transition: all 0.2s linear;
}
.no-result {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
}
.no-result .img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
