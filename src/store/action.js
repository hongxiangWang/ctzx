import ajax from '../config/ajax'
import axios from 'axios'
import config from '../api/config'
const axiosInit = axios.create(config);
import {app} from '../main.js'

export default {
  addNum({commit, state}, id) {
    commit('REMBER_ANSWER', {id})
    if (state.itemNum < state.itemDetail.length) {
      commit('ADD_ITEMNUM', {
        num: 1
      })
    }
  },

  getRoleFun({commit, state}, prop) {
    axiosInit.post('/access/getuseraccess', {'role_code': prop},{headers:{token:require('store').get('token')}}).then(res => {
      console.log('999999----',JSON.stringify(res.data))
      let flg = Number(res.data.data.flg);
      switch (flg) {
        case 0:
          commit('GET_ROLE_FUN', res.data.data.data);
          break
        case 1:
          app.$message({message:'用户权限数据为空',type:'error'})
          commit('GET_ROLE_FUN', []);
          break
        default: {
        }
      }
    }).catch(error => {
      alert(error)
    })
  },

  initializeData({commit}) {
    commit('INITIALIZE_DATA')
  }
}
