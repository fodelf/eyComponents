/*!
* Instruction : 过滤条件编辑器
* 
* Author : 吴文周
* 
* Date: 2017-04-05
*/
(function($,ey){
	"use strict";
	
    var ControllerFitter = function(attribute){
    	//扩展事件属性
		ey.extendProperty(this,"controller","widget",[attribute]);
		//dom对象
		this._domTemplate = $("<div class='ey-attrFitter'>"
							+"<div class='ey-attributeLine ey-attrTitleAdd'>"
							+"<label class='ey-dataLabel'></label>"	
							+"<span class='ey-attributeAdd'></span>"	
							+"</div>"
							+"<div class='ey-attrFitterContent'>"
							+"<div class='ey-attrMeasureDobFooter' title='请添加过滤条件'>"
							+"</div>"
							+"</div>"
							+"<div class='ey-attrPullDown ey-attrPull'>"
							+"<div class = 'ey-attrPullDownTitle'></div>"
							+"<div class = 'ey-attrPullContent'>"
							+"<div class = 'ey-attrPullDownContent'>"
							+"<div class = 'ey-attrPDT'><span class='ey-attrPDTTitle'>维度</span><span class='ey-PullClose'>关闭</span></div>"
							+"<div class = 'ey-attrPDDimContent'></div>"
							+"<div class = 'ey-attrPDT'><span class='ey-attrPDTTitle'>量度</span></div>"
							+"<div class = 'ey-attrPDMeaContent'></div>"
//							+"<div class = 'ey-attrPDT'><span class='ey-attrPDTTitle'>时间</span></div>"
//							+"<div class = 'ey-attrPDDateContent'></div>"
							+"</div>"
							+"<p class='ey-attrButtonLine'><button class='ey-commitBtn ey-btn'>确定</button></p>"
							+"</div>"
							+"</div>"
//							+"<div class='ey-attrMeasureFooter'>"
//							+"</div>"
							+"</div>");
		this.value = [];
    };
    //继承组件基类
    ey.extendFun(ControllerFitter,"controller","widget");
    //扩展当前组件
    ey.expandPrototype(ControllerFitter,{
    	//dom对象初始化
		domInit : function (){
			var currentObj = this;
			this._domTemplate.find("label").text(currentObj.attribute.name);
//			this._domTemplate.find("input").bind("input",function(){
//				currentObj.change();
//			})
		},
		_initEvent : function(){
			var currentObj = this;
			var dom = this._domTemplate;
			dom.find(".ey-PullClose").unbind("click");
			dom.find(".ey-PullClose").bind("click",function(){
				dom.find(".ey-attrPullDown").hide();
//				dom.find(".ey-attrMeasureDobFooter").show();
			});
			dom.find(".ey-attributeAdd").unbind("click");
			dom.find(".ey-attributeAdd").bind("click",function(){
				var valueArry = currentObj.value;
				if(currentObj.value.length == 0){
					dom.find(".ey-attrPullDown input").each(function(){
					 	$(this).prop("checked",false);
				 });
				}
				else{
					//数组状态设置
					 dom.find(".ey-attrPullDown input").each(function(){
						 	$(this).prop("checked",false);
						 	for(var i = 0 , len = valueArry.length;  i < len; i++){
								 var childValue = valueArry[i];
								 if($(this).prop("id") == childValue.colId){
									 $(this).prop("checked",true);
								 }
							 };
					 });
				};
				var hidePullDown = ey.eventLibrary.eventBase("hidePullDown");	
					currentObj.triggerEvent(hidePullDown);
//					if(dom.find(".ey-attrMeasureDobFooter").is(":hidden")){
//						dom.find(".ey-attrPullDown").css("margin-top","0px");
//					 }
//					 else{
//						 dom.find(".ey-attrPullDown").css("margin-top","-76px");
//					 }
					dom.find(".ey-attrPullDown").show();
			});
			dom.find(".ey-commitBtn").unbind("click");
			dom.find(".ey-commitBtn").bind("click",function(){
				dom.find(".ey-attrAddDom").remove();
				currentObj._addDom();
				dom.find(".ey-attrPullDown").hide();
//				dom.find(".ey-attrMeasureDobFooter").hide();
				
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
		// 新建dom 对象
		_addDom: function(){
			var currentObj = this;
			var trargetDom = this._domTemplate;
			var sapnDoms = this._domTemplate.find("input:checked");
			//如果没有选中的条件
			
			if(sapnDoms.length ==0){
				trargetDom.find(".ey-attrMeasureDobFooter").show();
				return;
			};
			trargetDom.find(".ey-attrAddDom").remove();
//			currentObj.value = [];
			sapnDoms.each(function(){
				var checked =  $(this).next();
				if(checked.text()){
					var dom =$("<div class='ey-attrAddDom'>"
						+"<span class='ey-controllerInputEditor ey-attributeLineInput ey-addDomSpan' ></span>"
						+"<span class='ey-attrAddDomRight'>"
						+"<span class='ey-attributeSetting'></span>"
						+"<span class='ey-attributeDelect'></span>"
						+"</span>"
						+"<div>");
					var textValue =  checked.text();
					var textId = checked.attr("value");
					var type = checked.attr("type");
					dom.find(".ey-controllerInputEditor").text(textValue);
					dom.find(".ey-controllerInputEditor").attr("value",textId);
					dom.find(".ey-controllerInputEditor").attr("type",type);
					trargetDom.find(".ey-attrFitterContent").append(dom);
					currentObj._bindEvent(dom);
					var isHave = true ;
					for(var i = 0 , len = currentObj.value.length ; i < len ; i++){
						if(currentObj.value[i].colId==textId){
							isHave = false ;
							break ;
						}
					}
					if(isHave){
						var fitterObj = {};
						fitterObj["colId"] = textId;
						fitterObj["colAlias"]  = textValue;
						fitterObj["colValue"] = [];
						fitterObj["colTypeCode"] = type;
						currentObj.value.push(fitterObj);
					}
					trargetDom.find(".ey-attrMeasureDobFooter").hide();
				}
				else{
					trargetDom.find(".ey-attrMeasureDobFooter").show();
				}
			});
			currentObj.change();
		},
		//设置对象属性值
		setCurrentValue : function(value){
			console.log(value)
			this.refurbishData("selsect",value);
			var dom = this._domTemplate;
			if(value.length > 0){
				this.value = value;
				var trargetDom = dom.find(".ey-attrFitterContent");
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
						trargetDom.append(dom);
						this._bindEvent(dom);
						this._initSetValue();
						this._initEvent();
				}				
			}
			else{
				dom.find(".ey-attrMeasureDobFooter").show();
			}
		},
		_initSetValue :function(){
			var currentObj = this;
			var dom  = this._domTemplate;
			dom.find(".ey-commitBtn").unbind("click");
			dom.find(".ey-attributeDelect").each(function(){
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
			var dataProces = this.getWidgetValue("dataProces");
			var currentObj = this;
			dom.find(".ey-attributeSetting").unbind("click");
			dom.find(".ey-attributeSetting").bind("click",function(){
			//这么写可能有问题
				var type = $(this).parent().prev().attr("type");
				var id = $(this).parent().prev().attr("value");
				var textValue = $(this).parent().prev().text();
				switch (type){
					case "dim":
					var param = {
						"colId":id,
						"colDataTypeCode":"VARCHAR",
					};
					//遍历循环条件
					var currentValue = {};
					var valueArry = currentObj.value;
					for(var i = 0 , len = valueArry.length;  i < len; i++){
						 var childValue = valueArry[i];
						 if( childValue.colId == id ){
							 currentValue  = childValue;
						 }
					};
					var eySearch = ey.widget.eySearch({
										"param":param,
										"dataProces" :dataProces,
										"value": currentValue,
										"commit":function(){
											var  fitterObj = {};
											fitterObj["colId"] = id;
											fitterObj["colAlias"]  = textValue;
											fitterObj["colValue"] = eySearch.getValue();
											fitterObj["isReversed"] = eySearch.getIsReversed();
											fitterObj["colTypeCode"] = "dim";
											fitterObj["value"] = true;
											fitterObj["operateType"] = eySearch.getOperateType();
											currentObj._updateValue(id);
											currentObj.value.push(fitterObj);
											currentObj.change();
											eySearch.close();						
										},
										"cancel":function(){
											eySearch.close();	
										}});
						eySearch.awake();							
						break;
					case "mesure":
					var param = {
						"colId":id,
						"colDataTypeCode":"NUMBER",
					};
					var currentValue = {};
					var valueArry = currentObj.value;
					for(var k = 0 , klen = valueArry.length;  k < klen; k++){
						 var childValue = valueArry[k];
						 if( childValue.colId == id ){
							 currentValue  = childValue;
						 }
					};
					var eyCount = ey.widget.eyCount({
										"param":param,
										"dataProces" :dataProces,
										"value": currentValue,
										"commit":function(){
											var  fitterObj = {};
											fitterObj["colId"] = id;
											fitterObj["colAlias"]  = textValue;
											fitterObj["colValue"] = eyCount.getValue();
											fitterObj["colTypeCode"] = "mesure";
											fitterObj["operateType"] = eyCount.getOperateType();
											fitterObj["value"] = true;
											currentObj._updateValue(id);
											currentObj.value.push(fitterObj);
											currentObj.change();
											eyCount.close();						
										},
										"cancel":function(){
											eyCount.close();	
										}});
						eyCount.awake();	
						break;
					case "date":
						var eyDate = ey.widget.eyDate();
						eyDate.domInit();
						var valueArry = currentObj.value;
						for(var k = 0 , klen = valueArry.length;  k < klen; k++){
							 var childValue = valueArry[k];
							 if( childValue.colId == id ){
								 eyDate.setValue(childValue.colValue);
							 }
						};
						var dateDom = eyDate.getJqDom();
						var eyTooltip = ey.widget.eyTooltip({
							"title":"请选择时间",
							"content":dateDom,
							"className":'ey-tooltipDate',
							"commit":function(){
								var  fitterObj = {};
								fitterObj["colId"] = id;
								fitterObj["colAlias"]  = textValue;
								fitterObj["colValue"] = eyDate.getValue();
								fitterObj["colTypeCode"] = "date";
								fitterObj["operateType"] = "BETWEEN";
								fitterObj["value"] = true;
								currentObj._updateValue(id);
								currentObj.value.push(fitterObj);
								currentObj.change();
								eyTooltip.close();
							},
							"cancel":function(){
								eyTooltip.close();	
							}});			
						eyTooltip.awake();
						break;
					default:
						break;
				}
			})
			
		},
		//获取变化值
		getChangeValue :function(){
			return this.value;
		},
		//刷新数据属性
		refurbishData : function(selsect){
			//切换数据时zhi
			var trargetDom = this._domTemplate;
			if(!selsect){
				trargetDom.find(".ey-attrAddDom").remove();
				trargetDom.find(".ey-attrMeasureDobFooter").show();
			};
			this.data = this.getWidgetValue("getFitterResult","fun");
			if(this.data){
				this._refurbishDom();
			}
		},
		//刷新dom
		_refurbishDom : function(){
			this._domTemplate.find(".ey-attrPDDimContent").html("");
			this._domTemplate.find(".ey-attrPDMeaContent").html("");
			var dimContent = this._domTemplate.find(".ey-attrPDDimContent");
			var mesContent = this._domTemplate.find(".ey-attrPDMeaContent");
			var data = this.data;
			var dimData = data.dim;
			var mesData = data.measure;
			var dateData  = data.date;
			for(var i = 0 ,len = dimData.length; i < len ; i ++){
				var temp = $("<div class='ey-attrCheakLine'><input type='checkbox' name='fitter' /></div>");
				var span = $("<span></span>");
					span.text(dimData[i].colAlias);
					//维度里面区分普通维度与时间维度弹出不同的控件
					if(dimData[i].colDataTypeCode == "VARCHAR"){
						span.attr({
								"value":dimData[i].colId,
								"type":"dim"
								});
					}
					else{
						span.attr({
							"value":dimData[i].colId,
							"type":"date"
							});
					}
				temp.find("input").prop("id",dimData[i].colId);	
				temp.append(span);	
				dimContent.append(temp);
			};
			for(var i = 0 ,len = mesData.length; i < len ; i ++){
				var temp = $("<div class='ey-attrCheakLine'><input type='checkbox' name='fitter' /></div>");
				var span = $("<span></span>");
					span.text(mesData[i].colAlias);
					span.attr(
						{
						"value":mesData[i].colId,
						"type":"mesure",
						});
				temp.find("input").prop("id",mesData[i].colId);
				temp.append(span);	
				mesContent.append(temp);
			};
			for(var i = 0 ,len = dateData.length; i < len ; i ++){
				var temp = $("<div class='ey-attrCheakLine'><input type='checkbox' name='fitter' /></div>");
				var span = $("<span></span>");
					span.text(dateData[i].colAlias);
					span.attr(
						{
						"value":dateData[i].colId,
						"type":"date",
						});
				temp.append(span);	
				mesContent.append(temp);
			};
			this._initEvent();
		},
		//数据源地址改变刷新数据源
		refurbish : function(refurbishValue){
			//当数据源为工作表和数据表时进行传参数类型切换
			if(refurbishValue == "source_dataTable" || refurbishValue == "source_workTable"){
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
			this._domTemplate.find(".ey-attrPullDown").hide();
		},
		
    });
    ey.widget.controllerFitter = function(attribute){
    	return new ControllerFitter(attribute);
    };
       
})($,ey);