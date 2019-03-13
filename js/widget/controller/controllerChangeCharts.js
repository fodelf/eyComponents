/*!
* Instruction : 切换图形
* 
* Author : 吴文周
* 
* Date: 2017-04-05
*/
(function($,ey){
	"use strict";
	
    var ControllerChangeCharts = function(attribute){
    	//扩展事件属性
		ey.extendProperty(this,"controller","widget",[attribute]);
		//dom对象
		this._domTemplate = $("<div class='ey-controllerLocation'>"
							+"<div class='ey-controllerFunContent'>"
							+"</div>"
							+"</div>");
		
		this.locations =  {
		                	  "eyLineCharts":"./../images/changeCharts/tx-xt-01.png",
		                	  "eyMultiLineCharts":"./../images/changeCharts/tx-xt-02.png",
		                	  "eyColumnCharts":"./../images/changeCharts/tx-zt-01.png",
		                	  "eyColumnChartsColors":"./../images/changeCharts/tx-zt-02.png",
		                	  "eyMultiColumnCharts":"./../images/changeCharts/tx-zt-03.png",
		                	  "eyStackColumnCharts":"./../images/changeCharts/tx-zt-04.png",
		                	  "eyPerColumnCharts":"./../images/changeCharts/tx-zt-05.png",
		                	  "eyBarCharts":"./../images/changeCharts/tx-txt-01.png",
		                	  "eyBarChartsColors":"./../images/changeCharts/tx-txt-02.png",
		                	  "eyMultiBarCharts":"./../images/changeCharts/tx-txt-03.png",
		                	  "eyStackBarCharts":"./../images/changeCharts/tx-txt-04.png",
		                	  "eyPerBarCharts":"./../images/changeCharts/tx-txt-05.png",
		                	  "eyPieCharts":"./../images/changeCharts/tx-bt-01.png",
		                	  "eyHollowPieCharts":"./../images/changeCharts/tx-bt-02.png"
		                  }
    };
    //继承组件基类
    ey.extendFun(ControllerChangeCharts,"controller","widget");
    //扩展当前组件
    ey.expandPrototype(ControllerChangeCharts,{
    	//dom元素初始化
    	domInit : function(){
    		var currentObj = this;
    		var locationDom = this._domTemplate;
    		locationDom.find(".ey-controllerLabel").text(currentObj.attribute.name);
    		this._setValue();
			locationDom.find(".ey-controllerItemsChart").each(function(){
				$(this).bind("click",function(){
					currentObj._value = $(this).attr("value");
//					currentObj.change();
					currentObj._changeType(currentObj._value);
//					$(this).addClass("ey-attributeChecked").removeClass("ey-attributeUnChecked");
//					$(this).siblings().removeClass("ey-attributeChecked").addClass("ey-attributeUnChecked");
					
					
				});
			})    		
    	},
    	//获取元素值
		getChangeValue :function(){
			return this._value;
		},
		//设置对象属性值
		setCurrentValue : function(value){
			this._domTemplate.find(".ey-controllerItemsChart").each(function(){
				if($(this).attr("value") == value){
					$(this).addClass("ey-attributeChecked").removeClass("ey-attributeUnChecked");
					$(this).siblings().removeClass("ey-attributeChecked").addClass("ey-attributeUnChecked");
				}	
			});
		},
		_setValue : function(){
			var items = this.attribute.items;
			var content = this._domTemplate.find(".ey-controllerFunContent");
			for(var i = 0, len = items.length; i < len ; i++){
				var item = $("<div class='ey-controllerItemsChart ey-attributeUnChecked'></div>");
				var value = items[i]["value"];
				var label = items[i]["label"];
				item.attr({
					"value" : value,
					"title" : label
				});
				var src = this.locations[value];
				var img = $("<img />").attr({
					"src":src,
				});
				item.append(img);
				content.append(item);
			}
		},
		//抛出事件切换图形
		_changeType : function(value){
			var eventObj = ey.eventLibrary.eventBase("changeType");
			var information = {"value":value};
			eventObj.setInformation(information);
			this.triggerEvent(eventObj);
		}
   		  		 
    });
    ey.widget.controllerChangeCharts = function(attribute){
    	return new ControllerChangeCharts(attribute);
    };
       
})($,ey);