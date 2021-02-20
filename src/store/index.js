import Vue from 'vue'
import Vuex from 'vuex'
import schools from '@/assets/data/schools2.json'
let formattedSchool = []
let formatSchool = (schools) => {
  let curCountyId, curDistrict, i=-1, j=-1    
  schools.forEach( school => {
    const {county_id, county, district, name } = {...school}
    if(curCountyId !== county_id){
      j = -1
      i++
      formattedSchool.push({
        county_id, totalSchool:1, loaded:0, districts:[]
      })
      curCountyId = county_id
      if(curDistrict !== district){
        curDistrict = district
        j++
        formattedSchool[i].districts.push({
          district, totalSchool:1, loaded:0, schools:[school]
        })
      }else{ 
        formattedSchool[i].totalSchool += 1
        formattedSchool[i].districts[j].totalSchool += 1
        formattedSchool[i].districts[j].schools.push(school) 
      }
    }else{ 
      formattedSchool[i].totalSchool += 1
      formattedSchool[i].districts[j].totalSchool += 1
      formattedSchool[i].districts[j].schools.push(school) 
    }
  })
}

formatSchool(schools)
console.log(formattedSchool)


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCountyName:null,
    hintColor:new Map([
      // ['normal','#1dc9b7'],
      ['normal','#059669'],
      ['watch','#ffc241'],
      ['warning','#fd3995'],
      ['noData','#909090'], 
      ['selected','#9acffa']]),
    loadCounty: false,
    isCountyLoadAnimationFinish: false,
    schools,
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
