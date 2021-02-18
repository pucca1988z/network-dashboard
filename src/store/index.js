import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCountyName:null,
    hintColor:new Map([
      ['normal','#1dc9b7'],
      ['watch','#ffc241'],
      ['warning','#fd3995'],
      ['noData','#909090'], 
      ['selected','#9acffa']]),
    loadCounty: false,
    isCountyLoadAnimationFinish: false
  },
  mutations: {
    SET_COUNTY_NAME(state, data){
      state.selectedCountyName = data.selectedCountyName
    },
    TOGGLE_COUNTY_ANIMATION_FLAG(state, data){
      state.isCountyLoadAnimationFinish = !state.isCountyLoadAnimationFinish
    }
  },
  actions: {
    setSelectedCountyName({commit}, data){
      commit('SET_COUNTY_NAME', data)
    },
    toggleCountyLoadAnimationFlag({commit}, data){
      commit('TOGGLE_COUNTY_ANIMATION_FLAG', data)
    }
  },
  modules: {

  }
})
