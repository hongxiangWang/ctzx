const fillCon = {
  tel_number:'', //*中继号码/计费号码
  province: '新疆维吾尔自治区',//*省
  city: '',//*地市
  client_name: '',//*客户名称
  card_type: '',// *证件类型
  card_num: '',//*证件号码
  card_upfile: '',//*上传：证件附件
  contact_name: '',//联系人姓名
  company_address: '',//公司注册地址
  company_phone: '',//公司联系电话
  write_name: '',//*经办人姓名
  write_card_num: '',//*经办人身份证号码
  write_tel: '',//*经办人联系电话
  write_card_upfile: '',//*上传：经办人身份证附件
  where_use: '',//*使用用途
  call_center_card_upfile: '',//*上传：呼叫中心资质
  call_center_code: '',//*呼叫中心许可证编码
  business_status: '',//*业务状态
  network_system_business_status: '',//*智能网系统业务状态
  developer_type: '',//*发展人类型
  agents: '',//代理商名称
  developer_name: '',//发展人名称
  edit_people_card: localStorage.getItem('account').loginName,//编辑人工号
  edit_time: '',//编辑时间
  edit_content: '',//修改内容
  make_date: Date.now(),//拟稿日期
  create_people_name: localStorage.getItem('account').people_name,//申请人姓名
  create_people_dept: '',//申请部门
  card_validity_time: '',//*证件有效期
  contract_number: '',//*合同编号
  contract_maketime: Date.now(),//*合同签署日期
  crm_order_number: '',//*crm受理号
    //新增
    accounts_manager_name: '',// "客户经理姓名",
    accounts_manager_mobile:'',//  "客户经理联系电话",
    customer_value_license_name:'',//  "电信业务许可证名称（客户申请资源经营电信业务时必填）",
    customer_value_license_code: '',// "电信业务许可证编码（客户申请资源经营电信业务时必填）",
    customer_value_license_file:'',//  "电信业务许可证拍照上传（客户申请资源经营电信业务时必填）",


  //语音中继，呼叫中心
  son:[{
    circuit_bussines_number:'',//*电路业务号码
    circuit_bussines_name:'',//*电路业务名称
    tel_number:'',//*中继号码/计费号码
    xianlu_type:'',//*线路类型
    allow_cellnumber:'',//*允许传送的主叫号码
    relay_access_number:'',//中继接入号码
    jieruweizhi:'',//*接入位置
    shebei_type:'',//*对端接入设备类型
    touchuan: false,//*是否透传
    zhuanjie: false,//*是否转接
    relay_call_permiss:'',//*中继呼叫权限
    business_status: '',//*业务状态
    network_system_business_status: '',//*智能网系统业务状态
  }],

  //400业务
  is_telephone_number:true,//第一目的码是否电信号码
  first_purpose_code:'',//第一目的码
  other_purpose_code:'',//其余目的码
  upload_files:[],//上传：第一目的码与客户归属关系证明

  //呼叫中心
  seats_num:''//坐席数量
}
//语音中继
const isShowType1 = {
  showTable:true,
  show_seats: false,
  show400: false
}
// 400
const isShowType2 = {
  showTable:false,
  show_seats: false,
  show400: true
}


//呼叫中心
const isShowType3 = {
  showTable:true,
  show_seats: true,
  show400: false
}



export {fillCon,isShowType1,isShowType2,isShowType3}
