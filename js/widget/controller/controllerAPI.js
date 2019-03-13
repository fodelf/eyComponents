/*!
* Instruction : API编辑器
* 
* Author : 吴文周
* 
* Date: 2017-04-08
*/
(function($,ey){
	"use strict";
	
    var ControllerAPI = function(attribute){
    	//扩展事件属性
		ey.extendProperty(this,"controller","widget",[attribute]);
		//dom对象
		this._domTemplate = $("<div class='' style='margin-left:5px'>"
								+"<label class='ey-controllerLabel' style='position :absolute'></label>"
								+"<div  class='ey-attrAPI'>"
								+"<textarea  spellcheck ='false' class='ey-APITextArea' >"
								+"</textarea>"
								+"</div>"
								+"</div>");			
    };
    //继承组件基类
    ey.extendFun(ControllerAPI,"controller","widget");
    //扩展当前组件
    ey.expandPrototype(ControllerAPI,{
    	//dom对象初始化
		domInit : function (){
			var currentObj = this;
			this._domTemplate.find("label").text(currentObj.attribute.name);
			//默认dom显示隐藏状态
			this._domTemplate.css({"display":currentObj.attribute.status});
			if(currentObj.attribute.styleType == "API"){
				this._domTemplate.find("textarea").prop("placeholder","请输入接口URL地址，例如http://139.224.199.101:18088/data/dataFunc/dataInvoke/list，返回数据与静态数据模板一致才能驱动图形");
			}
			else{
				this._domTemplate.find("textarea").prop("placeholder","参数可选填，请输入JSON类型参数，例如{'type':'1'}");
			}
			this._domTemplate.find("textarea").on("input",function(){
				currentObj.change();
			});
		},
		//获取值
  		getChangeValue : function(){
				return this._domTemplate.find("textarea").val();
  		},
   		//设置当前对象的属性值显示
   		setCurrentValue:function(value){
   			this._domTemplate.find("textarea").val(value);
   		},
	    //数据源地址改变刷新数据源
		refurbish : function(refurbishValue){
			//当数据源为工作表和数据表时进行传参数类型切换
			if(refurbishValue == "source_static" || refurbishValue == "source_API"){
				if(refurbishValue == "source_API"){
					this._domTemplate.show();
				}
				else{
					this._domTemplate.hide();
				}
				//隐藏数据高级属性
				this.getRootParent("attibuteArea").hideAttributeSenior();
			}
			//静态数据隐藏次功能
			else{
				this._domTemplate.hide();
				this.getRootParent("attibuteArea").showAttributeSenior();
			}
		}
    });
    ey.widget.controllerAPI = function(attribute){
    	return new ControllerAPI(attribute);
    };
       
})($,ey);