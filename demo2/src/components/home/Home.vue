<template>
  <div class="home">
    <div class="img-wrapper">
      <img src="./tetris.jpg">
    </div>
    <div class="player-wrapper">
      <p><router-link to="/single">ONE PLAYERS</router-link></p>
      <p><router-link to="/double">TWO PLAYERS</router-link></p>
    </div>
  </div>
</template>
<style>
  .home {
    margin-top: 50px;
  }
  .home .img-wrapper img {
    width: 800px;
    height: 600px;
  }
  .home .player-wrapper {
    font-size: 20px;
    font-weight: 600;
    line-height: 35px;
    color: #fff;
    position: relative;
    top: -260px;
    text-align: center;
  }
  .home .player-wrapper p a {
    color: #fff;
  }
  .home .player-wrapper p a:hover {
    color: #facc48;
  }
</style>