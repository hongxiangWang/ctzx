const infoCon = [
    {"serial_number": "流水号"},
    {"make_date": "拟稿时间"},
    {"client_name": "客户名称"},
    {"city": "地市"},
    {"card_type": "证件类型"},
    {"card_num": "证件号码"},
    {"card_upfile": "证件附件"},
    {"card_validity": "客户证件有效期"},
    {"contact_name": "联系人姓名"},
    {"company_phone": "公司联系电话"},
    {"company_address": "公司注册地址"},
    {"write_name": "经办人姓名"},
    {"write_card_num": "经办人身份证号码"},
    {"write_tel": "经办人联系电话"},
    {"write_card_upfile": "经办人身份证附件"},
    {"write_card_validity":"经办人身份证有效期"},
    {"where_use": "使用用途"},
    {"call_center_card_upfile": "呼叫中心资质"},
    {"call_center_code": "呼叫中心许可证编码"},
    {"developer_type": "发展人类型"},
    {"agents": "代理商名称"},
    {"developer_name": "发展人名称"},
    {"edit_people_card": "编辑人工号"},
    {"edit_time": "编辑时间"},
    {"edit_content": "修改内容"},
    {"create_people_name": "申请人姓名"},
    {"create_people_dept": "申请部门"},
    {"card_validity_time": "证件有效期"},
    {"contract_number": "合同编号"},
    {"contract_maketime": "合同签署日期"},
    {"crm_order_number":"crm受理号"},
    {"customer_prove": "客户关系证明"},
    {"information_safe_file": "信息安全承诺书"},
    {"seats_num": "坐席数量"},
    {"accounts_manager_name": "客户经理姓名"},
    {"accounts_manager_mobile": "客户经理联系电话"},
    {"customer_value_license_name": "电信业务许可证名称"},
    {"customer_value_license_code": "电信业务许可证编码"},
    {"customer_value_license_file": "电信业务许可证拍照上传"},
]


const sonCon = [
    {"circuit_bussines_number": "电路业务号码"},
    {"circuit_bussines_name": "电路业务名称"},
    {"tel_number": "中继号码/计费号码"},
    {"xianlu_type": "线路类型"},
    {"allow_cellnumber": "允许传送的主叫号码"},
    {"relay_access_number": "中继接入号码"},
    {"jieruweizhi": "接入位置"},
    {"shebei_type": "对端接入设备类型"},
    {"touchuan": "是否透传"},
    {"zhuanjie": "是否转接"},
    {"relay_call_permiss": "中继呼叫权限"},
    {"business_status": "业务状态"},
    {"network_system_business_status": "智能网系统业务状态"},
]

const sonCon400 = [
    {"tel_number":"400号码"},
    {"business_status": "业务状态"},
    {"network_system_business_status": "智能网系统业务状态"},
    {"is_telephone_number": "第一目的码是否电信号码"},
    {"first_purpose_code": "第一目的码"},
    {"upload_files": "第一目的码与客户归属关系证明"},
    {"other_purpose_code": "其余目的码"},
]
const switchArr = ['touchuan', 'zhuanjie', 'is_telephone_number']


const inputItem =
    ["client_name", "card_num", "contact_name", "company_address", "company_phone", "write_name", "write_card_num", "write_tel", "call_center_code", "agents", "developer_name", , "edit_content", "create_people_name", "contract_number", "seats_num", "circuit_bussines_number", "circuit_bussines_name", "tel_number", "allow_cellnumber", "relay_access_number", "jieruweizhi", "shebei_type", "first_purpose_code", "other_purpose_code","accounts_manager_name","accounts_manager_mobile","customer_value_license_name",'customer_value_license_code','crm_order_number'];

const noEditItem =
    ["serial_number","make_date","edit_people_card","create_people_dept"]

const dateItem =
    [ "edit_time", "card_validity_time", "contract_maketime", "card_validity","write_card_validity"]

const selectItem =
    ["city", "card_type", "where_use", "business_status", "network_system_business_status", "developer_type", "xianlu_type", "relay_call_permiss"]

const fileItem =
    ["card_upfile", "write_card_upfile", "call_center_card_upfile", "customer_prove", "information_safe_file", "upload_files","customer_value_license_file"]
const switchItem =
    ["touchuan", "zhuanjie", "is_telephone_number"]

const itemType = {
    "input": 1,
    "noEdit": 2,
    "date": 3,
    "select": 4,
    "file": 5,
    "switch": 6
}
//下拉选线的值，不包括city

import {city} from '../../assets/city';
const selectItemOption = {
    "card_type": ["营业执照", "组织机构代码", "三证合一", "其他"],
    "where_use": ["自用", "经营呼叫中心","平台代理","经营外包呼叫中心"],
    "business_status": ["启用", "违规关停", "暂停使用", "正常注销"],
    "network_system_business_status": ["激活", "加载", "去激活", "卸载", "删除"],
    "developer_type": ["直销", "代理商"],
    "xianlu_type": ["N7", "RPA", "R2"],
    "relay_call_permiss": ["呼入呼出双向", "仅呼入"],
    "city":require('store').get('areaArr')

}
//被要求不为空的选项
const requiredItem = [
    "tel_number","city","client_name","card_type","card_num","card_upfile","write_name","write_card_num","write_tel",
    "write_card_upfile","where_use","call_center_code","developer_type","card_validity_time","contract_number","contract_maketime",
    "crm_order_number","accounts_manager_name","accounts_manager_mobile","customer_value_license_name","customer_value_license_code",
    "customer_value_license_file","circuit_bussines_number","circuit_bussines_name","tel_number","xianlu_type","allow_cellnumber","jieruweizhi",
    "shebei_type","touchuan","zhuanjie","relay_call_permiss","is_telephone_number","first_purpose_code","upload_files","customer_prove",
    "information_safe_file","write_card_validity"
]

export {
    infoCon,
    sonCon,
    sonCon400,
    switchArr,
    inputItem,
    noEditItem,
    dateItem,
    selectItem,
    fileItem,
    switchItem,
    itemType,
    selectItemOption,
    requiredItem
}

