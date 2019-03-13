/*!
* Instruction : 布局控制器
* 
* Author : 吴文周
* 
* Date: 2017-04-05
*/
(function($,ey){
	"use strict";
	
    var ControllerLayout = function(attribute){
    	//扩展事件属性
		ey.extendProperty(this,"controller","widget",[attribute]);
		//dom对象
		this._domTemplate = $("<div class='ey-controllerLocation'>"
							+"<div class='ey-controllerLabel'></div>"	
							+"<div class='ey-controllerFunContent'>"
							+"</div>"
							+"</div>");
		
		this.locations = [
		      			{	"Checked":"http://uclouder.oss-cn-shanghai.aliyuncs.com/eyanalyse/dashboard/img/attr/pcChecked.png",
		      				"Unchecked":"http://uclouder.oss-cn-shanghai.aliyuncs.com/eyanalyse/dashboard/img/attr/pcUnchecked.png"
		      			},
		      			{
		      				"Unchecked":"http://uclouder.oss-cn-shanghai.aliyuncs.com/eyanalyse/dashboard/img/attr/appChecked.png",
		      				"Checked":"http://uclouder.oss-cn-shanghai.aliyuncs.com/eyanalyse/dashboard/img/attr/appUchecked.png"
		      			}
		      		];
		this.text = ["PC","APP"];
    };
    //继承组件基类
    ey.extendFun(ControllerLayout,"controller","widget");
    //扩展当前组件
    ey.expandPrototype(ControllerLayout,{
    	//dom元素初始化
    	domInit : function(){
    		var currentObj = this;
    		var locationDom = this._domTemplate;
    		locationDom.find(".ey-controllerLabel").text(currentObj.attribute.name);
    		this._setValue();
			locationDom.find(".ey-controllerItemsLay").each(function(){
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
			this._domTemplate.find(".ey-controllerItemsLay").each(function(){
				if($(this).attr("value") == value){
					$(this).addClass("ey-attributeChecked").removeClass("ey-attributeUnChecked");
					$(this).siblings().removeClass("ey-attributeChecked").addClass("ey-attributeUnChecked");
				}	
			});
		},
		_setValue : function(){
			var that = this;
			var items = this.attribute.items;
			var content = this._domTemplate.find(".ey-controllerFunContent");
			for(var i = 0, len = items.length; i < len ; i++){
				var item = $("<div class='ey-controllerItemsLay ey-attributeUnChecked'></div>");
				var value = items[i]["value"];
				var label = items[i]["label"];
				item.attr({
					"value" : value,
					"title" : label,
					"data-index" : i
				}).css("background","url(" + this.locations[i].Unchecked + ") no-repeat 10px 5px").text(this.text[i]);
				
				item.click(function(){
					$(this).siblings().css({
						"background":"transparent url(" + that.locations[$(this).siblings().attr("data-index")].Unchecked + ") no-repeat 10px 5px",
						
					}).removeClass('active');
					$(this).css({
						"background":"rgba(0,0,0,.3) url(" + that.locations[$(this).attr("data-index")].Checked + ") no-repeat 10px 5px",
						
					}).addClass("active");
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
			var eventObj = ey.eventLibrary.eventBase("layout");
			var information = {"value":value};
			eventObj.setInformation(information);
			this.triggerEvent(eventObj);
		}
   		  		 
    });
    ey.widget.controllerLayout = function(attribute){
    	return new ControllerLayout(attribute);
    };
       
})($,ey);