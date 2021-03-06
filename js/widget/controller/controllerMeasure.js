/*!
* Instruction : 量度编辑器
* 
* Author : 吴文周
* 
* Date: 2017-04-12
*/
(function($,ey){
	"use strict";
	
    var ControllerMeasure = function(attribute){
    	//扩展事件属性
		ey.extendProperty(this,"controller","widget",[attribute]);
		//dom对象
		this._domTemplate = $("<div class='ey-attrMeasure'>"
							+"<div class='ey-attrMeasureHeader ey-attrTitleAdd'>"
							+"<label class='ey-dataLabel'></label>"	
							+"<span class='ey-attributeAdd'></span>"	
							+"</div>"
							+"<div class='ey-attMesureContent'>"
							+"<div class='ey-attrMeasureFooter' title='请添加轴字段否则无法绘制图形'>"
							+"</div>"
							+"<div class='ey-attrPullDown'>"
							+"<div class = 'ey-attrPullDownTitle'></div>"
							+"<div class = 'ey-attrPullDownContent'>"
							+"<div class = 'ey-attrPDT'><span class='ey-attrPDTTitle'>维度</span><span class='ey-PullClose'>关闭</span></div>"
							+"<div class = 'ey-attrPDDimContent'></div>"
							+"<div class = 'ey-attrPDT'><span class='ey-attrPDTTitle'>量度</span></div>"
							+"<div class = 'ey-attrPDMeaContent'></div>"
							+"</div>"
							+"<p class='ey-attrButtonLine'><button class='ey-commitBtn ey-btn'>确定</button></p>"
							+"</div>"
							+"</div>"
//							+"<div class='ey-attrMeasureFooter'>"
//							+"</div>"
							+"</div>");
		this._dimContent = $("<div class='ey-attrSortTooltip'><span>请选择数据显示：</span><input type='radio'name = 'attrSort' value='all' checked='checked'/><label>显示全部</label><input type='radio' name = 'attrSort' value='some' class='ey-attrMesSome'/><label>显示前</label><input type='number' class='ey-attMeaNum' value='1'/></div>");
		this._mesContent = $("<div class='ey-attrMeaTooltip'>"
							+"<div class='ey-attrMeaTooltipFirst'>"
							+"<span>聚合方式：</span>"
							+"<span>"
							+"<input type='radio'name = 'attrSort' value='SUM' checked='checked'/><label>求和</label>"
							+"</span>"
							+"<span>"
							+"<input type='radio'name = 'attrSort' value='MAX' /><label>最大值</label>"
							+"</span>"
							+"<span>"
							+"<input type='radio'name = 'attrSort' value='MIN' /><label>最小值</label>"
							+"</span>"
							+"</div>"
							+"<div class='ey-attrMeaTooltipSecond'>"
							+"<span>"
							+"<input type='radio'name = 'attrSort' value='AVG' /><label>平均值</label>"
							+"</span>"
							+"<span>"
							+"<input type='radio'name = 'attrSort' value='COUNT' /><label>计数</label>"
							+"</span>"
							+"<span>"
							+"<input type='radio'name = 'attrSort' value='COUNTDISTINCT' /><label>去重计数</label>"
							+"</span>"
							+"</div>"
							+"</div>");
		this._dimMEAContent = $("<div class='ey-attrSortTooltip'>"
							+"<span>聚合方式：</span>"
							+"<input type='radio'name = 'attrSort' value='COUNT'checked='checked'/><label>计数</label>"
							+"<input type='radio'name = 'attrSort' value='COUNTDISTINCT' /><label>去重计数</label>"
							+"</div>"
							+"</div>");
		this.arry = []; 
    };
    //继承组件基类
    ey.extendFun(ControllerMeasure,"controller","widget");
    //扩展当前组件
    ey.expandPrototype(ControllerMeasure,{
    	//dom对象初始化
		domInit : function (){
			var currentObj = this;
			var dom = this._domTemplate;
			dom.find("label").text(currentObj.attribute.name);
			if(this.attribute.controllerLevel){
				dom.addClass("ey-attrMeasureCom");
				dom.find(".ey-attrMeasureFooter").addClass("ey-attrMeasureDobFooter").removeClass("ey-attrMeasureFooter");
				dom.find(".ey-attrPullDown").addClass("ey-attrPulMes");
			}
		},
		_initEvent : function(){
			var currentObj = this;
			var dom = this._domTemplate;
			if(currentObj.attribute.count){
//				dom.find("input[type = 'checkbox']").on("change",function(){
//					//根据选择维度两个量度
//					if(dom.find("input[type='checkbox']:checked").length >2){
//						
//						dom.find("input[type='checkbox']:checked").eq(0).prop("checked",false);
//					}
//				})
				dom.find("input[type = 'checkbox']").each(function(){
					$(this).on("change",function(){
						if($(this).is(":checked")){
							currentObj.arry.push($(this));
							if(dom.find("input[type='checkbox']:checked").length >2){
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
				
			};
			dom.find(".ey-PullClose").unbind("click");
			dom.find(".ey-PullClose").bind("click",function(){
//				dom.find(".ey-attrMeasureFooter").show();
//				dom.find(".ey-attrMeasureDobFooter").show();
				dom.find(".ey-attrPullDown").hide();
			});
			dom.find(".ey-attributeAdd").unbind("click");
			dom.find(".ey-attributeAdd").bind("click",function(){
				//弹出内容回读
				var valueArry = currentObj._value;
				if(currentObj._value.length == 0){
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
//				dom.find(".ey-attrAddDom").remove();
				var hidePullDown = ey.eventLibrary.eventBase("hidePullDown");	
					currentObj.triggerEvent(hidePullDown); 
					if(dom.find(".ey-attrMeasureFooter").length >0){
						 if(dom.find(".ey-attrMeasureFooter").is(":hidden")){
							 dom.find(".ey-attrPullDown").css("margin-top","0px");
						 }
						 else{
							 dom.find(".ey-attrPullDown").css("margin-top","-40px");
						 }
					}
					else if(dom.find(".ey-attrMeasureDobFooter").length >0){
						 if(dom.find(".ey-attrMeasureDobFooter").is(":hidden")){
							 dom.find(".ey-attrPullDown").css("margin-top","0px");
						 }
						 else{
							 dom.find(".ey-attrPullDown").css("margin-top","-50px");
						 }
					}
				    dom.find(".ey-attrPullDown").show();
				    
				
			});
			dom.find(".ey-commitBtn").unbind("click");
			dom.find(".ey-commitBtn").bind("click",function(){
				dom.find(".ey-attrAddDom").remove();
				currentObj._addDom();
				currentObj.change();
				dom.find(".ey-attrPullDown").hide();
//				dom.find(".ey-attrMeasureFooter").hide();
				dom.find(".ey-attributeDelect").unbind("click");
				dom.find(".ey-attributeDelect").each(function(){
					$(this).bind("click",function(){
						//这样查找是有一定问题的
						$(this).parent().parent().remove();
						currentObj.change();
						if(dom.find(".ey-controllerInputEditor").length ==0){
							dom.find(".ey-attrMeasureFooter").show();
							dom.find(".ey-attrMeasureDobFooter").show();
						};
//						dom.find("input[type=radio]").each(function(){
////							$(this).attr("checked",false);
//						});
						//上次选中的是否要清除选中？
//						$("body input").each(function(){
//							$(this).attr("checked",false);
//						});
					})
				});
			});	
		},
		//隐藏下拉框方法
		hidePullDown : function(){			
			this._domTemplate.find(".ey-attrPullDown").hide();
		},
		// 新建dom 对象
		_addDom: function(){
			var sapnDom = this._domTemplate.find("input:checked");
			var trargetDom = this._domTemplate;
			if(sapnDom.length ==0){
				trargetDom.find(".ey-attrMeasureFooter").show();
				trargetDom.find(".ey-attrMeasureDobFooter").show();
				return;
			};
			trargetDom.find(".ey-attrAddDom").remove();
			var currentObj = this; 			
			sapnDom.each(function(){
				var sapnDom = $(this).next();
				if(sapnDom.text()){
					var dom =$("<div class='ey-attrAddDom'>"
						+"<span class='ey-controllerInputEditor ey-attributeLineInput ey-addDomSpan'></span>"
						+"<span class='ey-attrAddDomRight'>"
						+"<span class='ey-attributeSetting'></span>"
						+"<span class='ey-attributeDelect'></span>"
						+"</span>"
						+"<div>");
					var textValue =  sapnDom.text();
					var textId = sapnDom.attr("value");
					var type = sapnDom.attr("colTypeCode");
					dom.find(".ey-controllerInputEditor").text(textValue);
					dom.find(".ey-controllerInputEditor").attr("value",textId);
					dom.find(".ey-controllerInputEditor").attr("colTypeCode",type);
					trargetDom.find(".ey-attMesureContent").append(dom);
					if(currentObj.attribute.functionName == "dim"){
						currentObj._bindDimEvent(dom,textValue);
					}
					else{
						if(type == "MEA"){
							currentObj._bindMesEvent(dom,textValue);
						}
						else{
							currentObj._bindDimMesEvent(dom,textValue);
						}
					}
					trargetDom.find(".ey-attrMeasureFooter").hide();
					trargetDom.find(".ey-attrMeasureDobFooter").hide();
				}
				else{
					trargetDom.find(".ey-attrMeasureFooter").show();
					trargetDom.find(".ey-attrMeasureDobFooter").show();
				}
			})
		},
		_bindDimMesEvent : function (dom,textValue,value){
			var currentObj = this;
			var widget = this.getWidget();
			if(value){
				currentObj._mesContent.find("input").each(function(){
					$(this).prop("checked",false);
					if($(this).val() == value){
						$(this).prop("checked",true);
					}
				});
				currentObj._dimMEAContent.find("input").each(function(){
					$(this).prop("checked",false);
					if($(this).val() == value){
						$(this).prop("checked",true);
					}
				})
			};
			dom.find(".ey-attributeSetting").bind("click",function(){
				var eyTooltip = ey.widget.eyTooltip({
						"title":textValue,
						"content":currentObj._dimMEAContent,
						"className":'ey-tooltipSmall',
						"commit":function(){
							var value = currentObj._dimMEAContent.find("input:checked").val();
							dom.find(".ey-controllerInputEditor").attr({
								"colStatisCode" :value
							});
							currentObj.change();
							eyTooltip.close();	
						},
						"cancel":function(){
							eyTooltip.close();	
						}});							
				eyTooltip.awake();
			});
		},
		_bindMesEvent : function(dom,textValue,value){
			var currentObj = this;
			var widget = this.getWidget();
			if(value){
				currentObj._mesContent.find("input").each(function(){
					$(this).prop("checked",false);
					if($(this).val() == value){
						$(this).prop("checked",true);
					}
				})
			};
			dom.find(".ey-attributeSetting").bind("click",function(){
				var eyTooltip = ey.widget.eyTooltip({
						"title":textValue,
						"content":currentObj._mesContent,
						"className":'ey-tooltipSmall',
						"commit":function(){
							var value = currentObj._mesContent.find("input:checked").val();
							dom.find(".ey-controllerInputEditor").attr({
								"colStatisCode" :value
							});
							currentObj.change();
							eyTooltip.close();	
						},
						"cancel":function(){
							eyTooltip.close();	
						}});							
				eyTooltip.awake();
			});
		},
		//绑定事件
		_bindDimEvent : function(dom,textValue,page){
			var currentObj = this;
			var widget = this.getWidget();
			if(page){
				var pageSize = page.pageSize;
				if(pageSize){
					currentObj._dimContent.find(".ey-attrMesSome").attr("checked",true);
					currentObj._dimContent.find(".ey-attMeaNum").val(pageSize);
				}
			}
			dom.find(".ey-attributeSetting").bind("click",function(){
				var eyTooltip = ey.widget.eyTooltip({
						"title":textValue,
						"content":currentObj._dimContent,
						"className":'ey-tooltipSmall',
						"commit":function(){
							var page = {"pageNum":1,"pageSize":""};
							var value =  currentObj._dimContent.find("input:checked").val();
							if(value == "all"){
								page["pageNum"] = -1;
							}
							else{
								var size = currentObj._dimContent.find(".ey-attMeaNum").val()
								page["pageSize"] = size;
							}
							widget.setPage(page);
							eyTooltip.close();	
						},
						"cancel":function(){
							eyTooltip.close();	
						}});							
				eyTooltip.awake();
			});
		},
		//设置对象属性值属性值回读
		setCurrentValue : function(value){
			//如果有值设置状态值回读
			//初始化刷新数据属性
			this.refurbishData("selsect",value);
			this._value = value;
			var dom = this._domTemplate;
			if(value.length > 0){
				var trargetDom = dom.find(".ey-attMesureContent");
				dom.find(".ey-attrMeasureFooter").hide();
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
						if(this.attribute.functionName == "dim"){
							var widget = this.getWidget();
							var page = widget.getPage();
							this._bindDimEvent(dom,childValue.colAlias,page);
						}
						else{
							if(childValue.colTypeCode == "MEA"){
								this._bindMesEvent(dom,childValue.colAlias,childValue.colStatisCode);
							}
							else{
								this._bindDimMesEvent(dom,childValue.colAlias,childValue.colStatisCode);
							}
						}	
				}
				this._initSetValue();
			}
			else{
				dom.find(".ey-attrMeasureFooter").show();
				dom.find(".ey-attrMeasureDobFooter").show();
			}
		},
		_initSetValue : function(){
			var currentObj = this;
			var dom  = this._domTemplate;
			dom.find(".ey-attributeDelect").unbind("click");
				dom.find(".ey-attributeDelect").each(function(){
					$(this).bind("click",function(){
						//这样查找是有一定问题的
						$(this).parent().parent().remove();
						currentObj.change();
						dom.find(".ey-attrMeasureFooter").show();
						dom.find(".ey-attrMeasureDobFooter").show();
						//上次选中的是否要清除选中？
//						$("body input").each(function(){
//							$(this).attr("checked",false);
//						});
					})
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
				valueObj["colTypeCode"] = $(this).attr("colTypeCode");
				valueObj["colStatisCode"] = $(this).attr("colStatisCode");
				Arry.push(valueObj);
			});
			this._value = Arry;
			return Arry;
		},
		//刷新数据属性
		refurbishData : function(selsect,value){
			//切换数据时
			var trargetDom = this._domTemplate;
			if(!selsect){
				trargetDom.find(".ey-attrAddDom").remove();
				trargetDom.find(".ey-attrMeasureFooter").show();
				trargetDom.find(".ey-attrMeasureDobFooter").show();
			};
			this.data = this.getWidgetValue("getMeaSureResult","fun");
			//如果有数据属性就行属性刷新
			if(this.data){
				this._refurbishDom(selsect,value);
			}
		},
		//刷新dom
		_refurbishDom : function(selsect,value){
			var dom  = this._domTemplate;
			dom.find(".ey-attrPDDimContent").html("");
			dom.find(".ey-attrPDMeaContent").html("");
			var dimContent = dom.find(".ey-attrPDDimContent");
			var mesContent = dom.find(".ey-attrPDMeaContent");
			var data = this.data;
			var dimData = data.dim;
			var mesData = data.measure;
			//如果是回读状态
			if(selsect){
				if(value.length >= 1){
					var type = value[0].colTypeCode;
					var id = value[0].colId;
				}
			};
			var name = this.attribute.functionName;
			for(var i = 0 ,len = dimData.length; i < len ; i ++){
				var temp = $("<div class='ey-attrCheakLine'><input type='radio'  /></div>");
				var tempCheckbox = $("<div class='ey-attrCheakLine'><input type='checkbox' /></div>");
				if(!this.attribute.controllerLevel){
					temp = temp;
				}
				else{
					temp = tempCheckbox;
				};
				temp.find("input").attr("name",name);
				temp.find("input").prop("id",dimData[i].colId);
				var span = $("<span></span>");
					span.text(dimData[i].colAlias);
					var dimType  = dimData[i].colDataTypeCode == "VARCHAR" ? "DIM": "DATE";
					span.attr({
						"value":dimData[i].colId,
						"colTypeCode":dimType
					});
					if(type){
						if(type == "DIM"){
							if(id == dimData[i].colId){
								temp.find("input").attr("checked",true);
							}
						}
					};
				temp.append(span);	
				dimContent.append(temp);
			};
			for(var i = 0 ,len = mesData.length; i < len ; i ++){
				var temp = $("<div class='ey-attrCheakLine'><input type='radio' /></div>");
				var tempCheckbox = $("<div class='ey-attrCheakLine'><input type='checkbox' /></div>");
				if(!this.attribute.controllerLevel){
					temp = temp;
				}
				else{
					temp = tempCheckbox;
				};
				temp.find("input").attr("name",name);
				temp.find("input").prop("id",mesData[i].colId);
				var span = $("<span></span>");
					span.text(mesData[i].colAlias);
					span.attr({
						"value":mesData[i].colId,
						"colTypeCode":"MEA"
					});
				if(type){
					if(type == "MEA"){
						if(id == mesData[i].colId){
							temp.find("input").attr("checked",true)
						}
					}
				};
				temp.append(span);	
				mesContent.append(temp);
			};
			
			this._initEvent();
		},
		//数据源地址改变刷新数据源
		refurbish : function(refurbishValue,styleValue){
			//当数据源为工作表和数据表时进行传参数类型切换
			if(refurbishValue == "source_dataTable"  || refurbishValue == "source_workTable"){
				this._domTemplate.show();
				this.sourceType = refurbishValue;
				//清空已选维度与量度
//				if(!styleValue){
//					this._domTemplate.find(".ey-attrAddDom").remove();
//				}
			}
			//静态数据隐藏次功能
			else{
				this._domTemplate.hide();
			}
		},
    });
    ey.widget.controllerMeasure = function(attribute){
    	return new ControllerMeasure(attribute);
    };
       
})($,ey);