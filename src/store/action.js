import ajax from '../config/ajax'
import axios from 'axios'
import config from '../api/config'
const axiosInit = axios.create(config);

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
    axiosInit.post('access/getuseraccess', {'role_code': prop}).then(res => {
      //alert(JSON.stringify(Number(res.data.data.flg)));
      let flg = Number(res.data.data.flg);
      switch (flg) {
        case 0:
          commit('GET_ROLE_FUN', res.data.data.data);
          break
        case 1:
          commit('GET_ROLE_FUN', 1);
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
