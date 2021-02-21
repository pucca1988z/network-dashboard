import Vue from 'vue'
import Vuex from 'vuex'
import schools from '@/assets/data/schools2.json'
let formattedSchool = []
let formatSchool = (schools) => {
  let curCountyId, curDistrict, i=-1, j=-1    
  schools.forEach( school => {
    const {county_id, county, district, name, loaded } = {...school}
    if(curCountyId !== county_id){ // new county
      curCountyId = county_id
      curDistrict = district
      j = -1
      i++
      j++
      formattedSchool.push({
        county_id, 
        county, 
        totalSchool:1, 
        loadedCnt:0, 
        districts:[{
          district,
          totalSchool:1,
          loadedCnt:0, 
          schools:[school]
        }]
      })
    }else{ // same county
      if(curDistrict !== district){
        // new district
        curDistrict = district
        j++
        formattedSchool[i].totalSchool += 1
        formattedSchool[i].districts.push({
          district,
          totalSchool:1,
          loadedCnt:0, 
          schools:[school]
        })
      }else{
        formattedSchool[i].totalSchool += 1
        formattedSchool[i].districts[j].totalSchool += 1
        formattedSchool[i].districts[j].schools.push(school) 
      }
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
    schools: formattedSchool //.filter( x => x.county_id == 10017)  //schools.filter( x => x.county_id == '09007' || x.county_id == '10013'),
  },
  mutations: {
    SET_COUNTY_NAME(state, data){
      state.selectedCountyName = data.selectedCountyName
    },
    TOGGLE_COUNTY_ANIMATION_FLAG(state, data){
      state.isCountyLoadAnimationFinish = !state.isCountyLoadAnimationFinish
    },
    LOAD_DATA(state, data){
      state.schools.forEach( (s,ci) => {
        s.districts.forEach((district, di) => {
          district.schools.forEach( (school, si) => {
            setTimeout(()=>{
              school.loaded = true
              district.loadedCnt = district.schools.filter( x => x.loaded == true).length
              state.schools[ci].loadedCnt += 1
            }, si * 400)
          })
        })
      })
    }
  },
  actions: {
    setSelectedCountyName({commit}, data){
      commit('SET_COUNTY_NAME', data)
    },
    toggleCountyLoadAnimationFlag({commit}, data){
      commit('TOGGLE_COUNTY_ANIMATION_FLAG', data)
    },
    loadData({commit}, data){
      commit('LOAD_DATA', data)
    }
  },
  modules: {

  }
})
