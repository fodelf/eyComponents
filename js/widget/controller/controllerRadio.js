/*!
* Instruction : 单选编辑器
* 
* Author : 吴文周
* 
* Date: 2017-05 -19
*/
(function($,ey){
	"use strict";
	
    var ControllerRadio = function(attribute){
    	//扩展事件属性
		ey.extendProperty(this,"controller","widget",[attribute]);
		//dom对象
		this._domTemplate = $("<div class='ey-controllerInput ey-attributeLine'>"
							+"<label class='ey-controllerLabel'></label>"	
							+"<input type = 'radio' class='' />"
							+"<label class='ey-attrRaidoLabel' ></label>"	
							+"<input type = 'radio' class='ey-attrRadio'/>"	
							+"<label class='ey-attrRaidoLabel' ></label>"	
							+"</div>");			
    };
    //继承组件基类
    ey.extendFun(ControllerRadio,"controller","widget");
    //扩展当前组件
    ey.expandPrototype(ControllerRadio,{
    	//dom对象初始化
		domInit : function (){
			var currentObj = this;
			this._domTemplate.find("label").eq(0).text(currentObj.attribute.name);
			this._domTemplate.find("label").eq(1).text(currentObj.attribute.items[0].label);
			this._domTemplate.find("input").eq(0).val(currentObj.attribute.items[0].value);
			this._domTemplate.find("input").eq(0).attr("name",currentObj.attribute.functionName);
			this._domTemplate.find("label").eq(2).text(currentObj.attribute.items[1].label);
			this._domTemplate.find("input").eq(1).val(currentObj.attribute.items[1].value);
			this._domTemplate.find("input").eq(1).attr("name",currentObj.attribute.functionName);
			this._domTemplate.find("input").bind("change",function(){
				currentObj.change();
			});
		},
		//设置对象属性值
		setCurrentValue : function(value){
			this._domTemplate.find("input").each(function(){
				if(value == $(this).val()){
					$(this).prop("checked",true);
				}
			});
		},
		//获取变化值
		getChangeValue :function(){
			var value = this._domTemplate.find("input:checked").val();
			return value;
		}
    });
    ey.widget.controllerRadio = function(attribute){
    	return new ControllerRadio(attribute);
    };
       
})($,ey);