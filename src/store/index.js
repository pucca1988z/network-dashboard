import Vue from 'vue'
import Vuex from 'vuex'
import schools from '@/assets/data/schools3.json'
import { setTimeout } from 'core-js'
let countySet = new Set()
let districtSet = new Set()

let buildMap = ( p ) => {
  let m = new Map()
  schools.forEach (school => {
    const {county_id, district_id, name, loadData} = {...school}
    if(m.has(county_id)){
      if(m.get(county_id).has(district_id)){
        let distObj = m.get(county_id).get(district_id)
        distObj.names.push(school)
        distObj.total += 1
        m.get(county_id).set(district_id, distObj)
      }else{
        districtSet.add(district_id)
        let distMap = new Map()
        let distObj = { total:1, loaded:0, names:[school]}
        distMap.set(district_id, distObj)
        m.get(county_id).set(district_id, distObj)
      }
    }else{
      countySet.add(county_id)
      let distMap = new Map()
      let distObj = { total:1, loaded:0, names:[school]}
      distMap.set(district_id, distObj)
      m.set(county_id, distMap)
    }
  })
  // console.log(m)
  return m 
}



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCountyName:null,
    hintColor:new Map([
      ['normal','#1dc9b7'],
      // ['normal','#059669'],
      ['watch','#ffc241'],
      ['warning','#fd3995'],
      ['noData','#909090'], 
      ['selected','#9acffa']]),
    loadCounty: false,
    isCountyLoadAnimationFinish: false,
    county_id:[],
    schools: schools, 
    schoolsMap: buildMap(schools),
    changedData:null,
    countySet,
    districtSet,
    splitInto: 70,
    totalGroup: Math.floor(schools.length / 70),
    circuitCnt:0
  },

  mutations: {
    SET_COUNTY_NAME(state, data){
      state.selectedCountyName = data.selectedCountyName
    },
    TOGGLE_COUNTY_ANIMATION_FLAG(state, data){
      state.isCountyLoadAnimationFinish = !state.isCountyLoadAnimationFinish
    },
    LOAD_DATA(state, data){
      for(let i = 0 ; i <= state.totalGroup ; i++){
        setTimeout( () =>{
          for(let j = 0 ; j < state.splitInto ; j++){
            let index = i * state.splitInto + j
            if(index == state.schools.length ) break
            state.schools[index].loaded = true
          }
        }, i * 1000)
      }
    },
    ADD_COUNTY_CIRCUIT_CNT(state, data){
      let i = 0 
      countySet.forEach( s =>{
        i++
        setTimeout( ()=>{ 
          state.circuitCnt = state.circuitCnt + 1 
        }, i*1000)
        // console.log(state.circuitCnt)
        // state.circuitCnt += 1
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
    },
    addCountyCircuitCnt({commit}, data){
      commit('ADD_COUNTY_CIRCUIT_CNT')
    }
  },
  getters:{
    getLoadedRecords: state => state.schools.filter( x => x.loaded == true).length,
    getLoadedRecordsCountyLevel: state => {
      let res = []
      for(let key of countySet.values()){
        let county = state.schools.filter( x => x.county_id == key)
        let obj = {
          county_id:key, 
          total:county.length,
          loaded:county.filter( x => x.loaded == true).length
        }
        res.push(obj)
      }
      return res
    },
    getCircuitNormalRecordsCountyLevel: state => {
      return state.circuitCnt
    }
  },
  modules: {

  }
})
