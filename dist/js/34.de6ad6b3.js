"use strict";(self["webpackChunkvue_antd_pro"]=self["webpackChunkvue_antd_pro"]||[]).push([[34],{20034:function(e,a,t){t.r(a),t.d(a,{default:function(){return v}});var r=function(){var e=this,a=this,t=a._self._c;return t("a-card",{attrs:{bordered:!1}},[t("div",{staticClass:"table-page-search-wrapper"},[t("a-form",{attrs:{layout:"inline"}},[t("a-row",{attrs:{gutter:48}},[t("a-col",{attrs:{md:4,sm:24}},[t("a-form-item",{attrs:{label:"会员UID"}},[t("a-input",{attrs:{"allow-clear":""},model:{value:a.queryParam.id,callback:function(e){a.$set(a.queryParam,"id",e)},expression:"queryParam.id"}})],1)],1),t("a-col",{attrs:{md:4,sm:24}},[t("a-form-item",{attrs:{label:"邮箱"}},[t("a-input",{attrs:{"allow-clear":""},model:{value:a.queryParam.email,callback:function(e){a.$set(a.queryParam,"email",e)},expression:"queryParam.email"}})],1)],1),t("a-col",{attrs:{md:4,sm:24}},[t("a-form-item",{attrs:{label:"实名状态"}},[t("a-select",{attrs:{placeholder:"请选择","default-value":"0"},model:{value:a.queryParam.status,callback:function(e){a.$set(a.queryParam,"status",e)},expression:"queryParam.status"}},[t("a-select-option",{attrs:{value:"1"}},[a._v("已实名")]),t("a-select-option",{attrs:{value:"2"}},[a._v("未实名")])],1)],1)],1),t("a-col",{attrs:{md:4,sm:24}},[t("a-form-item",{attrs:{label:"盈利/亏损"}},[t("a-select",{attrs:{placeholder:"请选择","default-value":"0"},model:{value:a.queryParam.type,callback:function(e){a.$set(a.queryParam,"type",e)},expression:"queryParam.type"}},[t("a-select-option",{attrs:{value:"win"}},[a._v("盈利")]),t("a-select-option",{attrs:{value:"loss"}},[a._v("亏损")]),t("a-select-option",{attrs:{value:"normal"}},[a._v("正常")])],1)],1)],1),t("a-col",{attrs:{md:a.advanced?24:8,sm:24}},[t("span",{staticClass:"table-page-search-submitButtons",style:a.advanced&&{float:"right",overflow:"hidden"}||{}},[t("a-button",{attrs:{type:"primary"},on:{click:function(e){return a.$refs.table.refresh(!0)}}},[a._v("查询")]),t("a-button",{staticStyle:{"margin-left":"8px"},on:{click:function(){return e.queryParam={}}}},[a._v("重置")])],1)])],1)],1)],1),t("s-table",{ref:"table",attrs:{size:"default",rowKey:"id",columns:a.columns,data:a.loadData,showPagination:"auto",scroll:{x:"max-content"},bordered:""},scopedSlots:a._u([{key:"action",fn:function(e,r){return t("span",{},[[t("a",{on:{click:function(e){return a.detailUser(r)}}},[a._v("详情")]),t("a-divider",{attrs:{type:"vertical"}}),t("a",{on:{click:function(e){return a.modifyType(r)}}},[a._v("修改状态")]),t("a-divider",{attrs:{type:"vertical"}}),t("a",{on:{click:function(e){return a.upBalance(r)}}},[a._v("增减余额")])]],2)}}])}),t("a-modal",{attrs:{title:"盈亏状态",visible:a.typeVisible,confirmLoading:a.confirmLoading},on:{ok:a.typeUpOk,cancel:a.typeUpCance}},[t("a-form-model",{attrs:{model:a.userType,"label-col":{span:4},"wrapper-col":{span:14}}},[t("a-form-model-item",{attrs:{label:"盈亏状态",prop:"type",rules:{required:!0}}},[t("a-radio-group",{model:{value:a.userType.type,callback:function(e){a.$set(a.userType,"type",e)},expression:"userType.type"}},[t("a-radio",{attrs:{value:"win"}},[a._v(" 盈利 ")]),t("a-radio",{attrs:{value:"loss"}},[a._v(" 亏损 ")]),t("a-radio",{attrs:{value:"normal"}},[a._v(" 正常 ")])],1)],1)],1)],1),t("a-modal",{attrs:{title:"增减余额",visible:a.balanceVisible,confirmLoading:a.confirmLoading},on:{ok:a.balanceOk,cancel:a.balanceCance}},[t("a-form-model",{attrs:{model:a.userBalance,"label-col":{span:4},"wrapper-col":{span:14}}},[t("a-input",{attrs:{type:"number","allow-clear":""},model:{value:a.userBalance.balance,callback:function(e){a.$set(a.userBalance,"balance",e)},expression:"userBalance.balance"}})],1)],1)],1)},l=[],s=t(82165),n=t(70206),o=t(30381),i=t.n(o),u=t(46077),c=[{title:"UID",dataIndex:"id"},{title:"邮箱",dataIndex:"email"},{title:"实名状态",dataIndex:"realStatus",customRender:function(e){return"1"===e?e:"未实名"}},{title:"波场地址",dataIndex:"trxAddress"},{title:"以太坊地址",dataIndex:"evmAddress"},{title:"盈利/亏损",dataIndex:"type",customRender:function(e){return"win"===e?"盈利":"loss"===e?"亏损":"normal"===e?"正常":void 0}},{title:"操作",dataIndex:"action",scopedSlots:{customRender:"action"}}],m={name:"TableList",components:{STable:s.m7,Ellipsis:s.mH,CreateMemberForm:u.Z},data:function(){var e=this;return this.columns=c,{editLevel:!1,formState:{level:"0",id:""},confirmLoading:!1,typeVisible:!1,balanceVisible:!1,userBalance:{id:"",balance:""},advanced:!1,queryParam:{},userType:{type:""},loadData:function(a){var t=Object.assign({},a,e.queryParam);return(0,n.tK)(t).then((function(e){return e.data}))}}},methods:{disabledDate:function(e){if(this.queryParam.startDate)return e<i()(this.queryParam.startDate)},modifyType:function(e){this.userType.id=e.id,this.userType.type=e.type,this.typeVisible=!0},typeUpOk:function(){var e=this;(0,n.lQ)(this.userType).then((function(){e.typeVisible=!1,e.$refs.table.refresh(!0),e.upUserModel={}})).catch((function(){e.visible=!1,e.upUserModel={}}))},typeUpCance:function(){this.typeVisible=!1,this.userType={}},detailUser:function(e){var a=this;(0,n.n3)(e.id).then((function(e){a.$refs.table.refresh(!0)}))},balanceOk:function(){var e=this;(0,n.Fg)(this.userBalance).then((function(){e.balanceVisible=!1,e.$message.success("操作成功"),e.$refs.table.refresh(!0),e.userBalance={}})).catch((function(){e.visible=!1,e.userBalance={}}))},balanceCance:function(){this.balanceVisible=!1,this.userBalance={}},upBalance:function(e){this.userBalance.id=e.id,this.userBalance.balance=e.balance,this.balanceVisible=!0}}},d=m,p=t(1001),f=(0,p.Z)(d,r,l,!1,null,null,null),v=f.exports},46077:function(e,a,t){t.d(a,{Z:function(){return m}});t(68309);var r=function(){var e=this,a=e._self._c;return a("a-modal",{attrs:{title:e.ruleForm&&e.ruleForm.id?"编辑会员":"新增会员",width:640,visible:e.visible,confirmLoading:e.loading},on:{ok:e.confirmHandler,cancel:e.cancelHandler}},[a("a-spin",{attrs:{spinning:e.loading}},[a("a-form-model",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-col":{span:5},"wrapper-col":{span:15}}},[a("a-form-model-item",{attrs:{label:"会员名称",prop:"name"}},[a("a-input",{attrs:{placeholder:"请输入会员名称",allowClear:""},model:{value:e.ruleForm.name,callback:function(a){e.$set(e.ruleForm,"name",a)},expression:"ruleForm.name"}})],1),a("a-form-model-item",{attrs:{label:"会员手机号码",prop:"phone"}},[a("a-input",{attrs:{placeholder:"请输入会员手机号码",allowClear:""},model:{value:e.ruleForm.phone,callback:function(a){e.$set(e.ruleForm,"phone",a)},expression:"ruleForm.phone"}})],1),a("a-form-model-item",{attrs:{label:"会员等级",prop:"userLevel"}},[a("a-select",{attrs:{allowClear:"",placeholder:"请选择会员等级"},model:{value:e.ruleForm.userLevel,callback:function(a){e.$set(e.ruleForm,"userLevel",a)},expression:"ruleForm.userLevel"}},e._l(e.userLevelArr,(function(t){return a("a-select-option",{key:t.value,attrs:{value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),1)],1),a("a-form-model-item",{attrs:{label:"推荐人",prop:"tjr"}},[a("a-input",{attrs:{placeholder:"请输入推荐人",allowClear:""},model:{value:e.ruleForm.tjr,callback:function(a){e.$set(e.ruleForm,"tjr",a)},expression:"ruleForm.tjr"}})],1),a("a-form-model-item",{attrs:{label:"运营中心",prop:"yyzx"}},[a("a-radio-group",{attrs:{"default-value":"1"},model:{value:e.ruleForm.yyzx,callback:function(a){e.$set(e.ruleForm,"yyzx",a)},expression:"ruleForm.yyzx"}},[a("a-radio",{attrs:{value:"1"}},[e._v(" 是 ")]),a("a-radio",{attrs:{value:"2"}},[e._v(" 否 ")])],1)],1),a("a-form-model-item",{attrs:{label:"分公司",prop:"fgs"}},[a("a-radio-group",{attrs:{"default-value":"1"},model:{value:e.ruleForm.fgs,callback:function(a){e.$set(e.ruleForm,"fgs",a)},expression:"ruleForm.fgs"}},[a("a-radio",{attrs:{value:"1"}},[e._v(" 是 ")]),a("a-radio",{attrs:{value:"2"}},[e._v(" 否 ")])],1)],1)],1)],1)],1)},l=[],s=t(70206),n=[{value:"1",label:"个人代理"},{value:"2",label:"企业代理"},{value:"3",label:"县级代理"},{value:"4",label:"城市代理"},{value:"5",label:"省级代理"}],o={data:function(){return{visible:!1,loading:!1,ruleForm:{},rules:{name:[{required:!0,message:"请输入会员名称",trigger:"blur"}],phone:[{required:!0,message:"请输入会员手机号码",trigger:"blur"},{pattern:/^1[34578]\d{9}$/,message:"请输入正确的手机号码"}],userLevel:[{required:!0,message:"请选择会员等级",trigger:"change"}],yyzx:[{required:!0,message:"请选择运营中心"}],fgs:[{required:!0,message:"请选择分公司"}],tjr:[{required:!0,message:"请输入推荐人",trigger:"blur"}]},userLevelArr:n}},methods:{open:function(e){var a=this;e.userLevel&&(e.userLevel=e.userLevel+""),this.ruleForm=e,this.visible=!0,setTimeout((function(){a.$refs.ruleForm.clearValidate()}),100)},cancelHandler:function(){this.visible=!1},confirmHandler:function(){var e=this;this.$refs.ruleForm.validate((function(a){a&&(e.loading=!0,(0,s.createOrUpdateMember)(e.ruleForm).then((function(){e.loading=!1,e.$notification.success({message:"成功提示",description:"".concat(e.ruleForm.id?"编辑":"创建","会员成功")}),e.visible=!1,e.$emit("ok")})).catch((function(){e.loading=!1})))}))}}},i=o,u=t(1001),c=(0,u.Z)(i,r,l,!1,null,null,null),m=c.exports}}]);