import Vue from 'vue'
import Vuex from 'vuex'
import schools from '@/assets/data/schools3.json'
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
  return m 
}



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCountyName:null,
    selectedCountyId:null,
    selectedDistrict:null, 
    selectedDistrictId:null,
    hintColor:new Map([
      ['normal','#01B552'],
      ['watch','#F6C35A'],
      ['warning','#FF0000'],
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
    splitInto: 30,
    totalGroup: Math.floor(schools.length / 30),
    abnormalPage:0,
    pagingSize:5,
    slowCountyId:["10008", "10002"],
    isClickOpeningAnimation: true,
    isClickEndingAnimation: null
  },

  mutations: {
    SET_SELECTED_PATH_DATA(state, data){
      state.selectedCountyName = data.selectedCountyName
      state.selectedCountyId = data.selectedCountyId
      state.selectedDistrict = data.selectedDistrict
      state.selectedDistrictId = data.selectedDistrictId
    },
    SET_ABNORMAL_PAGE(state, data){
      state.abnormalPage = data.abnormalPage
    },
    TOGGLE_COUNTY_ANIMATION_FLAG(state, data){
      state.isCountyLoadAnimationFinish = !state.isCountyLoadAnimationFinish
    },
    LOAD_DATA(state, data){
      let loaded = 0
      let interval = setInterval( () => {
        let i = 0, limitCnt = Math.ceil(Math.random()*10)+5 //6~15 
        let randomCnt = Math.ceil(Math.random()*20)+15, target = loaded + randomCnt // 16~35
        for(loaded ; loaded <= target ; loaded++){
          if( loaded == state.schools.length){
            clearInterval(interval)
            state.isClickEndingAnimation = false
            break
          }
          state.slowCountyId.includes(state.schools[loaded].county_id) ? i++ : null
          if( i > limitCnt ) break
          state.schools[loaded].loaded = true
        }
      }, 30)
    },
    CLICK_OPENING_ANIMATION (state, data) {
      state.isClickOpeningAnimation = data
    },
    CLICK_ENDING_ANIMATION (state, data) {
      state.isClickEndingAnimation = true
    }
  },
  actions: {
    setSelectedPathData({commit}, data){
      commit('SET_SELECTED_PATH_DATA', data)
    },
    setAbnormalPage({commit}, data){
      commit('SET_ABNORMAL_PAGE', data)
    },
    toggleCountyLoadAnimationFlag({commit}, data){
      commit('TOGGLE_COUNTY_ANIMATION_FLAG', data)
    },
    loadData({commit}, data){
      commit('LOAD_DATA', data)
    },
    clickOpeningAnimation( {commit}, data ){
      commit('CLICK_OPENING_ANIMATION', data)
    },
    clickEndingAnimation( {commit}, data) {
      commit('CLICK_ENDING_ANIMATION', data)
    }
  },
  getters:{
    getCountiesLoadingRecord: state => {
      let res = []
      for(let key of countySet.values()){
        let county = state.schools.filter( x => x.county_id == key)
        let obj = {
          county_id:key, 
          county: county[0].county, 
          total:county.length,
          loaded:county.filter( x => x.loaded == true).length
        }
        res.push(obj)
      }
      return res
    },
    getLoadedCountiesCnt: (state, getters)  => {
      let cnt = 0
      getters.getCountiesLoadingRecord.forEach( county => {
        if(county.loaded == county.total) cnt++
      })
      return cnt 
    },
    getLoadedRecordsDistrictLevel: state => {
      if(state.selectedCountyId == null) return
      let selectedCountyId = state.selectedCountyId
      let countyArr = state.schools.filter( x => x.county_id == selectedCountyId)
      let res = [], district_id
      countyArr.forEach( a => {
        if(a.district_id != district_id){
          district_id = a.district_id
          let distArr = countyArr.filter( x => x.district_id == district_id)
          let obj = {
            county_id: a.county_id, 
            district_id,
            total: distArr.length,
            loaded: distArr.filter( x => x.loaded == true).length
          }
          res.push(obj)
        }
      })
      return res
    },
    getDistrictsLoadingRecord: state => {
      if(state.selectedDistrictId === null) return
      let res = []
      let districtId = state.selectedDistrictId
      let distArr = state.schools.filter( x => x.district_id == districtId)
      return distArr
      
    },
    isPathLoadedCompleted:(state) => (id) =>{
      let rtn = false, total = 0, loaded = 0, 
      objKey = id.length == 5 ? 'county_id' : 'district_id'
      total = state.schools.filter( x => x[objKey] == id).length, 
      loaded = state.schools.filter( x => x[objKey] == id).filter( x => x.loaded == true).length
      total == loaded ? rtn = true : null 
      return rtn
    },
    getTotalSchoolsByCountyId: (state,getters) => (countyId) => {
      return getters.getCountiesLoadingRecord.filter( x => x.county_id == countyId)[0].total
    },
    getLoadedSchoolsByCountyId: (state, getters) => countyId => {
      return getters.getCountiesLoadingRecord.filter( x => x.county_id == countyId)[0].loaded     
    },
    getLoadedRawDataByCountyId: state => (countyId, districtId = null) => {
      let arr = state.schools.filter( x => x.county_id == countyId)
      if(districtId) arr = arr.filter( x => x.district_id == districtId )
      return arr.filter( x => x.loaded == true)
    },
    getUnloadRawDataByCountyId: state => (countyId, districtId = null) => {
      let arr = state.schools.filter( x => x.county_id == countyId)
      if(districtId) arr = arr.filter( x => x.district_id == districtId )
      arr = arr.filter( x => x.loaded == false)
      if(arr.length == 0) state.abnormalPage = 0 
      return arr
    }
  },
  modules: {

  }
})
