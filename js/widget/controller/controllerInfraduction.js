/*!
* Instruction : 下转属性编辑器
* 
* Author : 吴文周
* 
* Date: 2017-04-14
*/
(function($,ey){
	"use strict";
	
    var ControllerInfraduction = function(attribute){
    	//扩展事件属性
		ey.extendProperty(this,"controller","widget",[attribute]);
		//dom对象
		this._domTemplate = $("<div class='ey-attrSort'>"
							+"<div class='ey-attributeLine ey-attrTitleAdd'>"
							+"<label class='ey-dataLabel'></label>"	
							+"<span class='ey-attributeAdd'></span>"	
							+"</div>"
							+"<div class='ey-attSortContent'>"
							+"<div class='ey-attrMeasureFooter' title='请选择下钻维度'>"
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
								+"<span>请选择数据显示：</span><input type='radio'name = 'attrSort' value='all' checked='checked'/>"
								+"<label>显示全部</label><input type='radio' name = 'attrSort' value='some' class='ey-attrMesSome'/>"
								+"<label>显示前</label><input type='number' class='ey-attMeaNum' value='1'/>"
								+"</div>");
		this.data = {"dim":[],};
    };
    //继承组件基类
    ey.extendFun(ControllerInfraduction,"controller","widget");
    //扩展当前组件
    ey.expandPrototype(ControllerInfraduction,{
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
			//设置事件初始化
			//关闭事件
			dom.find(".ey-PullClose").unbind("click");
			dom.find(".ey-PullClose").bind("click",function(){
				dom.find(".ey-attInfrPullDown").hide();
				dom.find(".ey-attrMeasureFooter").show();
			});
			//显示下拉框事件
			dom.find(".ey-attributeAdd").unbind("click");
			dom.find(".ey-attributeAdd").bind("click",function(){
				dom.find(".ey-attrAddDom").remove();
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
					$(this).bind("click",function(){
						$(this).parent().parent().remove();
						currentObj._value = "";
						currentObj.change();
						if(dom.find(".ey-controllerInputEditor").length ==0){
							dom.find(".ey-attrMeasureFooter").show();
						};
					})
				});
			});	
		},
		// 新建dom 对象
		_addDom: function(){
			var sapnDom = this._domTemplate.find("input:checked").next();
			var trargetDom = this._domTemplate;
			trargetDom.find(".ey-attrAddDom").remove();
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
				dom.find(".ey-controllerInputEditor").text(textValue);
				dom.find(".ey-controllerInputEditor").attr("value",textId);
				trargetDom.find(".ey-attSortContent").append(dom);
				var currentObj = this;
				trargetDom.find(".ey-attributeSetting").each(function(){
				$(this).bind("click",function(){
					var eyTooltip = ey.widget.eyTooltip({
						"title":textValue,
						"content":currentObj._content,
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
				});
				trargetDom.find(".ey-attrMeasureFooter").hide();
			}
			else{
				trargetDom.find(".ey-attrMeasureFooter").show();
			}
		},
		//设置对象属性值
		setCurrentValue : function(value){
			this.refurbishData("selsect",value);
			if(value){
				this.refurbishData("selsect",value);
				var dom = this._domTemplate;
				var trargetDom = dom.find(".ey-attSortContent");
				dom.find(".ey-attrMeasureFooter").hide();
				var dom =$("<div class='ey-attrAddDom'>"
						+"<span class='ey-controllerInputEditor ey-attributeLineInput ey-addDomSpan' ></span>"
						+"<span class='ey-attrAddDomRight'>"
						+"<span class='ey-attributeSetting'></span>"
						+"<span class='ey-attributeDelect'></span>"
						+"</span>"
						+"<div>");
					dom.find(".ey-controllerInputEditor").text(value[0].colAlias);
					dom.find(".ey-controllerInputEditor").attr("value",value[0].colId);
					dom.find(".ey-controllerInputEditor").attr("type",value[0].colTypeCode);
					trargetDom.append(dom);
					this._bindEvent(dom);
					this._setInitEvent();	
			}						
		},
		_setInitEvent : function(){
			var dom = this._domTemplate;
			dom.find(".ey-attributeDelect").unbind("click");
				dom.find(".ey-attributeDelect").each(function(){
					$(this).bind("click",function(){
						$(this).parent().parent().remove();
						currentObj._value = "";
						currentObj.change();
					})
				});
		},
		//绑定事件
		_bindEvent : function(dom){
			var dataProces = this.getWidgetValue("dataProces");
			var currentObj = this;
			dom.find(".ey-controllerInputEditor").bind("click",function(){
			 	var textValue = $(this).text();
				var eyTooltip = ey.widget.eyTooltip({
					"title":textValue,
					"content":currentObj._content,
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
			return Arry;
		},
		//刷新数据属性
		refurbishData : function(selsect){
			//切换数据时
			if(!selsect){
				this._domTemplate.find(".ey-attrAddDom").remove();
			}
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
					var temp = $("<div class='ey-attrCheakLine'><input type='radio' name='infra' /></div>");
					var span = $("<span></span>");
						span.text(dimData[i].colAlias);
						span.attr(
							{
							"value":dimData[i].colId,
							});
					temp.append(span);	
					dimContent.append(temp);
				};
			};
			this._initEvent();
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
    ey.widget.controllerInfraduction = function(attribute){
    	return new ControllerInfraduction(attribute);
    };
       
})($,ey);