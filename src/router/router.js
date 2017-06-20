import App from '../App.vue'
import {getCookie} from '../api/cookie'
const login = r => require.ensure([], () => r(require('../page/login/index.vue')), 'login');
const home = r => require.ensure([], () => r(require('../page/home/index.vue')), 'home');
const record = r => require.ensure([], () => r(require('../page/record/index.vue')), 'record');
const chooseType = r => require.ensure([], () => r(require('../page/record/chooseType.vue')), 'chooseType');
const filltable = r => require.ensure([], () => r(require('../page/record/filltable.vue')), 'filltable');
const uploadFile = r => require.ensure([], () => r(require('../page/record/uploadFile.vue')), 'uploadFile');
const search = r => require.ensure([], () => r(require('../page/search/index.vue')), 'search');
const approve = r => require.ensure([], () => r(require('../page/approve/index.vue')), 'approve');
const statistics = r => require.ensure([], () => r(require('../page/statistics/index.vue')), 'statistics');
const mangeHome = r => require.ensure([], () => r(require('../manage_pages/mange_home/manageHome.vue')), 'mange_home');
const meunFunSet = r => require.ensure([], () => r(require('../manage_pages/system/meunFunctionSetting.vue')), 'meunFunSet');
const userSet = r => require.ensure([], () => r(require('../manage_pages/system/userSet.vue')), 'userSet');
const permissionSet = r => require.ensure([], () => r(require('../manage_pages/system/permissionSetting.vue')), 'permissionSet');
const roleManage = r => require.ensure([], () => r(require('../manage_pages/system/roleManage.vue')), 'roleManage');
const modeldownload = r => require.ensure([], () => r(require('../page/modeldownload/index.vue')), 'modeldownload');
export default [{
    path: '/',
    component: App,
    children: [{
        path: '/',
        // 使用vue-route + Webpack 的 code splitting feature 把组件按组分块
        component: login
    }, {
        path: '/index',
        component: home
    }, {
        path: '/home',
        component: home,
        children: [{
            path: 'record',
            component: record,
            children: [{
                path: "chooseType",
                component: chooseType,
            }, {
                path: "filltable",
                component: filltable
            }, {
                path: "uploadFile",
                component: uploadFile
            }]
        }, {
            path: 'search',
            component: search
        }, {
            path: 'approve',
            component: approve
        }, {
            path: 'modeldownload',
            component: modeldownload
        }, {
            path: 'statistics',
            component: statistics
        }]
    }, {
        path: '/mangeHome',
        component: mangeHome,
        children: [{
            path: 'meunFunSet',
            component: meunFunSet
        }, {
            path: 'userSet',
            component: userSet
        }, {
            path: 'permissionSet',
            component: permissionSet
        }, {
            path: 'roleManage',
            component: roleManage
        }]
    },
    ]
}
]
