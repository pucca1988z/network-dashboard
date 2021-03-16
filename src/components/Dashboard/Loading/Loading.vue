<template>
  <div id="body" ref="body" 
    @click="test"
    class="fixed border h-screen w-screen bg-gray-900 z-50 -ml-4 -mt-4 duration-1000"
    :class="{
      'opacity-0': isClickOpeningAnimation,
      'opacity-90': !isClickOpeningAnimation
    }"
  >
    <div id="all" ref="all">
      <div id="loading_start" ref="loading_start" class="loading_start"></div>
      <div id="loading_dot" ref="loading_dot" class="loading_dot">
          <h2 id="loading_dot_text" ref="loading_dot_text">連線中</h2>
          <div id="loading_dot_dots" ref="loading_dot_dots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data(){
    return {
      isClick: false
    }
  },
  computed:{
    ...mapState({
      isClickOpeningAnimation: state => state.isClickOpeningAnimation
    })
  },
  mounted(){

  },
  methods:{
    test:function(){
      this.$refs.loading_dot_text.textContent = '已連線'
      this.$refs.loading_dot_dots.style.visibility = 'hidden'
      this.$refs.loading_start.className = 'loading_done'
      setTimeout(() => {
        this.$store.dispatch('clickOpeningAnimation', true)
      }, 2000)
    }
  }
}
</script>

<style scoped >
  .body {
      background: #0d8aa5;
      transition: background-color 2s cubic-bezier(1, 1, 1, 1);
      transition-delay: 0s;
  }
  .loading_start {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -60px 0 0 -60px;
      background: url("/ROC_Ministry_of_Education_Seal.svg") no-repeat center center;
      background-size: 170px 170px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      border: 10px solid #19bee1;
  }
  .loading_start:after {
      content: "";
      background: trasparent;
      width: 140%;
      height: 140%;
      position: absolute;
      border-radius: 100%;
      top: -20%;
      left: -20%;
      opacity: 0.7;
      box-shadow: rgba(255, 255, 255, 0.6) -4px -5px 3px -3px;
      animation: rotate 2s infinite linear;
  }
  .loading_done {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -60px 0 0 -60px;
      background: url("/ROC_Ministry_of_Education_Seal.svg") no-repeat center center;
      background-size: 170px 170px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      border: 10px solid #19bee1;
  }
  .loading_done:after {
      content: "";
      background: trasparent;
      width: 120%;
      height: 120%;
      position: absolute;
      border-radius: 100%;
      box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 15px 10px;
      top: -10%;
      left: -10%;
      opacity: 0;
      animation: logo_breath 1s alternate infinite ease-in-out;
  }
  @keyframes rotate {
      0% {
          transform: rotateZ(0deg);
      }
      100% {
          transform: rotateZ(360deg);
      }
  }

  @keyframes logo_breath {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 0.5;
      }
  }

  .loading_dot {
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: 75px 0 0 -68px;
  }

  h2 {
      color: #fff;
      margin: 0 0 5px 0;
      font: 1.5em 微軟正黑體;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      animation: loading_text 1s alternate ease-in-out infinite;
  }

  .loading_dot span {
      display: inline-block;
      vertical-align: middle;
      width: 0.6em;
      height: 0.6em;
      margin: 0.19em;
      background: #007db6;
      border-radius: 0.6em;
      animation: loading_dot 1s infinite alternate;
  }

  .loading_dot span:nth-of-type(2) {
      background: #008fb2;
      animation-delay: 0.2s;
  }

  .loading_dot span:nth-of-type(3) {
      background: #009b9e;
      animation-delay: 0.4s;
  }

  .loading_dot span:nth-of-type(4) {
      background: #00a77d;
      animation-delay: 0.6s;
  }

  .loading_dot span:nth-of-type(5) {
      background: #00b247;
      animation-delay: 0.8s;
  }

  .loading_dot span:nth-of-type(6) {
      background: #5ab027;
      animation-delay: 1s;
  }

  .loading_dot span:nth-of-type(7) {
      background: #a0b61e;
      animation-delay: 1.2s;
  }

  @keyframes loading_dot {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }

  @keyframes loading_text {
      0% {
          opacity: 1;
      }
      100% {
          opacity: 0.5;
      }
  }
</style>