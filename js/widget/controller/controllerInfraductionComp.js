/*!
* Instruction : 下转属性编辑器
* 
* Author : 吴文周
* 
* Date: 2017-04-14
*/
(function($,ey){
	"use strict";
	
    var ControllerInfraductionComp = function(attribute){
    	//扩展事件属性
		ey.extendProperty(this,"controller","widget",[attribute]);
		//dom对象
		this._domTemplate = $("<div class='ey-attrSort'>"
							+"<div class='ey-attributeLine ey-attrTitleAdd'>"
							+"<label class='ey-dataLabel'></label>"	
							+"<span class='ey-attributeAdd'></span>"	
							+"</div>"
							+"<div class='ey-attSortContent'>"
							+"<div class='ey-attrMeasureDobFooter' title='请选择下钻维度,最多支持三层下钻'>"
							+"</div>"
							+"<div class='ey-attrInfrContent'>"
							+"</div>"
							+"</div>"
							+"<div class='ey-attInfrPullDown'>"
							+"<div class = 'ey-attSortPullDownTitle'></div>"
							+"<div class = 'ey-attSortPullDownContent'>"
							+"<div class = 'ey-attrPDT'><span class='ey-attrPDTTitle'>维度</span><span class='ey-PullClose'>关闭</span></div>"
							+"<div class = 'ey-attrPDDimContent'></div>"
							+"</div>"
							+"<p class='ey-attrButtonLine'><button class='ey-commitBtn ey-btn'>确定</button></p>"
							+"</div>"
							+"</div>"							
							+"</div>");
		this._content = $("<div class='ey-attrSortTooltip'>"
				+"<span>排序方式：</span>"
				+"<input type='radio'name = 'attrInfra' value='up' checked='checked'/><label>上移</label>"
				+"<input type='radio'name = 'attrInfra' value='down' /><label>下移</label>"
				+"</div>"
				+"</div>");
		this.data = {"dim":[],};
		this.arry =[];
		this.value = [];
    };
    //继承组件基类
    ey.extendFun(ControllerInfraductionComp,"controller","widget");
    //扩展当前组件
    ey.expandPrototype(ControllerInfraductionComp,{
    	//dom对象初始化
		domInit : function (){
			var currentObj = this;
			this._domTemplate.find("label").text(currentObj.attribute.name);
//			this.refurbishData();
		},
		//设置事件初始化
		_initEvent : function(){
			var currentObj = this;
			var dom = this._domTemplate;
			// 选择前三设置
			dom.find("input[type = 'checkbox']").each(function(){
				$(this).on("change",function(){
					if($(this).is(":checked")){
						currentObj.arry.push($(this));
						if(dom.find("input[type='checkbox']:checked").length >3){
							currentObj.arry[0].prop("checked",false);
							currentObj.arry.splice(0,1);
						}
					}
					else{
						for(var  i = 0, len = currentObj.arry.length ; i < len ; i ++){
							if($(this).is(currentObj.arry[i])){
								currentObj.arry.splice(i,1);
								break;
							}
						}
					}
				})
			});
			//设置事件初始化
			//关闭事件
			dom.find(".ey-PullClose").unbind("click");
			dom.find(".ey-PullClose").bind("click",function(){
				dom.find(".ey-attInfrPullDown").hide();
//				dom.find(".ey-attrMeasureDobFooter").show();
			});
			//显示下拉框事件
			dom.find(".ey-attributeAdd").unbind("click");
			dom.find(".ey-attributeAdd").bind("click",function(){
				if(currentObj.value.length == 0){
					dom.find(".ey-attInfrPullDown input").each(function(){
					 	$(this).prop("checked",false);
				 });
				}
				else{
					//数组状态设置
					var valueArry = currentObj.value;
					 dom.find(".ey-attInfrPullDown input").each(function(){
						 	$(this).prop("checked",false);
						 	for(var i = 0 , len = valueArry.length;  i < len; i++){
								 var childValue = valueArry[i];
								 if($(this).attr("valueId") == childValue.colId){
									 $(this).prop("checked",true);
								 }
							 };
					 });
				};
				var hidePullDown = ey.eventLibrary.eventBase("hidePullDown");	
					currentObj.triggerEvent(hidePullDown); 
				dom.find(".ey-attInfrPullDown").show();
			});
			//点击确定事件
			dom.find(".ey-commitBtn").unbind("click");
			dom.find(".ey-commitBtn").bind("click",function(){
				
				dom.find(".ey-attrAddDom").remove();
				currentObj._addDom();
				currentObj.change();
				dom.find(".ey-attInfrPullDown").hide();
				dom.find(".ey-attributeDelect").unbind("click");
				dom.find(".ey-attributeDelect").each(function(){
					$(this).unbind("click");
					$(this).bind("click",function(){
						var value = $(this).parent().parent().find("span").eq(0).attr("value");
						currentObj._updateValue(value);
						$(this).parent().parent().remove();
						currentObj.change();
						if(dom.find(".ey-controllerInputEditor").length ==0){
							dom.find(".ey-attrMeasureDobFooter").show();
						};
					});
				});
			});	
		},
		// 新建dom 对象
		_addDom: function(){
			var currentObj = this;
			var trargetDom = this._domTemplate;
			trargetDom.find(".ey-attrAddDom").remove();
			this._domTemplate.find("input:checked").each(function(){
					var sapnDom = $(this).next();
					var dom =$("<div class='ey-attrAddDom'>"
							+"<span class='ey-controllerInputEditor ey-attributeLineInput ey-addDomSpan' ></span>"
							+"<span class='ey-attrAddDomRight'>"
							+"<span class='ey-attributeSetting'></span>"
							+"<span class='ey-attributeDelect'></span>"
							+"</span>"
							+"<div>"); 
				if(sapnDom.text()){
					var textValue =  sapnDom.text();
					var textId = sapnDom.attr("value");
					var type = sapnDom.attr("type");
					dom.find(".ey-controllerInputEditor").text(textValue);
					dom.find(".ey-controllerInputEditor").attr("value",textId);
					dom.find(".ey-controllerInputEditor").attr("type",type);
//					dom.find(".ey-attrUp").attr("value",textId);
//					dom.find(".ey-attrDown").attr("value",textId);
					dom.find(".ey-attributeSetting").attr("value",textId);
					dom.prop("id",textId);
					trargetDom.find(".ey-attrInfrContent").append(dom);
					trargetDom.find(".ey-attrMeasureDobFooter").hide();
					currentObj._bindEvent(dom);
				}
				else{
					trargetDom.find(".ey-attrMeasureDobFooter").show();
				}
					
			});
			
		},
		//设置对象属性值
		setCurrentValue : function(value){
			this.refurbishData("selsect",value);
			if(value.length >0){
				this.value = value;
				this.refurbishData("selsect",value);
				var dom = this._domTemplate;
				var trargetDom = dom.find(".ey-attrInfrContent");
				dom.find(".ey-attrMeasureDobFooter").hide();
				for(var i = 0 ,len = value.length ; i< len; i ++){
					var childValue = value[i];
				var dom =$("<div class='ey-attrAddDom'>"
						+"<span class='ey-controllerInputEditor ey-attributeLineInput ey-addDomSpan' ></span>"
						+"<span class='ey-attrAddDomRight'>"
						+"<span class='ey-attributeSetting'></span>"
						+"<span class='ey-attributeDelect'></span>"
						+"</span>"
						+"<div>");
					dom.find(".ey-controllerInputEditor").text(childValue.colAlias);
					dom.find(".ey-controllerInputEditor").attr("value",childValue.colId);
					dom.find(".ey-controllerInputEditor").attr("type",childValue.colTypeCode);
					dom.find(".ey-attributeSetting").attr("value",childValue.colId);
					dom.prop("id",childValue.colId);
					trargetDom.find(".ey-attrInfrContent").append(dom);
					trargetDom.append(dom);
					this._bindEvent(dom);
					this._setInitEvent();
				}	
			}						
		},
		_setInitEvent : function(){
			var dom = this._domTemplate;
			var currentObj = this;
			dom.find(".ey-attributeDelect").unbind("click");
			dom.find(".ey-attributeDelect").each(function(){
				$(this).unbind("click");
				$(this).bind("click",function(){
					var value = $(this).parent().parent().find("span").eq(0).attr("value");
					currentObj._updateValue(value);
					$(this).parent().parent().remove();
					currentObj.change();
					if(dom.find(".ey-controllerInputEditor").length ==0){
						dom.find(".ey-attrMeasureDobFooter").show();
					};
				});
			});
		},
		//绑定事件
		_bindEvent : function(dom){
			var currentObj = this;
			var trargetDom = this._domTemplate;
			dom.find(".ey-attributeSetting").bind("click",function(){
				currentObj._dom = $(this);
				var eyTooltip = ey.widget.eyTooltip({
					"title":"请排序",
					"content":currentObj._content,
					"className":'ey-tooltipSmall',
					"commit":function(){
						var value = currentObj._content.find("input:checked").val();
						var dom = currentObj._dom;
						if(value == "up"){
							var id ="#" + dom.attr("value");
							if(trargetDom.find(id).prev().length > 0){
								var cloneDom = trargetDom.find(id).clone(true);
								trargetDom.find(id).prev().before(cloneDom);
								dom.parent().parent().remove();
							}
						}
						else{
							var id ="#" + dom.attr("value");
							if(trargetDom.find(id).next().length > 0 ){
								var cloneDom = trargetDom.find(id).clone(true);
								trargetDom.find(id).next().after(cloneDom);
								dom.parent().parent().remove();
							}
						}
						currentObj.change();
						eyTooltip.close();	
					},
					"cancel":function(){
						eyTooltip.close();	
					}});							
				eyTooltip.awake();
			});
			
		},
		//获取变化值
		getChangeValue :function(){
			var Arry = [];
			var dom = this._domTemplate;
			dom.find(".ey-controllerInputEditor").each(function(){
				var valueObj = {};
				valueObj["colAlias"] = $(this).text();
				valueObj["colId"] = $(this).attr("value");
				valueObj["colTypeCode"] = $(this).attr("type");
				//valueObj["colStatisCode"] = $(this).attr("colStatisCode");
				Arry.push(valueObj);
			});
			this.value = Arry;
			return Arry;
		},
		//刷新数据属性
		refurbishData : function(selsect){
			//切换数据时
			var trargetDom = this._domTemplate;
			if(!selsect){
				trargetDom.find(".ey-attrAddDom").remove();
				trargetDom.find(".ey-attrMeasureDobFooter").show();
			};
//			else{
			this.data["dim"] = this.getWidgetValue("getDimResult","fun");
//			}
//			this.data["dim"] = this.getWidgetValue("getDim","fun");
//			this.data["measure"] = this.getWidgetValue("getMeasure","fun");
			this._refurbishDom();
			
		},
		//刷新dom
		_refurbishDom : function(){
			this._domTemplate.find(".ey-attrPDDimContent").html("");
			var dimContent = this._domTemplate.find(".ey-attrPDDimContent");
			var data = this.data;
			var dimData = data.dim;
			if(!dimData){
				return;
			};
			if(dimData){
				for(var i = 0 ,len = dimData.length; i < len ; i ++){
					var temp = $("<div class='ey-attrCheakLine'><input type='checkbox' name='infComp' /></div>");
					var span = $("<span></span>");
						span.text(dimData[i].colAlias);
						var dimType  = dimData[i].colDataTypeCode == "VARCHAR" ? "DIM": "DATE";
						span.attr(
							{
							"value":dimData[i].colId,
							"type":dimType
							});
					temp.find("input").attr("valueId",dimData[i].colId);
					temp.append(span);	
					dimContent.append(temp);
				};
			};
			this._initEvent();
		},
		_updateValue : function(value){
			var valueArry = this.value;
			for(var i = 0 ,len = valueArry.length ; i < len; i++){
				var childValue = valueArry[i];
				if(childValue.colId == value){
					this.value.splice(i,1);
					break;
				}
			}
		},
		//数据源地址改变刷新数据源
		refurbish : function(refurbishValue){
			//当数据源为工作表和数据表时进行传参数类型切换
			if(refurbishValue == "source_dataTable"  || refurbishValue == "source_workTable"){
				this._domTemplate.show();
				this.sourceType = refurbishValue;
			}
			//静态数据隐藏次功能
			else{
				this._domTemplate.hide();
			}
		},
		//隐藏下拉框方法
		hidePullDown : function(){			
			this._domTemplate.find(".ey-attInfrPullDown").hide();
		},
    });
    ey.widget.controllerInfraductionComp = function(attribute){
    	return new ControllerInfraductionComp(attribute);
    };
       
})($,ey);