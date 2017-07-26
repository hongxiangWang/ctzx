import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'


Vue.use(Vuex)
const state = {
    recored_step: 1,
    permission: 1,
    manage_system_meun: true,
    manage_process_meun: false,
    answerid: {},
    changeMeunSetFunData: [],
    itemDetail: {},
    roleFun: [],
    allFun: [],
    account: {},
    permission: {
        treeTile: '',
        chooseTreeNodeRoleCode: -1
    },
    recordTable: {
        business_type: -2,
        fillTable: {},
        upLoadFiles: {},
        submitData: {},
        clientData: {},
    },
}

function getAccount() {
    if(localStorage.getItem('account')=="" || localStorage.getItem('account')==null){
        return {}
    }else{
        return localStorage.getItem('account');
    }

}

export default new Vuex.Store({
    state,
    actions,
    mutations
})
